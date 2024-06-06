from sendgrid.helpers.mail import Mail, TemplateId, DynamicTemplateData
from sendgrid import SendGridAPIClient

import logging
import os

class Mailer:
    def __init__(self):
        self.client = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))

    def send_talent_invitation(self, to: str, talent_name: str, agency_name: str):
        message = Mail(
            from_email="info@globaldeel.com",
            to_emails=[to],
        )

        message.template_id = TemplateId("d-215c9813fcba4f1b80135dce7c5b5d54")
        message.dynamic_template_data = DynamicTemplateData({
            "talent_name": talent_name,
            "agency_name": agency_name
        })

        try:
            self.client.send(message)
        except Exception as e:
            logging.error(e)
            return False
        
        return True
