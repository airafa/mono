/**
 * GraphQL API Contract Placeholders
 *
 * Contract-first: these interfaces define the expected GraphQL operations.
 * Implementation is blocked until backend owners deliver the schema document
 * and versioning policy.
 *
 * See: specs/001-project-architecture-infra/contracts/backend-interface-contracts.md
 */

export interface GraphQLContractOperation {
  type: 'query' | 'mutation' | 'subscription';
  name: string;
  description: string;
  authenticated: boolean;
  owner: string;
}

export const graphqlContracts: GraphQLContractOperation[] = [
  // Placeholder: populate when backend owners deliver the schema
];
