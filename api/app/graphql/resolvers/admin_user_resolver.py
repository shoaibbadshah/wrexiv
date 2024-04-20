from app.graphql.types.admin_user_type import AdminUserType
from graphene import ObjectType, Field
from flask import g
from graphql import GraphQLError


class AdminUserResolver(ObjectType):
    admin_user = Field(
        AdminUserType,
        description="Fetch the current user's admin information",
    )

    def resolve_admin_user(self, info) -> AdminUserType:
        try:
            admin_user = g.current_user.admin_user

            if not admin_user:
                raise GraphQLError(
                    "Current user does not have admin privileges or admin user not found"
                )

            return admin_user
        except Exception as e:
            raise GraphQLError(
                f"Failed to fetch current user's admin information: {str(e)}"
            )
