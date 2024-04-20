from graphene import print_schema
from graphene import Schema
from yourapp.schema import Query

schema = Schema(query=Query)
print(schema)

# スキーマを SDL ファイルに出力
with open("schema.graphql", "w") as file:
    file.write(print_schema(schema))
