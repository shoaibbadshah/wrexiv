from app.graphql.types.lead_contact_type import LeadContactType
from app.lib.crawlbase_api import CrawlbaseAPI
from app.lib.prospeo_api import ProspeoAPI
from app.models.lead import Lead
from app.utilities.url_utilities import extract_domain
import graphene
from graphql import GraphQLError

crawlbase_api = CrawlbaseAPI()
prespeo_api = ProspeoAPI()


class LeadContactsResolver:

    lead_contacts = graphene.List(
        graphene.NonNull(LeadContactType),
        lead_ids=graphene.List(graphene.NonNull(graphene.UUID), required=True),
        description="Fetch contact details for leads",
    )

    def resolve_lead_contacts(self, info, lead_ids: list):

        leads: list[Lead] = Lead.query.filter(Lead.id.in_(lead_ids)).all()
        if not leads:
            return GraphQLError("No leads found with the provided IDs")

        domains = []
        for lead in leads:
            if lead.organization:
                domain = extract_domain(lead.organization.website)
                domains.append(domain)

        contacts = []
        for domain in domains:
            # Fetch contacts from Crawlbase API
            crawlbase_contacts = crawlbase_api.fetch_company_emails(domain)

            if isinstance(crawlbase_contacts, str):
                return GraphQLError(crawlbase_contacts)

            if crawlbase_contacts:
                for contact in crawlbase_contacts["leads"]:
                    contacts.append(
                        LeadContactType(
                            email=contact["email"],
                            name=contact.get("last_name", "")
                            + " "
                            + contact.get("first_name", ""),
                        )
                    )

            # Fetch contacts from Prespeo API
            prespeo_contacts = prespeo_api.find_emails_by_domain(domain)

            if isinstance(prespeo_contacts, str):
                return GraphQLError(prespeo_contacts)

            if prespeo_contacts:
                for contact in prespeo_contacts["email_list"]:
                    name_parts = [
                        contact.get("first_name", ""),
                        contact.get("last_name", ""),
                    ]
                    name = " ".join(filter(None, name_parts))
                    contacts.append(
                        LeadContactType(
                            email=contact["email"],
                            name=name,
                        )
                    )
        if not contacts:
            return GraphQLError("Failed to fetch lead contact details")

        unique_contacts = []
        seen_emails = set()
        for contact in contacts:
            if contact.email not in seen_emails:
                seen_emails.add(contact.email)
                unique_contacts.append(contact)
        contacts = unique_contacts

        return contacts
