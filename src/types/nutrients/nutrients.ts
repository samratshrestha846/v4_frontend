/**
 * Represents a nutrient with information about its methane reduction properties.
 */
type Nutrient = {
  id: number;
  /** The name of the nutrient. */
  name: string;
  /**
   * Indicates whether the nutrient is a methane reducer.
   * If true, `methane_reduction_factor` should be provided.
   */
  is_methane_reducer: boolean;
  /**
   * The methane reduction factor of the nutrient.
   * Should be provided only if `is_methane_reducer` is true.
   */
  methane_reduction_factor?: number;
};

export default Nutrient;
