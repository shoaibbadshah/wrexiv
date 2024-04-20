from sqlalchemy_utils import UUIDType
import uuid
from sqlalchemy import Column, String, ForeignKey, Enum
from sqlalchemy.sql import func
from app import db


class Subscription(db.Model):
    __tablename__ = "subscriptions"

    id = Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
    stripe_subscription_id = Column(String(255), nullable=False)
    status = Column(
        Enum("active", "expired", "cancelled", name="subscription_status"),
        nullable=False,
    )

    tenant_id = db.Column(
        UUIDType(binary=False),
        db.ForeignKey("tenants.id"),
        nullable=False,
    )
    tenant = db.relationship("Tenant", backref="subscriptions")

    subscription_plan_id = db.Column(
        UUIDType(binary=False),
        db.ForeignKey("subscription_plans.id"),
        nullable=False,
    )
    subscription_plan = db.relationship("SubscriptionPlan", backref="subscriptions")

    created_at = Column(db.DateTime(timezone=True), default=func.now(), nullable=False)
    updated_at = Column(
        db.DateTime(timezone=True),
        default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    def __repr__(self):
        return f"<Subscription {self.id}>"
