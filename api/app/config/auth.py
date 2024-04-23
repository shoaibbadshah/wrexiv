from app.models.agency import Agency
from app.models.agency_user import AgencyUser
from app.models.user import User
from app.graph.dataloader.agency_user_loader import AgencyUserLoader
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
    async def check_auth():
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

            agency_loader = AgencyUserLoader()
            agency_user = await agency_loader.load(g.current_user.id)

            if agency_user is not None:
                g.current_agency_user = agency_user
                g.current_agency = agency_user.agency

        except ValueError as ve:
            app.logger.error(f"Token verification failed: {ve}")
            abort(401, description="Invalid token")
        except Exception as e:
            app.logger.error(f"Unexpected error in token verification: {e}")
            abort(500, description="Internal server error")
