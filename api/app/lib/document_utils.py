from app.graph.types.document_type import DocumentType
from langchain_community.document_loaders import Docx2txtLoader, PyPDFLoader
from app.models.talent_document_import import TalentDocumentImport
from app.models.talent_profile import TalentProfile
from app.models.talent_document import TalentDocument
from app.lib.chat_gpt import ChatGpt
from celery import shared_task
from app import db

@shared_task(ignore_result=False)
def process_document(agency_id: str, document_name: str, document_url: str, document_id: str):
    document_type = check_document_type(document_name)
    document_json = extract_document_content(document_type, document_url)

    if document_json == {}:
        raise ValueError(f"Extracted document content is empty for {document_name}")
    else:
        process_document_result(agency_id, document_name, document_url, document_json, document_id)

def extract_word_content(docx_url: str) -> dict:
    loader = Docx2txtLoader(docx_url)
    data = loader.load()
    chat_gpt = ChatGpt()
    document_text = "\n".join(list(map(lambda x: x.page_content, data)))
    document_json = chat_gpt.document_text_to_json(document_text)
    return document_json

def extract_pdf_content(pdf_url: str) -> dict:
    loader = PyPDFLoader(pdf_url)
    data = loader.load()
    chat_gpt = ChatGpt()
    document_text = "\n".join(list(map(lambda x: x.page_content, data)))
    document_json = chat_gpt.document_text_to_json(document_text)
    return document_json

def extract_image_content(image_url: str) -> dict:
    chat_gpt = ChatGpt()
    document_json = chat_gpt.document_image_to_json(image_url)
    return document_json

def check_document_type(document_name: str) -> DocumentType | None:
    ext = document_name.split(".")[-1].lower()
    if ext in ["pdf"]:
        return DocumentType.PDF
    elif ext in ["docx", "doc"]:
        return DocumentType.WORD
    elif ext in ["png", "jpg", "jpeg"]:
        return DocumentType.IMAGE
    return None

def extract_document_content(document_type: DocumentType, document_url: str) -> dict:
    match document_type:
        case DocumentType.PDF:
            return extract_pdf_content(document_url)
        case DocumentType.WORD:
            return extract_word_content(document_url)
        case DocumentType.IMAGE:
            return extract_image_content(document_url)
    
    raise ValueError("Unsupported document type")

def process_document_result(agency_id: str, document_name: str, document_url: str, document_json: dict, document_id: str):
    talent_profile = TalentProfile(agency_id=agency_id, name=document_json.get("name"), bio=document_json.get("bio"), email=document_json.get("email"))
    db.session.add(talent_profile)
    db.session.flush()
    
    talent_document = TalentDocument(talent_profile_id=talent_profile.id, name=document_name, kind="cover_letter", json=str(document_json), agency_id=agency_id)
    db.session.add(talent_document)
    db.session.flush()
    
    talent_document_import = TalentDocumentImport(talent_document_id=talent_document.id, json=str(document_json), document_processing_task_id=document_id, file_url=document_url)
    db.session.add(talent_document_import)
    db.session.commit()