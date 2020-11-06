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
        name = UnicodeAttribute()
        content = UnicodeAttribute()


def get_message(event, context):
    print("event_body", event["body"])
    event_body = json.loads(event["body"])
    response = {}

    # try:
    messages = Message.query("999")#limit=5, last_evaluated_key=event_body["lastEvaluatedKey"])
    message_serializable = []
    print("messages", messages)
    for message in messages:
        message_serializable.append({
            "date": message.date,
            "name": message.name,
            "content": message.content,
        })

    response = {
        "statusCode": 200,
        "body": json.dumps({ "messages": message_serializable })
    }
    # except:
    #     response = {
    #         "statusCode": 500,
    #     }

    return response

def create_message(event, context):
    event_body = json.loads(event["body"])
    print("event_body: ",event_body)
    new_twit = Message(**event_body)
    print("new_twit: ", new_twit)

    try:
        new_twit.save()
        response = {
            "statusCode": 201,
            "body": "Successfully created"
        }
    except :        
        response = {
            "statusCode": 500,
            "body": "Twit was not successfully created"
        }
    
    return response
