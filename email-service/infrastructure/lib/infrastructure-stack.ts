import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as ses from 'aws-cdk-lib/aws-ses';
import * as path from 'path';

interface LambdaSesEmailStackProps extends cdk.StackProps {
  domainName: string;
  subdomain: string;
  verifiedEmail: string;
  awsRegion: string;
  destination: string;
}

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: LambdaSesEmailStackProps) {
    super(scope, id, props);

    const { subdomain, verifiedEmail, awsRegion, destination } = props;

    new ses.CfnEmailIdentity(this, 'SESSubdomainIdentity', {
      emailIdentity: subdomain,
    });

    const lambdaRole = new iam.Role(this, 'LambdaSESSendEmailRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSESFullAccess'),
      ],
    });

    const emailFunction = new lambda.Function(this, 'EmailFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'lambda.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../src')),
      role: lambdaRole,
      environment: {
        VERIFIED_EMAIL: verifiedEmail,
        REGION: awsRegion,
        DESTINATION_EMAIL: destination 
      },
    });

    const api = new apigateway.LambdaRestApi(this, 'EmailApi', {
      handler: emailFunction,
    });
  }
}
