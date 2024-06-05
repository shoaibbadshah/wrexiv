import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, TemplateId, DynamicTemplateData

def send_talent_invitation(to: str, talent_name: str, agency_name: str):
    message = Mail(
        from_email="info@globaldeel.com",
        to_emails=[to],
    )

    message.template_id = TemplateId("d-215c9813fcba4f1b80135dce7c5b5d54")
    message.dynamic_template_data = DynamicTemplateData({
        "talent_name": talent_name,
        "agency_name": agency_name
    })

    sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
    sg.send(message)

