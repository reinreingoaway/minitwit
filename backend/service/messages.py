import json
import random

from pynamodb.models import Model
from pynamodb.attributes import (
    UnicodeAttribute, NumberAttribute, UnicodeSetAttribute, UTCDateTimeAttribute
)

class Message(Model):
    class Meta:
        table_name = "training-minitwit"
        region = "eu-central-1"

    message_id = UnicodeAttribute(hash_key=True)
    date = UnicodeAttribute(range_key=True)
    name = UnicodeAttribute()
    content = UnicodeAttribute()


def get_message(event, context):
    response = {}

    try:
        print("here")
        messages = Message.scan()
        message_serializable = []
        for message in messages:
            print("name", message.name)
            message_serializable.append({
                "date": message.date,
                "name": message.name,
                "content": message.content,
            })

        response = {
            "statusCode": 200,
            "body": json.dumps({ "messages": message_serializable, "lastEvaluatedKey": messages.last_evaluated_key })
        }
    except:
        print("exception")
        response = {
            "statusCode": 500,
            "message": "ERROR"
        }

    return response

def create_message(event, context):
    message_id = str(random.randrange(99999))
    event_body = json.loads(event["body"])
    event_body["message_id"] = message_id
    new_twit = Message(**event_body)
    
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
