# app/commands/seed_db.py
import click
from flask.cli import with_appcontext
from app import db
from app.tests.factories.agency_factory import AgencyFactory
from app.tests.factories.talent_profile_factory import TalentProfileFactory
from app.models.agency import Agency


@click.command("seed-db")
@with_appcontext
def seed_db_command():
    agencies = AgencyFactory.create_batch(2)
    db.session.add_all(agencies)
    db.session.commit()

    all_agencies = Agency.query.all()
    for agency in all_agencies:
        talent_profiles = TalentProfileFactory.create_batch(
            5, agency_id=agency.id
        )  # Assuming we want 5 talent profiles per agency
        db.session.add_all(talent_profiles)

    db.session.commit()
    print("Database seeded with all agencies and their talent profiles.")
