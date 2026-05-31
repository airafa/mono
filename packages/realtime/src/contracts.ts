/**
 * Realtime Contract Placeholders
 *
 * Contract-first: these interfaces define the expected SignalR hub events.
 * Implementation is blocked until backend owners deliver the hub contract
 * and event payload catalog.
 *
 * See: specs/001-project-architecture-infra/contracts/backend-interface-contracts.md
 */

export interface RealtimeContractEvent {
  hub: string;
  event: string;
  direction: 'server-to-client' | 'client-to-server';
  description: string;
  owner: string;
}

export const realtimeContracts: RealtimeContractEvent[] = [
  // Placeholder: populate when backend owners deliver the hub contract
];
