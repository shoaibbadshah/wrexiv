from app.graphql.types.language_type import LanguageType
from app.lib.chat_gpt import ChatGPT
import graphene


# なぜか全て大文字になって生成される。原因不明
class PlatformEnum(graphene.Enum):
    FACEBOOK = "facebook"
    TWITTER = "twitter"
    INSTAGRAM = "instagram"
    LINKEDIN = "linkedin"


class ContentResponse(graphene.ObjectType):
    language = graphene.Field(LanguageType)
    platform = graphene.Field(PlatformEnum)
    output = graphene.String()


class GenerateContentInput(graphene.InputObjectType):
    thread_id = graphene.UUID(required=True)
    input_text = graphene.String(required=True)


class GenerateContent(graphene.Mutation):
    class Arguments:
        input = GenerateContentInput(required=True)

    posts = graphene.Field(graphene.List(graphene.NonNull(ContentResponse)))

    def mutate(self, info, input):
        print("-----")
        print(input)

        chat_gpt = ChatGPT()

        posts_data = chat_gpt.generate_content(input.input_text)

        posts_responses = [
            ContentResponse(
                language=post["language"],
                platform=post["platform"],
                output=post["output"],
            )
            for post in posts_data
        ]

        return GenerateContent(posts=posts_responses)
