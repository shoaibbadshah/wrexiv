from werkzeug.datastructures import FileStorage
from app.models.talent_document_import import TalentDocumentImport
from app.models.talent_profile import TalentProfile
from app.models.talent_document import TalentDocument
from firebase_admin import storage
from flask import g
from app import db
import time
import sys
import io
from app.lib.gpt4_api import document_text_to_json
from langchain_community.document_loaders import Docx2txtLoader, PyPDFLoader
from enum import Enum
from flask import abort

def process_document(document: FileStorage):
    document_name = document.filename
    document_url = store_document(document)

    text = extract_document_content(document_url, document_name)

    document_json = document_text_to_json(text)

    talent_profile = TalentProfile(agency_id=g.current_agency.id, name=document_json.get("name"), bio=document_json.get("summary"))
    db.session.add(talent_profile)
    db.session.flush()
    
    talent_document = TalentDocument(talent_profile_id=talent_profile.id, kind="cover_letter", json=str(document_json))
    db.session.add(talent_document)
    db.session.flush()
    
    talent_document_import = TalentDocumentImport(file_url=document_url, talent_document_id=talent_document.id, json=str(document_json))
    db.session.add(talent_document_import)
    db.session.commit()


class DocumentType(Enum):
    PDF = 1
    WORD = 2

def store_document(document: FileStorage) -> str:
    bucket = storage.bucket("globaltalentdb.appspot.com")
    name = "".join(document.filename.split(".")[:-1])
    ext = document.filename.split(".")[-1]
    document.filename = f"talent_document_import/{name}-{time.time()}.{ext}"

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

def extract_document_content(document_url: str, document_name: str) -> str:
    match check_document_type(document_name):
        case DocumentType.PDF:
            return extract_pdf_content(document_url)
        case DocumentType.WORD:
            return extract_word_content(document_url)
    
    abort(400, "Unsupported document type")


def check_document_type(document: str) -> str | None:
    ext = document.split(".")[-1].lower()
    if ext in ["pdf"]:
        return DocumentType.PDF
    elif ext in ["docx", "doc"]:
        return DocumentType.WORD
    return None