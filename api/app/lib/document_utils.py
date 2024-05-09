from app.graph.types.document_type import DocumentType
from langchain_community.document_loaders import Docx2txtLoader, PyPDFLoader
from app.models.talent_document_import import TalentDocumentImport
from app.models.talent_profile import TalentProfile
from app.models.talent_document import TalentDocument
from app.lib.chat_gpt import ChatGpt
from celery import shared_task
from app import db

@shared_task()
def process_document(agency_id: str, document_name: str, document_url: str):
    document_type = check_document_type(document_name)
    document_text = extract_document_content(document_type, document_url)
    chat_gpt = ChatGpt()
    document_json = chat_gpt.document_text_to_json(document_text)
    process_document_result(agency_id, document_url, document_name, document_json)

def extract_word_content(docx_url: str) -> str:
    loader = Docx2txtLoader(docx_url)
    data = loader.load()
    return data[0].page_content

def extract_pdf_content(pdf_url: str) -> str:
    loader = PyPDFLoader(pdf_url)
    data = loader.load()
    return data[0].page_content

def check_document_type(document_name: str) -> DocumentType | None:
    ext = document_name.split(".")[-1].lower()
    if ext in ["pdf"]:
        return DocumentType.PDF
    elif ext in ["docx", "doc"]:
        return DocumentType.WORD
    return None

def extract_document_content(document_type: DocumentType, document_url: str) -> str:
    match document_type:
        case DocumentType.PDF:
            return extract_pdf_content(document_url)
        case DocumentType.WORD:
            return extract_word_content(document_url)
    
    raise ValueError("Unsupported document type")

def process_document_result(agency_id: str, document_url: str, document_name: str, document_json: dict):
    talent_profile = TalentProfile(agency_id=agency_id, name=document_json.get("name"), bio=document_json.get("bio"))
    db.session.add(talent_profile)
    db.session.flush()
    
    talent_document = TalentDocument(talent_profile_id=talent_profile.id, name=document_name, kind="cover_letter", json=str(document_json), agency_id=agency_id)
    db.session.add(talent_document)
    db.session.flush()
    
    talent_document_import = TalentDocumentImport(file_url=document_url, talent_document_id=talent_document.id, json=str(document_json))
    db.session.add(talent_document_import)
    db.session.commit()