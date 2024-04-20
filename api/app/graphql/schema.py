from app.graphql.mutations.add_summary_to_article import AddSummaryToArticle
from app.graphql.mutations.add_translation_to_article import AddTranslationToArticle
from app.graphql.mutations.delete_article import DeleteArticle
from app.graphql.mutations.generate_direct_message import GenerateDirectMessage
from app.graphql.mutations.generate_leads import GenerateLeads
from app.graphql.mutations.send_direct_message import SendDirectMessage
from app.graphql.mutations.send_emails import SendEmails
from app.graphql.resolvers.admin_user_resolver import AdminUserResolver
from app.graphql.resolvers.article_resolver import ArticleResolver
from app.graphql.resolvers.article_search_conditions_resolver import (
    ArticleSearchConditionsResolver,
)
from app.graphql.resolvers.articles_resolver import ArticlesResolver
from app.graphql.resolvers.company_contacts_resolver import CompanyContactsResolver
from app.graphql.resolvers.lead_contacts_resolver import LeadContactsResolver
from app.graphql.resolvers.lead_resolver import LeadResolver
import graphene

from app.graphql.resolvers.hello_resolver import HelloResolver
from app.graphql.resolvers.me_resolver import MeResolver
from app.graphql.resolvers.my_tenant_resolver import MyTenantResolver
from app.graphql.resolvers.my_tenant_user_resolver import MyTenantUserResolver
from app.graphql.resolvers.leads_resolver import LeadsResolver
from app.graphql.resolvers.lead_requests_resolver import LeadRequestsResolver
from app.graphql.resolvers.assistant_chat_messages_resolver import (
    AssistantChatMessagesResolver,
)
from app.graphql.resolvers.assistant_chat_threads_resolver import (
    AssistantChatThreadsResolver,
)
from app.graphql.resolvers.article_search_keywords_resolver import (
    ArticleSearchKeywordsResolver,
)

from app.graphql.mutations.create_tenant import CreateTenant
from app.graphql.mutations.create_assistant_chat_thread import CreateAssistantChatThread
from app.graphql.mutations.create_assistant_chat_message import (
    CreateAssistantChatMessage,
)
from app.graphql.mutations.generate_content import GenerateContent
from app.graphql.mutations.generate_articles import GenerateArticles


class Mutation(graphene.ObjectType):
    create_tenant = CreateTenant.Field()
    create_assistant_chat_thread = CreateAssistantChatThread.Field()
    create_assistant_chat_message = CreateAssistantChatMessage.Field()
    generate_content = GenerateContent.Field()
    generate_articles = GenerateArticles.Field()
    add_summary_to_article = AddSummaryToArticle.Field()
    add_translation_to_article = AddTranslationToArticle.Field()
    delete_article = DeleteArticle.Field()
    generate_leads = GenerateLeads.Field()
    send_emails = SendEmails.Field()
    send_direct_message = SendDirectMessage.Field()
    generate_direct_message = GenerateDirectMessage.Field()


class Query(
    HelloResolver,
    MeResolver,
    MyTenantResolver,
    MyTenantUserResolver,
    LeadsResolver,
    LeadRequestsResolver,
    AssistantChatMessagesResolver,
    AssistantChatThreadsResolver,
    ArticleSearchKeywordsResolver,
    ArticleResolver,
    ArticlesResolver,
    ArticleSearchConditionsResolver,
    CompanyContactsResolver,
    LeadContactsResolver,
    LeadResolver,
    AdminUserResolver,
    graphene.ObjectType,
):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
