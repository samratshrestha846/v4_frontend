import {
  SUPPLEMENT_NUTRIENTS,
  GET_METHANE_REDUCERS_NUTRIENTS,
  GET_NON_METHANE_REDUCERS_NUTRIENTS,
} from '../../constants/apiUrls';
import Nutrient from '../../types/nutrients/nutrients';
import { APICore } from './apiCore';

function apiSupplementNutrients() {
  const apiCore = new APICore();

  return {
    getMethaneReducerNutrients: async (): Promise<Nutrient[]> => {
      const response = await apiCore.get(GET_METHANE_REDUCERS_NUTRIENTS);
      return response.data.body;
    },
    getNonMethaneReducerNutrients: async (): Promise<Nutrient[]> => {
      const response = await apiCore.get(GET_NON_METHANE_REDUCERS_NUTRIENTS);
      return response.data.body;
    },
    createSupplementNutrient: async (formData: Nutrient) => {
      const response = await apiCore.create(SUPPLEMENT_NUTRIENTS, formData);
      return response.data;
    },
    updateSupplementNutrient: async (formData: Nutrient, id: number) => {
      const response = await apiCore.update(
        `${SUPPLEMENT_NUTRIENTS}/${id}`,
        formData
      );
      return response.data;
    },

    readSupplementNutrient: async (id: number): Promise<Nutrient> => {
      const response = await apiCore.get(`${SUPPLEMENT_NUTRIENTS}/${id}`);
      return response.data.body;
    },

    deleteSupplementNutrient: async (id: number): Promise<any> => {
      const response = await apiCore.delete(`${SUPPLEMENT_NUTRIENTS}/${id}`);
      return response.data;
    },

    getListSupplementNutrients: async (): Promise<Nutrient[]> => {
      const response = await apiCore.get(SUPPLEMENT_NUTRIENTS);
      return response.data.body;
    },
  };
}
export default apiSupplementNutrients();
