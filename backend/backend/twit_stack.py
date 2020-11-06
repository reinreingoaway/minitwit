from aws_cdk import core, aws_dynamodb, aws_iam, aws_s3


class TwitStack(core.Stack):

    def __init__(self, scope: core.Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)
        
        self.role = aws_iam.Role(
            self,
            id="training-twit-role",
            assumed_by=aws_iam.ServicePrincipal('lambda.amazonaws.com'),
        )
        self.role.add_managed_policy(aws_iam.ManagedPolicy.from_aws_managed_policy_name('AWSLambdaBasicExecutionRole'))

        self.table = aws_dynamodb.Table(
            self,
            id="TwitTable",
            table_name=f"training-minitwit",
            billing_mode=aws_dynamodb.BillingMode.PAY_PER_REQUEST,
            partition_key=aws_dynamodb.Attribute(
                name='message_id',
                type=aws_dynamodb.AttributeType.STRING
            ),
            sort_key=aws_dynamodb.Attribute(
                name='date',
                type=aws_dynamodb.AttributeType.STRING
            )
        )
        self.table.grant_read_write_data(self.role)
        
        self.bucket = aws_s3.Bucket(self,
            access_control=aws_s3.BucketAccessControl.PRIVATE,
            id=f"MiniTwitBucket",
            bucket_name=f"training-minitwit-bucket",
            block_public_access=aws_s3.BlockPublicAccess(block_public_acls=True,
                    block_public_policy=True,
                    ignore_public_acls=True,
                    restrict_public_buckets=True),
            cors=[
                aws_s3.CorsRule(allowed_methods=[
                    aws_s3.HttpMethods.GET, aws_s3.HttpMethods.PUT, aws_s3.HttpMethods.HEAD,
                    aws_s3.HttpMethods.DELETE
                ],
                    allowed_headers=["*"],
                    allowed_origins=[])
            ])
