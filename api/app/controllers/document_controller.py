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

def process_document(document: FileStorage):
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

    talent_profile = TalentProfile(agency_id=g.current_agency.id)
    db.session.add(talent_profile)
    db.session.flush()
    
    talent_document = TalentDocument(talent_profile_id=talent_profile.id, kind="cover_letter")
    db.session.add(talent_document)
    db.session.flush()
    
    talent_document_import = TalentDocumentImport(file_url=blob.public_url, talent_document_id=talent_document.id)
    db.session.add(talent_document_import)
    db.session.commit()