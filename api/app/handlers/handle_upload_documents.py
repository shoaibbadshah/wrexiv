from flask import request, jsonify
from app.controllers.document_controller import process_document

def handle_upload_documents():
    documents = request.files.getlist("documents")
    if not documents:
        return jsonify({"message": "No documents uploaded", "success": False}), 400
    
    allowed_extensions = [".pdf", ".doc", ".docx"]
    for document in documents:
        if not any(document.filename.lower().endswith(ext) for ext in allowed_extensions):
            return jsonify({"message": f"Invalid file format for document {document.filename}", "success": False}), 400

    try:
        for document in documents:
            process_document(document)

        count = len(documents)
        return jsonify({"message": f"Upload {count} document(s) success", "success": True, "documents": [document.filename for document in documents], "count": count}), 200
        
    except Exception as e:
        return jsonify({"message": f"An error occurred: {e}", "success": False}), 500