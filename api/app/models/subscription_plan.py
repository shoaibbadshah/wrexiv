from sqlalchemy_utils import UUIDType
import uuid
from sqlalchemy import Column, String, Integer, Numeric
from sqlalchemy.sql import func
from app import db


class SubscriptionPlan(db.Model):
    __tablename__ = "subscription_plans"

    id = Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    description = Column(String(1024), nullable=True)
    credit_amount = Column(Integer, nullable=False)
    price = Column(Numeric(10, 2), nullable=False)
    currency = Column(String(3), nullable=False)
    stripe_plan_id = Column(String(255), nullable=False)

    created_at = Column(db.DateTime(timezone=True), default=func.now(), nullable=False)
    updated_at = Column(
        db.DateTime(timezone=True),
        default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    def __repr__(self):
        return f"<SubscriptionPlan {self.name}>"
