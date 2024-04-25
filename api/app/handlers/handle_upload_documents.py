from flask import request, jsonify
from firebase_admin import storage

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
            blob = bucket.blob(document.filename)
            blob.upload_from_string(document.read())
        return jsonify({"message": "Upload documents success", "success": True, "documents": [document.filename for document in documents], "count": len(documents)}), 200
        
    except Exception as e:
        return jsonify({"message": f"An error occurred ({e.__class__}): {e}", "success": False}), 500