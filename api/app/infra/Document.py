from app import db
from werkzeug.datastructures import FileStorage
from flask import abort, g
from app.models.talent_document_import import TalentDocumentImport
from app.models.talent_profile import TalentProfile
from app.models.talent_document import TalentDocument
from app.lib.document_utils import store_document, check_document_type, extract_document_content
from app.lib.gpt4_api import document_text_to_json

class Document:
    def __init__(self, document: FileStorage):
        self.document_name = document.filename
        self.document_url = store_document(document)
        self.document_type = check_document_type(self.document_name)

        try:
            self.document_text = extract_document_content(self.document_type, self.document_url)
        except ValueError as e:
            abort(400, str(e))

        self.document_json = document_text_to_json(self.document_text)

    # Put the document information to the database
    def process_document(self):
        talent_profile = TalentProfile(agency_id=g.current_agency.id, name=self.document_json.get("name"), bio=self.document_json.get("bio"))
        db.session.add(talent_profile)
        db.session.flush()
        
        talent_document = TalentDocument(talent_profile_id=talent_profile.id, name=self.document_name, kind="cover_letter", json=str(self.document_json), agency_id=g.current_agency.id)
        db.session.add(talent_document)
        db.session.flush()
        
        talent_document_import = TalentDocumentImport(file_url=self.document_url, talent_document_id=talent_document.id, json=str(self.document_json))
        db.session.add(talent_document_import)
        db.session.commit()

