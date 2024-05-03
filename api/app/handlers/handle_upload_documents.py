from flask import request, jsonify
from app.infra.Document import Document
import logging

def handle_upload_documents():
    documents = request.files.getlist("documents")
    if not documents:
        return jsonify({"message": "No documents uploaded", "success": False}), 400
    
    allowed_extensions = [".pdf", ".doc", ".docx"]
    for doc in documents:
        if not any(doc.filename.lower().endswith(ext) for ext in allowed_extensions):
            return jsonify({"message": f"Invalid file format for document {doc.filename}", "success": False}), 400

    try:
        for doc in documents:
            Document(doc).process_document()

        count = len(documents)
        return jsonify({"message": f"Upload {count} document(s) success", "success": True, "documents": [document.filename for document in documents], "count": count}), 200
        
    except Exception as e:
        logging.error(f"An error occurred while uploading documents: {e}")
        return jsonify({"message": f"An error occurred", "success": False}), 500