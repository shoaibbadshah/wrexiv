# Globaldeel Frontend
## Contentful codegen

Notion のメモに書いてあるコマンドを一旦は直接実行する
yarn cf-content-types-generator --spaceId $CONTENTFUL_SPACE_ID --token $CONTENTFUL_MANAGEMENT_TOKEN -o src/contentful/types -X && prettier --write src/contentful/types

これで cors 解除してある。abe@wrexiv.com のパスワードが必要
gsutil cors set cors.json gs://dreammvp.appspot.com

## components

App router よくわからないので、一旦 components の中で。
page 固有のものを /pages に入れ、atoms, molecules, organisms は共通


# how to run
this project uses NextJS 14 with App Router
first, setup the `.env`
```bash
cp .env.example .env
```

then fill it up with the correct env. ask your supervisor for the correct env

install the dependencies (use `yarn`)
```bash
yarn install
```
then, run the project
```bash
yarn dev
```

it should run on your `localhost:3000`

# Documentation
to help you understand the structure of this code faster, you can check this [notion](https://www.notion.so/globaldeel/GlobalDeel-Structure-6074c31e35c544ba9e51a0b992cf801a?pvs=4).
