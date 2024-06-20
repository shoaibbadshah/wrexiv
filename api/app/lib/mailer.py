from sendgrid.helpers.mail import Mail, TemplateId, DynamicTemplateData, From
from sendgrid import SendGridAPIClient

from flask import current_app as app
import os

class Mailer:
    def __init__(self):
        self.client = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))

    def send_talent_invitation(self, to: str, talent_name: str, agency_name: str):
        message = Mail(
            from_email=From(
                name=os.environ.get('SENDGRID_FROM_NAME'),
                email=os.environ.get('SENDGRID_FROM_EMAIL')
            ),
            to_emails=[to],
        )

        message.template_id = TemplateId(os.environ.get('SENDGRID_TALENT_INVITATION_TEMPLATE_ID'))
        message.dynamic_template_data = DynamicTemplateData({
            "talent_name": talent_name,
            "agency_name": agency_name
        })

        try:
            self.client.send(message)
        except Exception as e:
            app.logger.error(e)
            return False
        
        app.logger.info(f"Email sent to {to}")
        return True
