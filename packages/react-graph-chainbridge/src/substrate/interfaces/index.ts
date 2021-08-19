import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigFloat: string;
};


export type BigFloatFilter = {
  equalTo?: Maybe<Scalars['BigFloat']>;
};

export type ChainBridgeProposalApproval = {
  __typename?: 'ChainBridgeProposalApproval';
  id: Scalars['String'];
  depositNonce: Scalars['BigFloat'];
  originChainId: Scalars['Int'];
  approvalBlockHeight: Scalars['BigFloat'];
  approvalExtrinsic: Scalars['String'];
  signer: Scalars['String'];
};

export type ChainBridgeProposalApprovalsConnection = {
  __typename?: 'ChainBridgeProposalApprovalsConnection';
  nodes: Array<Maybe<ChainBridgeProposalApproval>>;
  totalCount: Scalars['Int'];
};

export type ChainBridgeProposalEventFilter = {
  depositNonce?: Maybe<BigFloatFilter>;
  originChainId?: Maybe<IntFilter>;
  and?: Maybe<Array<ChainBridgeProposalEventFilter>>;
};

export type ChainBridgeProposalExecution = {
  __typename?: 'ChainBridgeProposalExecution';
  id: Scalars['String'];
  depositNonce: Scalars['BigFloat'];
  originChainId: Scalars['Int'];
  signer: Scalars['String'];
};

export type ChainBridgeProposalExecutionsConnection = {
  __typename?: 'ChainBridgeProposalExecutionsConnection';
  nodes: Array<Maybe<ChainBridgeProposalExecution>>;
  totalCount: Scalars['Int'];
};

export type IntFilter = {
  equalTo?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  chainBridgeProposalApprovals?: Maybe<ChainBridgeProposalApprovalsConnection>;
  chainBridgeProposalExecutions?: Maybe<ChainBridgeProposalExecutionsConnection>;
};


export type QueryChainBridgeProposalApprovalsArgs = {
  filter?: Maybe<ChainBridgeProposalEventFilter>;
};


export type QueryChainBridgeProposalExecutionsArgs = {
  filter?: Maybe<ChainBridgeProposalEventFilter>;
};

export type GetChainBridgeProposalEventsByDepositNonceQueryVariables = Exact<{
  originChainId: Scalars['Int'];
  depositNonce: Scalars['BigFloat'];
}>;


export type GetChainBridgeProposalEventsByDepositNonceQuery = { __typename?: 'Query', chainBridgeProposalApprovals?: Maybe<{ __typename?: 'ChainBridgeProposalApprovalsConnection', nodes: Array<Maybe<{ __typename?: 'ChainBridgeProposalApproval', depositNonce: string, originChainId: number, approvalBlockHeight: string, approvalExtrinsic: string, signer: string }>> }>, chainBridgeProposalExecutions?: Maybe<{ __typename?: 'ChainBridgeProposalExecutionsConnection', nodes: Array<Maybe<{ __typename?: 'ChainBridgeProposalExecution', depositNonce: string, originChainId: number, signer: string }>> }> };


export const GetChainBridgeProposalEventsByDepositNonceDocument = gql`
    query getChainBridgeProposalEventsByDepositNonce($originChainId: Int!, $depositNonce: BigFloat!) {
  chainBridgeProposalApprovals(
    filter: {and: [{depositNonce: {equalTo: $depositNonce}, originChainId: {equalTo: $originChainId}}]}
  ) {
    nodes {
      depositNonce
      originChainId
      approvalBlockHeight
      approvalExtrinsic
      signer
    }
  }
  chainBridgeProposalExecutions(
    filter: {and: [{depositNonce: {equalTo: $depositNonce}, originChainId: {equalTo: $originChainId}}]}
  ) {
    nodes {
      depositNonce
      originChainId
      signer
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getChainBridgeProposalEventsByDepositNonce(variables: GetChainBridgeProposalEventsByDepositNonceQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetChainBridgeProposalEventsByDepositNonceQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetChainBridgeProposalEventsByDepositNonceQuery>(GetChainBridgeProposalEventsByDepositNonceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getChainBridgeProposalEventsByDepositNonce');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;