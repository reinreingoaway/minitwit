import json

from pynamodb.models import Model
from pynamodb.attributes import (
    UnicodeAttribute, NumberAttribute, UnicodeSetAttribute, UTCDateTimeAttribute
)

class Message(Model):
    class Meta:
        table_name = "training-minitwit"
        region = "eu-central-1"

        message_id = UnicodeAttribute(hash_key=true)
        date = UTCDateTimeAttribute(range_key=true)
        name = UnicodeAttribute(null=False)
        content = UnicodeAttribute(null=False)


def get_message(event, context):
    event_body = json.loads(event["body"])
    
    messages = Training.query()
    message_serializable = []

    response = {
        "statusCode": 200,
        "body": message
    }

    return response

def create_message(event, context):
    pass