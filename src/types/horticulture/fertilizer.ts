export type Fertilizer = {
  id: number;
  name: string;
  nutrition_combination: Record<string, number>;
  is_active: boolean;
  water_mass: number;
  fertilizer_mass: number;
  solution_volume: number;
  solution_weight: number;
};

export type FertilizerFormFields = {
  name: string;
  nutrition_combination: Record<string, number>;
  is_active: boolean;
  water_mass: number;
  fertilizer_mass: number;
  solution_volume: number;
  solution_weight?: number;
};

export type FertilizerQueryParams = {
  status?: number;
  name?: string;
};
