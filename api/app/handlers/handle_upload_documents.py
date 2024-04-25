from flask import request, jsonify
from firebase_admin import storage
import time

def handle_upload_documents():
    documents = request.files.getlist("documents")
    if not documents:
        return jsonify({"message": "No documents uploaded", "success": False}), 400
    
    allowed_extensions = [".pdf", ".doc", ".docx"]
    for document in documents:
        if not any(document.filename.lower().endswith(ext) for ext in allowed_extensions):
            return jsonify({"message": f"Invalid file format for document {document.filename}", "success": False}), 400

    try:
        bucket = storage.bucket("globaltalentdb.appspot.com")
        for document in documents:
            name = "".join(document.filename.split(".")[:-1])
            ext = document.filename.split(".")[-1]
            document.filename = f"talent_document_import/{name}-{time.time()}.{ext}"
            blob = bucket.blob(document.filename)
            blob.upload_from_string(document.read())
        count = len(documents)
        return jsonify({"message": f"Upload {count} document(s) success", "success": True, "documents": [document.filename for document in documents], "count": count}), 200
        
    except Exception as e:
        return jsonify({"message": f"An error occurred: {e}", "success": False}), 500