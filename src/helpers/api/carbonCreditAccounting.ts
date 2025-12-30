import {
  CARBON_EMISSION_REDUCTIONS,
  CARBON_EMISSION_REDUCTIONS_SUMMARY,
  CARBON_TOP_PERFORMERS_CUSTOMERS,
  CARBON_TOP_PERFORMERS_PROPERTIES,
  CARBON_TOP_PERFORMERS_SITES,
} from '../../constants/apiUrls';
import {
  CarbonEmissionReduction,
  CarbonEmissionReductionSummary,
  CarbonEmissionReductionSummaryQueryParams,
  CarbonTopPerformerQueryParameters,
  ListCarbonTopPerformerCustomerResponse,
  ListCarbonTopPerformerPropertiesResponse,
  ListCarbonTopPerformerSitesResponse,
} from '../../types/carbon-accounting/carbonAccounting';
import { APICore } from './apiCore';

function carbonCreditAccounting() {
  const apiCore = new APICore();

  return {
    fetchCarbonEmissionReductions:
      async (): Promise<CarbonEmissionReduction> => {
        const response = await apiCore.get(CARBON_EMISSION_REDUCTIONS);
        return response.data.body;
      },

    fetchCarbonEmissionReductionsSummary: async (
      params: CarbonEmissionReductionSummaryQueryParams
    ): Promise<CarbonEmissionReductionSummary> => {
      const response = await apiCore.get(
        CARBON_EMISSION_REDUCTIONS_SUMMARY,
        params
      );
      return response.data.body;
    },

    fetchCarbonTopPerformersSites: async (
      params: CarbonTopPerformerQueryParameters
    ): Promise<ListCarbonTopPerformerSitesResponse> => {
      const response = await apiCore.get(CARBON_TOP_PERFORMERS_SITES, params);
      return response.data;
    },

    fetchCarbonTopPerformersProperties: async (
      params: CarbonTopPerformerQueryParameters
    ): Promise<ListCarbonTopPerformerPropertiesResponse> => {
      const response = await apiCore.get(
        CARBON_TOP_PERFORMERS_PROPERTIES,
        params
      );
      return response.data;
    },

    fetchCarbonTopPerformersCustomers: async (
      params: CarbonTopPerformerQueryParameters
    ): Promise<ListCarbonTopPerformerCustomerResponse> => {
      const response = await apiCore.get(
        CARBON_TOP_PERFORMERS_CUSTOMERS,
        params
      );
      return response.data;
    },
  };
}

export default carbonCreditAccounting();
