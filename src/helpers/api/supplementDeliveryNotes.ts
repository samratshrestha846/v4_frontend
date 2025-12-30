import {
  SUPPLEMENT_DELIVERIES_NOTE,
  SUPPLEMENT_DELIVERIES_NOTE_BY_ID,
} from '../../constants/apiUrls';
import {
  ListSupplementDeliveryNotesResponse,
  SupplementDelivery,
  SupplementDeliveryQueryParams,
} from '../../types/notes/supplementDeliveries';
import { prepareDynamicUrl } from '../helpers';

import { APICore } from './apiCore';

function supplementDeliveryNotesAPI() {
  const api = new APICore();

  return {
    supplementDeliveriesList: async (
      params: SupplementDeliveryQueryParams
    ): Promise<ListSupplementDeliveryNotesResponse> => {
      const response = await api.get(SUPPLEMENT_DELIVERIES_NOTE, params);
      return response.data;
    },

    getSupplementDeliverNoteById: async (
      id: number
    ): Promise<SupplementDelivery> => {
      const response = await api.get(
        prepareDynamicUrl(SUPPLEMENT_DELIVERIES_NOTE_BY_ID, id)
      );
      return response.data.body;
    },
  };
}

export default supplementDeliveryNotesAPI();
