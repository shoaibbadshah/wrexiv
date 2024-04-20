from sqlalchemy_utils import UUIDType
import uuid
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app import db


class TenantCreditTransaction(db.Model):
    __tablename__ = "tenant_credit_transactions"

    id = Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
    amount = Column(Integer, nullable=False)
    transaction_type = Column(
        db.Enum("added", "used", name="transaction_type_enum"), nullable=False
    )

    tenant_id = Column(UUIDType(binary=False), ForeignKey("tenants.id"), nullable=False)
    tenant = relationship("Tenant")

    related_subscription_id = Column(
        UUIDType(binary=False), ForeignKey("subscription_plans.id"), nullable=True
    )
    related_subscription = relationship("SubscriptionPlan")

    created_at = Column(db.DateTime(timezone=True), default=func.now(), nullable=False)
    updated_at = Column(
        db.DateTime(timezone=True),
        default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    def __repr__(self):
        return f"<TenantCreditTransaction {self.id}>"
