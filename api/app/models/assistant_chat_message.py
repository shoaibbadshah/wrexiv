from sqlalchemy_utils import UUIDType
from sqlalchemy.sql import func
import uuid
from app import db
import enum
from sqlalchemy import Column, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship


class AssistantChatMessageRole(enum.Enum):
    assistant = "assistant"
    user = "user"
    system = "system"


class AssistantChatMessage(db.Model):
    __tablename__ = "assistant_chat_messages"

    id = Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)

    role = Column(String(50), nullable=False)
    content = Column(Text, nullable=False)

    assistant_chat_thread_id = Column(
        UUIDType(binary=False), ForeignKey("assistant_chat_threads.id"), nullable=False
    )
    assistant_chat_thread = relationship("AssistantChatThread", backref="messages")

    created_at = Column(DateTime(timezone=True), default=func.now(), nullable=False)
    updated_at = Column(
        DateTime(timezone=True),
        default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    # 保存時に自動で呼ばれるわけではない
    @staticmethod
    def validate_role(role_value):
        role_names = [role.name for role in AssistantChatMessageRole]
        if role_value not in role_names:
            raise ValueError(
                f"Invalid role: {role_value}. Must be one of {role_names}."
            )

    def __repr__(self):
        return f"<AssistantChatMessage {self.id}>"
