# app/commands/seed_db.py
import click
from flask.cli import with_appcontext
from app import db


@click.command("reset-db")
@with_appcontext
def reset_db_command():
    db.drop_all()
    db.create_all()
    print("Database has been reset.")
