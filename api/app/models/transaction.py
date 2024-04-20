from sqlalchemy_utils import UUIDType
import uuid
from sqlalchemy import Column, String, Enum, Numeric
from sqlalchemy.sql import func
from app import db


class Transaction(db.Model):
    __tablename__ = "transactions"

    id = Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)

    amount = Column(Numeric(10, 2), nullable=False)
    currency = Column(String(3), nullable=False)
    stripe_charge_id = Column(String(255), nullable=False)
    status = Column(
        Enum("succeeded", "failed", name="transaction_status"),
        nullable=False,
    )

    tenant_id = db.Column(
        UUIDType(binary=False),
        db.ForeignKey("tenants.id"),
        nullable=False,
    )
    tenant = db.relationship("Tenant", backref="transactions")

    created_at = Column(db.DateTime(timezone=True), default=func.now(), nullable=False)
    updated_at = Column(
        db.DateTime(timezone=True),
        default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    def __repr__(self):
        return f"<Transaction {self.id}>"
