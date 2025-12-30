export const SERVICE_TYPE_FSM = 'fsm';
export const SERVICE_TYPE_PAYG = 'payg';
export const SERVICE_TYPE_RESEARCH_AND_DEVELOPMENT = 'research_and_development';
export const SERVICE_TYPE_PROOF_OF_CONCEPT = 'proof_of_concept';
export const SERVICE_TYPE_BUSINESS_MINI = 'business_mini';
export const SERVICE_TYPE_BUSINESS_CLASSIC = 'business_classic';
export const SERVICE_TYPE_RENTAL = 'rental';

const SERVICE_TYPE_CONSTANTS: Record<string, string> = {
  [SERVICE_TYPE_FSM]: 'FSM',
  [SERVICE_TYPE_PAYG]: 'PAYG',
  [SERVICE_TYPE_RESEARCH_AND_DEVELOPMENT]: 'Research and Development',
  [SERVICE_TYPE_PROOF_OF_CONCEPT]: 'Proof of Concept',
  [SERVICE_TYPE_BUSINESS_MINI]: 'Business Mini',
  [SERVICE_TYPE_BUSINESS_CLASSIC]: 'Business Classic',
  [SERVICE_TYPE_RENTAL]: 'Rental',
};

export default SERVICE_TYPE_CONSTANTS;
