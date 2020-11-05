from aws_cdk import core


class TwitStack(core.Stack):

    def __init__(self, scope: core.Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)
        
        self.role = aws_iam.Role(
            self,
            id="training-twit-role",
            assumed_by=aws_iam.ServicePrincipal('lambda.amazonaws.com'),
        )
        self.role.add_managed_policy(aws_iam.ManagedPolicy.from_managed_policy_name('AWSLambdaBasicExecutionRole'))

        self.table = aws_dynamodb.Table(
            self,
            id="TwitTable",
            table_name=f"training-minitwit",
            billing_mode=aws_dynamodb.BillingMode.PAY_PER_REQUEST,
            partition_key=aws_dynamodb.Attribute(
                name='messae_id',
                type=aws_dynamodb.AttributeType.STRING
            ),
            sort_key=aws_dynamodb.Attribute(
                name='date',
                type=aws_dynamodb.AttributeType.STRING
            )
        )
        
        self.table.grant_read_write_data(self.role)
