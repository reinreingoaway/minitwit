#!/usr/bin/env python3

from aws_cdk import core

from backend.twit_stack import TwitStack


app = core.App()
TwitStack(app, "twit")

app.synth()
