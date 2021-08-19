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
  BigInt: string;
  Bytes: string;
};



export type DepositRecord = {
  __typename?: 'DepositRecord';
  id: Scalars['ID'];
  transaction: Scalars['Bytes'];
  amount: Scalars['BigInt'];
  depositor: Scalars['Bytes'];
  destinationChainId: Scalars['Int'];
  destinationRecipient: Scalars['Bytes'];
  nonce: Scalars['BigInt'];
  resourceId: Scalars['Bytes'];
};

export type DepositRecord_Filter = {
  depositor?: Maybe<Scalars['Bytes']>;
  destinationChainId?: Maybe<Scalars['Int']>;
  nonce?: Maybe<Scalars['BigInt']>;
};

export enum DepositRecord_OrderBy {
  Id = 'id',
  Transaction = 'transaction',
  Amount = 'amount',
  Depositor = 'depositor',
  DestinationChainId = 'destinationChainId',
  DestinationRecipient = 'destinationRecipient',
  Nonce = 'nonce',
  ResourceId = 'resourceId'
}

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Proposal = {
  __typename?: 'Proposal';
  id: Scalars['ID'];
  depositNonce: Scalars['BigInt'];
  executedAt?: Maybe<Scalars['Bytes']>;
  originChainId: Scalars['Int'];
  resourceId: Scalars['Bytes'];
  status: ProposalStatus;
};

export enum ProposalStatus {
  Inactive = 'Inactive',
  Active = 'Active',
  Passed = 'Passed',
  Executed = 'Executed',
  Cancelled = 'Cancelled'
}

export type RootQuery = {
  __typename?: 'RootQuery';
  depositRecords: Array<DepositRecord>;
};


export type RootQueryDepositRecordsArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<DepositRecord_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<DepositRecord_Filter>;
};

export type DepositRecordsByDepositorQueryVariables = Exact<{
  depositor?: Maybe<Scalars['Bytes']>;
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
}>;


export type DepositRecordsByDepositorQuery = { __typename?: 'RootQuery', depositRecords: Array<{ __typename?: 'DepositRecord', amount: string, depositor: string, destinationChainId: number, destinationRecipient: string, nonce: string, resourceId: string, transaction: string }> };


export const DepositRecordsByDepositorDocument = gql`
    query depositRecordsByDepositor($depositor: Bytes, $first: Int, $skip: Int) {
  depositRecords(
    where: {depositor: $depositor}
    orderBy: nonce
    orderDirection: desc
    first: $first
    skip: $skip
  ) {
    amount
    depositor
    destinationChainId
    destinationRecipient
    nonce
    resourceId
    transaction
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    depositRecordsByDepositor(variables?: DepositRecordsByDepositorQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DepositRecordsByDepositorQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<DepositRecordsByDepositorQuery>(DepositRecordsByDepositorDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'depositRecordsByDepositor');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;