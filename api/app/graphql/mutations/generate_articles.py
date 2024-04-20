from datetime import datetime
from app.lib.extractor_api import ExtractorAPI
from app.lib.google_translater_api import GoogleTranslateAPI
from app.lib.gpts.keywords_extractor_gpt import KeywordsExtractorGPT
from app.lib.gpts.language_detector_gpt import LanguageDetectorGPT
from app.lib.link_preview import LinkPreview
from app.lib.serp_api import SerpApiSearch
from app.models.article import Article
from app.models.article_search_condition import ArticleSearchCondition
from app.graphql.types.article_type import ArticleType
from app.graphql.types.country_type import CountryType
from app.lib.chat_gpt import ChatGPT
from app.models.article_search_keyword import ArticleSearchKeyword
import graphene
from concurrent.futures import ThreadPoolExecutor, as_completed
from app.infra.database import db
from flask import g
import pytz
import random

chat_gpt = ChatGPT()
keywords_extractor = KeywordsExtractorGPT()
language_detector = LanguageDetectorGPT()
serp_search = SerpApiSearch()
link_preview = LinkPreview()
extractor_api = ExtractorAPI()
google_translate_api = GoogleTranslateAPI()


class GenerateArticlesInput(graphene.InputObjectType):
    description = graphene.String(required=True)
    countries = graphene.List(graphene.NonNull(CountryType), required=True)


class GenerateArticles(graphene.Mutation):
    class Arguments:
        input = GenerateArticlesInput(required=True)

    articles = graphene.Field(graphene.List(graphene.NonNull(ArticleType)))

    def mutate(self, info, input):

        languages = language_detector.detect_languages_from_countries(input.countries)

        results = []
        with ThreadPoolExecutor() as executor:
            future_to_language = {
                executor.submit(
                    keywords_extractor.pick_keyword_from_text,
                    input.description,
                    language,
                ): language
                for language in languages
            }

            for future in as_completed(future_to_language):
                language_info = future_to_language[future]
                try:
                    result = future.result()
                    formatted_result = {
                        "language": language_info["language"],
                        "country": language_info["country"],
                        "keywords": result["keywords"],
                    }
                    print(f"Formatted Result: {formatted_result}")
                    results.append(formatted_result)
                except Exception as exc:
                    print(
                        f"Language: {language_info['country']} generated an exception: {exc}"
                    )

        search_condition = ArticleSearchCondition(
            tenant_id=g.current_tenant.id,
            description=input.description,
            countries=input.countries,
        )
        db.session.add(search_condition)
        db.session.flush()

        for result in results:
            language = result["language"]
            for keyword in result["keywords"]:
                article_keyword = ArticleSearchKeyword(
                    keyword=keyword,
                    language=language,
                    country=result["country"],
                    article_search_condition_id=search_condition.id,
                )
                db.session.add(article_keyword)

        db.session.commit()

        max_keywords = 2
        max_articles = 2
        selected_results = random.sample(results, min(len(results), max_keywords))
        for result in selected_results:
            language = result["language"]
            for keyword in result["keywords"]:
                serp_results = serp_search.execute_search(q=keyword, tbs="qdr:w")
                news_results = serp_results.get("news_results", [])

                for news in news_results[:max_articles]:
                    source_url = news.get("link")
                    extracted_data = extractor_api.fetch_extractor_data(source_url)
                    cover_image = (
                        link_preview.get_image_preview(source_url)
                        or extracted_data["images"][0]
                        or news.get("thumbnail", "")
                    )

                    title = news.get("title")
                    snippet = news.get("snippet")

                    target_language = "en"
                    translated_title = google_translate_api.translate_text(
                        target_language, title
                    )
                    translated_snippet = google_translate_api.translate_text(
                        target_language, snippet
                    )
                    print(f"Translated Title: {translated_title}")
                    print(f"Translated Snippet: {translated_snippet}")

                    published_date = extracted_data.get("published_date")

                    article = Article(
                        title=translated_title,
                        snippet=translated_snippet,
                        body_original=extracted_data.get("text"),
                        source_url=source_url,
                        published_date=published_date,
                        cover_image=cover_image,
                        countries=[result["country"]],
                        language=language,
                        tenant_id=g.current_tenant.id,
                    )

                    db.session.add(article)

        db.session.commit()

        return []
