import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Personalization, Cc, Bcc, To


class SendGridAPI:
    def __init__(self, api_key=None):
        self.api_key = api_key if api_key else os.environ.get("SENDGRID_API_KEY")
        self.client = SendGridAPIClient(self.api_key)

    def send_email(self, from_email, to_email, subject, html_content, cc_email=None):

        print(to_email)

        message = Mail(
            from_email="info@globaldeel.com",
            subject=subject,
            html_content=html_content,
        )

        personalization = Personalization()
        personalization.add_to(To(to_email))

        if cc_email:
            personalization.add_cc(Cc(cc_email))

        message.add_personalization(personalization)

        try:
            response = self.client.send(message)
            print(response)
            return {
                "status_code": response.status_code,
                "body": response.body,
                "headers": response.headers,
            }
        except Exception as e:
            print(f"An error occurred: {e}")
            return None
