from app.graphql.types.send_emails_input_type import SendEmailsInputType
from app.lib.send_grid_api import SendGridAPI
import graphene
from flask import g

send_grid = SendGridAPI()


class SendEmails(graphene.Mutation):
    class Arguments:
        input = SendEmailsInputType(required=True)

    success = graphene.Boolean()

    def mutate(self, info, input):

        for email in input.emails:
            if "@" not in email:
                raise ValueError(f"{email} is not a valid email address")

            send_grid.send_email(
                from_email=g.current_user.email,
                to_email=email,
                subject=input.subject,
                html_content=input.body,
                cc_email=g.current_user.email,
            )

        return True
