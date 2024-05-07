from app.graph.types.document_type import DocumentType
from langchain_community.document_loaders import Docx2txtLoader, PyPDFLoader
from app.models.talent_document_import import TalentDocumentImport
from app.models.talent_profile import TalentProfile
from app.models.talent_document import TalentDocument
from werkzeug.datastructures import FileStorage
from firebase_admin import storage
from app import db
import time
import io

def store_document(document: FileStorage) -> str:
    BUCKET_NAME = "globaltalentdb.appspot.com"
    DOCUMENT_FOLDER_NAME = "talent_document_import"

    bucket = storage.bucket(BUCKET_NAME)
    splitted_document_filename = document.filename.split(".")
    name = "".join(splitted_document_filename[:-1])
    ext = splitted_document_filename[-1]
    document.filename = f"{DOCUMENT_FOLDER_NAME}/{name}-{time.time()}.{ext}"

    blob = bucket.blob(document.filename)
    doc_bytes_io = io.BytesIO()
    document.save(doc_bytes_io)
    doc_bytes_io.seek(0)
    blob.upload_from_file(doc_bytes_io, content_type=document.content_type)
    blob.make_public()
    return blob.public_url

def extract_word_content(docx_url: str) -> str:
    loader = Docx2txtLoader(docx_url)
    data = loader.load()
    return data[0].page_content

def extract_pdf_content(pdf_url: str) -> str:
    loader = PyPDFLoader(pdf_url)
    data = loader.load()
    return data[0].page_content

def check_document_type(document: str) -> DocumentType | None:
    ext = document.split(".")[-1].lower()
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

def process_document(agency_id: str, document_url: str, document_name: str, document_json: dict):
    talent_profile = TalentProfile(agency_id=agency_id, name=document_json.get("name"), bio=document_json.get("bio"))
    db.session.add(talent_profile)
    db.session.flush()
    
    talent_document = TalentDocument(talent_profile_id=talent_profile.id, name=document_name, kind="cover_letter", json=str(document_json), agency_id=agency_id)
    db.session.add(talent_document)
    db.session.flush()
    
    talent_document_import = TalentDocumentImport(file_url=document_url, talent_document_id=talent_document.id, json=str(document_json))
    db.session.add(talent_document_import)
    db.session.commit()