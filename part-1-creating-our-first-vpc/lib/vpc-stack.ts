import * as cdk from '@aws-cdk/core';
import { Peer, Port, SecurityGroup, Vpc } from '@aws-cdk/aws-ec2';

export class VpcStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new Vpc(this, 'VPC', {
      maxAzs: 3,
      natGateways: 3
    });

    const ssh = new SecurityGroup(this, 'SSH-SG', {
      securityGroupName: 'open-ssh',
      vpc,
      allowAllOutbound: true
    });

    ssh.addIngressRule(Peer.anyIpv4(), Port.tcp(22));
    ssh.addIngressRule(Peer.anyIpv6(), Port.tcp(22));
  }
}
