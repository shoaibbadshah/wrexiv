from app.graphql.types.lead_type import LeadType
from app.lib.crawlbase_api import CrawlbaseAPI
from app.lib.extractor_api import ExtractorAPI
from app.lib.link_preview import LinkPreview
from app.lib.scrapin_api import ScrapinAPI
from app.lib.serp_api import SerpApiSearch
from app.lib.social_searcher_api import SocialSearcherAPI
from app.lib.zyla_api import ZylaAPI
from app.models.lead import Lead
from app.models.organization import Organization
import graphene
from app.infra.database import db
from flask import g


social_searcher_api = SocialSearcherAPI()
zyla_api = ZylaAPI()
serp_api = SerpApiSearch()
link_preview_api = LinkPreview()
extractor_api = ExtractorAPI()
scrapin_api = ScrapinAPI()
crawlbase_api = CrawlbaseAPI()

MAX_LEADS = 10


def create_lead_from_title_and_snippet(title):
    parts = title.split("-")
    if len(parts) == 3:
        name, position, company = parts
    else:
        name = title
        position = None
        company = None

    lead = Lead(
        name=name.strip(),
        title=position.strip() if position else None,
        # organization_name=company.strip() if company else None,
    )

    return lead


class GenerateLeadsInput(graphene.InputObjectType):
    description = graphene.String(required=True)


class GenerateLeads(graphene.Mutation):
    class Arguments:
        input = GenerateLeadsInput(required=True)

    leads = graphene.Field(LeadType)

    def mutate(root, info, input):
        results = serp_api.google_search(
            q=f'site:linkedin.com/in/ AND "{input.description}"'
        )
        print(results)
        leads_list = []
        if "organic_results" in results:
            # for item in results["organic_results"]:
            for item in results["organic_results"][:MAX_LEADS]:
                lead = create_lead_from_title_and_snippet(item["title"])
                lead.description = item.get("snippet", "")
                lead.channel = "linkedin"
                lead.linkedin_url = item.get("link", "")
                lead.tenant_id = g.current_tenant.id

                # scrapln からデータを補完、が死にがち
                profile = scrapin_api.fetch_profile_details(lead.linkedin_url)
                if profile:

                    person = profile.get("person")

                    if person:
                        lead.name = (
                            (person.get("lastName") or "")
                            + " "
                            + (person.get("firstName") or "")
                        )
                        lead.avatar = person.get("photoUrl", lead.avatar)
                        lead.title = person.get("headline", lead.title)

                        location_str = person.get("location", "")
                        parts = location_str.split(", ")
                        country = parts[-1]
                        region = parts[-2] if len(parts) > 2 else ""
                        lead.country = country
                        lead.region = region

                        lead.linkedin_url = person.get("linkedInUrl")
                        lead.description = person.get("summary", lead.description)

                    company = profile.get("company")
                    if company:
                        organization = Organization(
                            name=company.get("name"),
                            logo=company.get("logo"),
                            description=company.get("description"),
                            phone=company.get("phone"),
                            industry=company.get("industry"),
                            linkedin_url=company.get("linkedInUrl"),
                            website=company.get("websiteUrl"),
                        )

                        headquarter = company.get("headquarter")
                        if headquarter:
                            organization.country = headquarter.get("country")
                            organization.region = headquarter.get("geographicArea")

                        db.session.add(organization)
                        db.session.commit()

                        lead.organization_id = organization.id

                # うまくいかないことが多いので off
                # preview_data = link_preview_api.get_preview_data(lead.link)
                # if preview_data:
                #     lead.avatar = preview_data.image
                #     lead.description = preview_data.description or lead.description

                leads_list.append(lead)

        for lead in leads_list:
            db.session.add(lead)
            db.session.commit()

        return leads_list
