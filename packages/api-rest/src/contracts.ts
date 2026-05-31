/**
 * REST API Contract Placeholders
 *
 * Contract-first: these interfaces define the expected shape of REST endpoints.
 * Implementation is blocked until backend owners are named and endpoint
 * catalog plus auth rules are delivered.
 *
 * See: specs/001-project-architecture-infra/contracts/backend-interface-contracts.md
 */

export interface RestContractEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  description: string;
  authenticated: boolean;
  owner: string;
}

export const restContracts: RestContractEndpoint[] = [
  // Placeholder: populate when backend owners deliver the endpoint catalog
];
