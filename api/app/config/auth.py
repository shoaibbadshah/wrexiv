from app.models.tenant_user import TenantUser
from app.models.user import User
import firebase_admin
from firebase_admin import credentials, auth as firebase_auth
from flask import g, request, abort
import os
from app import db

cred_path = os.path.join(os.path.dirname(__file__), "credentials.json")
cred = credentials.Certificate(cred_path)
firebase_admin.initialize_app(cred)


def setup_auth(app):
    @app.before_request
    def check_auth():
        if request.method == "OPTIONS":
            return

        token = request.headers.get("Authorization")

        if not token:
            return
            # abort(401, description="Authorization token is missing")

        try:
            id_token = token.split("Bearer ")[1]
            decoded_token = firebase_auth.verify_id_token(id_token)

            email = decoded_token.get("email")
            auth_id = decoded_token.get("user_id")

            if not email or not auth_id:
                return
                # abort(400, description="Bad request: Missing email or auth_id in the decoded token")

            user = User.query.filter_by(email=email).first()

            if user is None:
                user = User(auth_id=auth_id, email=email)
                db.session.add(user)
                db.session.commit()

            g.current_user = user

            tenant_user = TenantUser.query.filter_by(user_id=g.current_user.id).first()
            if tenant_user is not None:
                g.current_tenant_user = tenant_user
                g.current_tenant = tenant_user.tenant

        except ValueError as ve:
            app.logger.error(f"Token verification failed: {ve}")
            abort(401, description="Invalid token")
        except Exception as e:
            app.logger.error(f"Unexpected error in token verification: {e}")
            abort(500, description="Internal server error")
