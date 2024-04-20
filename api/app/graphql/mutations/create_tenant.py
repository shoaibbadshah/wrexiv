from app.graphql.types.tenant_type import TenantType
from app.models.tenant import Tenant
from app.models.tenant_user import TenantUser
import graphene
from app.infra.database import db
from sqlalchemy.exc import SQLAlchemyError
from flask import g


class CreateTenantUserInput(graphene.InputObjectType):
    name = graphene.String(required=True)


class CreateTenantInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    website = graphene.String()
    tenantUser = CreateTenantUserInput(required=True)


class CreateTenant(graphene.Mutation):
    class Arguments:
        input = CreateTenantInput(required=True)

    tenant = graphene.Field(TenantType)

    def mutate(self, info, input):
        # g.current_tenant で例外を吐いてしまう
        # if g.current_tenant:
        #     return g.current_tenant

        try:
            new_tenant = Tenant(name=input.name, website=input.website)
            db.session.add(new_tenant)
            db.session.flush()

            new_tenant_user = TenantUser(
                name=input.tenantUser.name,
                tenant_id=new_tenant.id,
                user_id=g.current_user.id,
            )
            db.session.add(new_tenant_user)

            db.session.commit()
        except SQLAlchemyError as e:
            db.session.rollback()
            raise e

        return CreateTenant(tenant=new_tenant)
