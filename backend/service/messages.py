import json
import random
import boto3

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
    print("event", event)
    dynamodb = boto3.resource('dynamodb')
    print("dynamodb", dynamodb)
    table = dynamodb.Table('training-minitwit')

    print("table", table)
    response = {}
    print(event["queryStringParameters"])
    try:
        if "message_id" in event["queryStringParameters"]:
            lastEvaluatedKey = {
                "message_id": event["queryStringParameters"]["message_id"],
                "date": event["queryStringParameters"]["date"]
            }
            messages = table.scan(Limit=3, ExclusiveStartKey=lastEvaluatedKey)
        else:
            messages = table.scan(Limit=3)
        print(messages)
        message_serializable = []
        for message in messages["Items"]:
            message_serializable.append({
                "date": message["date"],
                "name": message["name"],
                "content": message["content"],
            })
        
        body = {
            "messages": message_serializable
        }

        if "LastEvaluatedKey" in messages:
            body["lastEvaluatedKey"] = messages["LastEvaluatedKey"]
        else:
            body["lastEvaluatedKey"] = None

        response = {
            "statusCode": 200,
            "body": json.dumps(body)
        }
    except:
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
