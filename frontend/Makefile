include .env

dump-schema:
	yarn dump-schema

generate-contentful-type:
	yarn cf-content-types-generator --spaceId ${CONTENTFUL_SPACE_ID} --token ${CONTENTFUL_MANAGEMENT_ACCESS_TOKEN} -o src/contentful/types -X && prettier --write src/contentful/types
