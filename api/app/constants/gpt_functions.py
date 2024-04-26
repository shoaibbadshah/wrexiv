# from app.models.country_enum import CountryEnum
# from app.models.language_enum import LanguageEnum


# FORMAT_MARKETING_ASSETS = {
#     "name": "format_output",
#     "description": "ユーザーの指示に従って出力を整形する",
#     "parameters": {
#         "type": "object",
#         "properties": {
#             "posts": {
#                 "type": "array",
#                 "items": {
#                     "type": "object",
#                     "properties": {
#                         "language": {
#                             "type": "string",
#                             "description": "投稿する言語(ja, en, fr, de, zh, ko のどれか)",
#                         },
#                         "platform": {
#                             "type": "string",
#                             "description": "投稿先のプラットフォーム(facebook, twitter, linkedin, instagram のどれか)",
#                         },
#                         "output": {
#                             "type": "string",
#                             "description": "投稿する文章",
#                         },
#                     },
#                     "required": ["language", "platform", "output"],
#                 },
#             },
#         },
#         "required": ["posts"],
#     },
# }

# EXTRACT_KEYWORDS_FROM_TEXT_FUNCTION = {
#     "name": "extract_keywords_from_text",
#     "description": "与えられた文章から、指定された言語で、指定された数のキーワードを抽出する",
#     "parameters": {
#         "type": "object",
#         "properties": {
#             "language": {
#                 "type": "string",
#                 "description": "言語コード(ex. ja, en, fr...)",
#             },
#             "keywords": {
#                 "type": "array",
#                 "items": {
#                     "type": "string",
#                     "description": "抽出したキーワード",
#                 },
#             },
#         },
#         "required": ["language", "keywords"],
#     },
# }

# DETECT_LANGUAGES_FROM_COUNTRIES_FUNCTION_V1 = {
#     "name": "detect_languages_from_countries",
#     "description": "与えられた国名から、その国で話されている言語を検出する",
#     "parameters": {
#         "type": "object",
#         "properties": {
#             "languages": {
#                 "type": "array",
#                 "items": {
#                     "type": "string",
#                     "description": "検出された言語コード(ex. ja, en, fr...)",
#                 },
#             },
#         },
#         "required": ["languages"],
#     },
# }

# DETECT_LANGUAGES_FROM_COUNTRIES_FUNCTION_V2 = {
#     "name": "detect_languages_from_countries",
#     "description": "与えられた国名から、その国で話されている言語を検出する",
#     "parameters": {
#         "type": "object",
#         "properties": {
#             "languages": {
#                 "type": "array",
#                 "items": {
#                     "type": "object",
#                     "properties": {
#                         "language": {
#                             "type": "string",
#                             "description": "検出された言語コード(ex. ja, en, fr...)",
#                             "enum": [lang.value for lang in LanguageEnum],
#                         },
#                         "country": {
#                             "type": "string",
#                             "description": "検出された国コード(ex. ja, en, fr...)",
#                             "enum": [country.value for country in CountryEnum],
#                         },
#                     },
#                     "required": ["language", "country"],
#                 },
#             },
#         },
#         "required": ["languages"],
#     },
# }

# DETECT_LANGUAGES_FROM_COUNTRIES_FUNCTION_V3 = {
#     "name": "detect_languages_from_countries",
#     "description": "与えられた国名から、その国で話されている言語を検出する",
#     "parameters": {
#         "type": "object",
#         "properties": {
#             "languages": {
#                 "type": "array",
#                 "items": {
#                     "type": "object",
#                     "properties": {
#                         "language": {
#                             "type": "string",
#                             "description": "検出された言語コード(ex. ja, en, fr...)",
#                             "enum": [lang.value for lang in LanguageEnum],
#                         },
#                         "country": {
#                             "type": "string",
#                             "description": "検出された国コード(ex. ja, en, fr...)",
#                             "enum": [country.value for country in CountryEnum],
#                         },
#                     },
#                     "required": ["language", "country"],
#                 },
#             },
#         },
#         "required": ["languages"],
#     },
# }


COVER_LETTER_EXTRACTION = [
    {
        "type": "function",
        "function": {
            "name": "cover_letter_extraction",
            "description": "Extract job seekers information from cover letters.",
            "parameters": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        "description": "Job seeker's name",
                    },
                    "address": {
                        "type": "string",
                        "description": "Job seeker's address",
                    },
                    "email": {
                        "type": "string",
                        "description": "Job seeker's email",
                    },
                    "phone": {
                        "type": "string",
                        "description": "Job seeker's phone number",
                    },
                    "linkedin": {
                        "type": "string",
                        "description": "Job seeker's LinkedIn profile",
                    },
                    "website": {
                        "type": "string",
                        "description": "Job seeker's personal website",
                    },
                    "bio": {
                        "type": "string",
                        "description": "Job seeker's bio or summary written in the cover letter",
                    },
                },
                "required": ["name", "address", "email", "phone", "linkedin", "github", "website", "bio"],
            },
        }
    }
]