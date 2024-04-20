import graphene


class HelloResolver:
    hello = graphene.String(name=graphene.String(default_value="World"))

    def resolve_hello(self, info, name):
        return "Hello " + name
