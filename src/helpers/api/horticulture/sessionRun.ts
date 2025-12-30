import { ASSIGN_AREA_AND_FERTILIZER_TO_SESSION_RUN } from '../../../constants/apiUrls';
import { AssignAreaAndFertilizerFormFields } from '../../../types/udoseAgs/udoseAgs';

import { prepareDynamicUrl } from '../../helpers';

import { APICore } from '../apiCore';

function apiSessionRun() {
  const api = new APICore();

  return {
    assignAreaAndFertilizer: async (
      fromData: AssignAreaAndFertilizerFormFields,
      id: number
    ): Promise<any> => {
      const response = await api.update(
        prepareDynamicUrl(ASSIGN_AREA_AND_FERTILIZER_TO_SESSION_RUN, id),
        fromData
      );
      return response.data.body;
    },
  };
}

export default apiSessionRun();
