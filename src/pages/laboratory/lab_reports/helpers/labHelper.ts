import { LabSample } from '../../../../types/lab/labSampleList';
import {
  LAB_SAMPLE_TYPE_PASTURE,
  LAB_SAMPLE_TYPE_WATER,
  PASTURE_SAMPLE_RESULTS,
  WATER_SAMPLE_DETAULT_RESULTS,
  WATER_SAMPLE_OTHERS_RESULTS,
} from '../../../../constants/labConstants';
import { Param } from '../../../../types/lab/labTestParams';
import { LabTestResultView } from '../../../../types/lab/labTestResult';

export default function prepareLabTestResults(labSamples?: LabSample[] | null) {
  const defaultResults: LabTestResultView[] = [];
  const otherResults: LabTestResultView[] = [];

  const getResultByKey = (
    testResults: Param[] | undefined,
    paramKey: string
  ) => {
    const testParams: Param[] = [];
    testResults?.forEach((param) => {
      if (param && param.sub_params && param.sub_params.length > 0) {
        param.sub_params?.map((subParam) => testParams.push(subParam));
      } else {
        testParams.push(param);
      }
    });

    return testParams.find((item) => item.key === paramKey);
  };

  if (LAB_SAMPLE_TYPE_PASTURE === labSamples?.[0]?.lab_sample_type?.name) {
    labSamples?.forEach((sample) => {
      const results: Param[] = [];
      PASTURE_SAMPLE_RESULTS?.forEach((item) => {
        const paramElement = getResultByKey(
          sample.lab_test_result?.results,
          item.key
        );
        results.push({ ...item, result: paramElement?.result });
      });
      defaultResults.push({
        lab_sample_id: sample.id,
        lab_sample_type: LAB_SAMPLE_TYPE_PASTURE,
        sampleId: sample.sample_id,
        animal_specs: sample.animal_specs,
        grass_species: sample.grass_species,
        results,
      });
    });
  }

  if (LAB_SAMPLE_TYPE_WATER === labSamples?.[0]?.lab_sample_type?.name) {
    labSamples?.forEach((sample) => {
      const results: Param[] = [];
      const additionalResults: Param[] = [];
      WATER_SAMPLE_DETAULT_RESULTS?.forEach((item) => {
        const paramElement = getResultByKey(
          sample?.lab_test_result?.results,
          item.key
        );
        results.push({ ...item, result: paramElement?.result });
      });

      defaultResults.push({
        lab_sample_id: labSamples?.[0]?.id,
        lab_sample_type: LAB_SAMPLE_TYPE_WATER,
        sampleId: sample.sample_id,
        animal_specs: labSamples?.[0]?.animal_specs,
        grass_species: labSamples?.[0]?.grass_species,
        results,
      });

      WATER_SAMPLE_OTHERS_RESULTS?.forEach((item) => {
        const paramElement = getResultByKey(
          sample?.lab_test_result?.results,
          item.key
        );
        additionalResults.push({ ...item, result: paramElement?.result });
      });

      otherResults.push({
        lab_sample_id: labSamples?.[0]?.id,
        lab_sample_type: LAB_SAMPLE_TYPE_WATER,
        sampleId: sample.sample_id,
        animal_specs: labSamples?.[0]?.animal_specs,
        grass_species: labSamples?.[0]?.grass_species,
        results: additionalResults,
      });
    });
  }

  return { defaultResults, otherResults };
}
