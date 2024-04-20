from sqlalchemy_utils import UUIDType
import uuid
from sqlalchemy.sql import func
from app import db
from sqlalchemy.orm import validates
import enum
from sqlalchemy import Column, String, DateTime, ForeignKey, Enum
from app.constants.prompts import ONBOARDING_V1, CONTENT_GENERATION


class AssistantChatScenario(enum.Enum):
    ONBOARDING = "onboarding"
    CONTENT_GENERATION = "content_generation"


class AssistantChatThread(db.Model):
    __tablename__ = "assistant_chat_threads"

    id = db.Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)

    scenario = Column(String(50), nullable=False)

    tenant_user_id = db.Column(
        UUIDType(binary=False), db.ForeignKey("tenant_users.id"), nullable=False
    )
    tenant_user = db.relationship("TenantUser", backref="assistant_chat_threads")

    created_at = db.Column(
        db.DateTime(timezone=True), default=func.now(), nullable=False
    )
    updated_at = db.Column(
        db.DateTime(timezone=True),
        default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    @validates("scenario")
    def validate_scenario(self, key, value):
        valid_values = [member.value for member in AssistantChatScenario]
        print("Valid values:", valid_values)
        if value not in valid_values:
            raise ValueError("Invalid scenario")
        return value

    def build_system_message(self):
        if self.scenario == "onboarding":
            return ONBOARDING_V1
        elif self.scenario == "content_generation":
            return CONTENT_GENERATION

    def __repr__(self):
        return f"<AssistantChatThread {self.id}>"
