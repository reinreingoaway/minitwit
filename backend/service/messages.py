import json

from pynamodb.models import Model
from pynamodb.attributes import (
    UnicodeAttribute, NumberAttribute, UnicodeSetAttribute, UTCDateTimeAttribute
)

class Message(Model):
    class Meta:
        table_name = "training-minitwit"
        region = "eu-central-1"

        message_id = UnicodeAttribute(hash_key=True)
        date = UTCDateTimeAttribute(range_key=True)
        name = UnicodeAttribute(null=False)
        content = UnicodeAttribute(null=False)


def get_message(event, context):
    event_body = json.loads(event)["body"]
    response = {}

    try:
        messages = Message.query(limit=5, last_evaluated_key=event_body["lastEvaluatedKey"])
        message_serializable = []
        for message in messages:
            message_serializable.append({
                "date": message.date,
                "name": message.name,
                "content": message.content,
            })
        

        response = {
            "statusCode": 200,
            "body": json.dumps({ "lastEvaluatedKey": messages.last_evaluated_key, "messages": message_serializable })
        }
    except:
        response = {
            "statusCode": 500,
        }

    return response

# get_message(json.dumps({ "body": { "lastEvaluatedKey": "aa"}}), {})

def create_message(event, context):
    pass
