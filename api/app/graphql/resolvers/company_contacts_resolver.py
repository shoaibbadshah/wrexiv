from app.lib.crawlbase_api import CrawlbaseAPI
from app.lib.prospeo_api import ProspeoAPI
import graphene
from graphql import GraphQLError
from urllib.parse import urlparse

crawlbase_api = CrawlbaseAPI()
prespeo_api = ProspeoAPI()


def extract_domain(url):
    parsed_url = urlparse(url)
    domain = parsed_url.netloc
    if domain.startswith("www."):
        domain = domain[4:]
    return domain


class CompanyContactType(graphene.ObjectType):
    email = graphene.String(required=True)
    name = graphene.String(required=True)
    accuracy = graphene.Int(required=True)
    sources = graphene.List(graphene.NonNull(graphene.String), required=True)


class CompanyContactsResolver:

    company_contacts = graphene.List(
        graphene.NonNull(CompanyContactType),
        company_url=graphene.String(required=True),
        description="Fetch contact details for a company",
    )

    def resolve_company_contacts(self, info, company_url: str):
        domain = extract_domain(company_url)
        contacts = []

        # Fetch contacts from Crawlbase API
        crawlbase_contacts = crawlbase_api.fetch_company_emails(domain)
        if crawlbase_contacts:
            for contact in crawlbase_contacts["leads"]:
                contacts.append(
                    CompanyContactType(
                        email=contact["email"],
                        name=contact.get("last_name", "")
                        + " "
                        + contact.get("first_name", ""),
                        accuracy=contact["accuracy"],
                        sources=contact["sources"],
                    )
                )

        # Fetch contacts from Prespeo API
        prespeo_contacts = prespeo_api.find_emails_by_domain(domain)

        print(prespeo_contacts)

        if prespeo_contacts:
            for contact in prespeo_contacts["email_list"]:
                name_parts = [
                    contact.get("first_name", ""),
                    contact.get("last_name", ""),
                ]
                name = " ".join(filter(None, name_parts))
                contacts.append(
                    CompanyContactType(
                        email=contact["email"],
                        name=name,
                        accuracy=98,
                        sources=[],
                    )
                )

        if not contacts:
            return GraphQLError("Failed to fetch company contact details")

        return contacts
