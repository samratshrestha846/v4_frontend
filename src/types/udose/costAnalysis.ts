import { SupplementNutrition } from '../supplements/supplement';

type NutrientCalculatorParams = {
  waterIntake: number;
  target_mineral: string;
  target_mineral_amount: string;
  supplementId: number;
  price: number;
};

type NutrientCostAnalysis = {
  supplementName: string;
  supplementIntake: number;
  costPerHeadPerDay: number;
  totalNutrientInGrams: number;
  waterIntake: number;
  doseRate: number;
  triggerPoint: number;
  concentration: number;
  breakdowns: SupplementNutrition;
};

export type { NutrientCalculatorParams, NutrientCostAnalysis };
