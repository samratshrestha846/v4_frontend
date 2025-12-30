import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { UseFormSetValue } from 'react-hook-form';

import { LabTestParams } from '../../../../types/lab/labTestParams';
import { getTestParamsByKey } from '../helpers/testParamHelper';
import {
  LabSample,
  LabSampleFormValues,
} from '../../../../types/lab/labSampleList';
import { LabelNumericValue } from '../../../../types/common';
import { LAB_SAMPLE_TYPE_PASTURE } from '../../../../constants/labConstants';

type Props = {
  testParameters?: LabTestParams;
  setValue: UseFormSetValue<LabSampleFormValues>;
  sampleData?: LabSample;
  testType?: string;
  labSampleType?: LabelNumericValue;
  selectedTestParam:
    | Record<
        string,
        { isSelectedAll: boolean; selectedKeys: Record<string, boolean> }
      >
    | undefined;
  setSelectedTestParam: Dispatch<
    SetStateAction<
      | Record<
          string,
          {
            isSelectedAll: boolean;
            selectedKeys: Record<string, boolean>;
          }
        >
      | undefined
    >
  >;
};

export default function useHandleCheckUncheckTestParameters({
  testParameters,
  setValue,
  sampleData,
  testType,
  labSampleType,
  selectedTestParam,
  setSelectedTestParam,
}: Props) {
  const defaultParams = 'default_params';

  const [recentSelectAll, setRecentSelectAll] = useState<{
    key: string;
    status: boolean;
  }>();

  const handleSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
    const paramsStatus: Record<string, boolean> = {};

    const paramsWithoutSubParams = Object.keys(
      selectedTestParam?.[
        e.target.value === defaultParams ? defaultParams : e.target.value
      ].selectedKeys || {}
    );

    paramsWithoutSubParams?.forEach((item) => {
      paramsStatus[item] = e.target.checked;
    });

    setSelectedTestParam((preVal) => ({
      ...preVal,
      [e.target.value === defaultParams ? defaultParams : e.target.value]: {
        isSelectedAll: e.target.checked,
        selectedKeys: paramsStatus,
      },
    }));
    setRecentSelectAll({ key: e.target.value, status: e.target.checked });
  };

  useEffect(() => {
    if (sampleData && testParameters) {
      // for params without sub params
      const paramList: Record<
        string,
        { isSelectedAll: boolean; selectedKeys: Record<string, boolean> }
      > = {};

      let selectedParamKeys: string[] = [];
      // If the test type matches the previous lab sample's test type,
      // select parameters based on the default parameters from the previous sample that do not contain sub-parameters.

      if (testType && labSampleType?.label === LAB_SAMPLE_TYPE_PASTURE) {
        if (testType === sampleData?.lab_test_param?.test_type) {
          selectedParamKeys =
            sampleData.default_test_parameters
              ?.filter((item) => !item?.sub_params)
              .map((item) => item?.key) ?? [];
        } else {
          // If the test type differs from the previous lab sample's test type,
          // select parameters based on those marked as default in the current test parameters.
          selectedParamKeys =
            testParameters?.params
              ?.filter((item) => item.is_default)
              .map((item) => item.key) ?? [];

          selectedParamKeys.forEach((element) => {
            setValue(`default_test_parameters[${element}]` as any, true);
          });
        }
      } else {
        selectedParamKeys =
          sampleData.default_test_parameters
            ?.filter((item) => !item?.sub_params)
            .map((item) => item?.key) ?? [];
      }

      const paramsWithoutSubParams = testParameters?.params
        ?.filter((item) => !item.sub_params)
        .map((item) => item.key);
      const defaultParamsStatus: Record<string, boolean> = {};

      if (paramsWithoutSubParams) {
        paramsWithoutSubParams.forEach((item) => {
          defaultParamsStatus[item] = !!selectedParamKeys?.includes(item);
        });
      }

      // check all params checked or not
      const isDefaultParamsAllChecked = paramsWithoutSubParams?.every(
        (itemKey) => selectedParamKeys?.includes(itemKey)
      );
      paramList.default_params = {
        isSelectedAll: !!isDefaultParamsAllChecked,
        selectedKeys: defaultParamsStatus,
      };

      // for params with sub params
      const paramsWithSubParams = testParameters?.params.filter(
        (item) => 'sub_params' in item
      );

      paramsWithSubParams?.forEach((item) => {
        const paramsStatus: Record<string, boolean> = {};

        const subParamsKeyList = getTestParamsByKey({
          paramKey: item.key,
          params: testParameters?.params,
        })?.sub_params?.map((element) => element.key);

        const selectedParamWithSubParamsKeyList = getTestParamsByKey({
          paramKey: item.key,
          params: sampleData?.default_test_parameters as any,
        })?.sub_params?.map((element) => element.key);

        const isChecked = !!subParamsKeyList?.every((itemKey) =>
          selectedParamWithSubParamsKeyList?.includes(itemKey)
        );

        if (subParamsKeyList) {
          subParamsKeyList.forEach((element) => {
            paramsStatus[element] =
              !!selectedParamWithSubParamsKeyList?.includes(element);
          });
        }
        paramList[item.key] = {
          isSelectedAll: isChecked,
          selectedKeys: paramsStatus,
        };
      });

      setSelectedTestParam(paramList);
    }
  }, [sampleData, testParameters, testType]);

  useEffect(() => {
    if (selectedTestParam && recentSelectAll) {
      const paramsWithoutSubParams = Object.keys(
        selectedTestParam?.[recentSelectAll.key].selectedKeys
      );
      paramsWithoutSubParams?.forEach((item: string) => {
        if (recentSelectAll.key === defaultParams) {
          setValue(
            `default_test_parameters[${item}]` as any,
            selectedTestParam?.[recentSelectAll.key]?.selectedKeys[item]
          );
        } else {
          setValue(
            `default_test_parameters[${recentSelectAll.key}][${item}]` as any,
            selectedTestParam?.[recentSelectAll.key]?.selectedKeys[item]
          );
        }
      });
    }
  }, [selectedTestParam, recentSelectAll, setValue]);

  const isAllParamSelected = (
    key: string,
    fieldName: string,
    fieldValue: boolean
  ) => {
    const updatedTestParams = {
      ...selectedTestParam,
      [key]: {
        ...selectedTestParam?.[key],
        selectedKeys: {
          ...selectedTestParam?.[key].selectedKeys,
          [fieldName]: fieldValue,
        },
      },
    };
    const param = Object.values(
      updatedTestParams?.[key].selectedKeys || {}
    ).every((val) => val === true);
    setRecentSelectAll({ key, status: param });
    return param;
  };

  const propagateOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    let fieldName = e.target.name.replace('][', '.');
    fieldName = fieldName.replace('[', '.');
    fieldName = fieldName.replace(']', '');
    const fieldNameKeys = fieldName.split('.');
    let selectedKeys = selectedTestParam;

    selectedKeys = {
      ...selectedKeys,
      [fieldNameKeys.length === 2 ? defaultParams : fieldNameKeys[1]]: {
        isSelectedAll: isAllParamSelected(
          fieldNameKeys.length === 2 ? defaultParams : fieldNameKeys[1],
          fieldNameKeys.length === 2 ? fieldNameKeys[1] : fieldNameKeys[2],
          e.target.checked
        ),
        selectedKeys: {
          ...selectedTestParam?.[
            fieldNameKeys.length === 2 ? defaultParams : fieldNameKeys[1]
          ]?.selectedKeys,
          [fieldNameKeys.length === 2 ? fieldNameKeys[1] : fieldNameKeys[2]]:
            e.target.checked,
        },
      },
    };
    setSelectedTestParam(selectedKeys);
  };

  return {
    selectedTestParam,
    recentSelectAll,
    handleSelectAll,
    propagateOnChange,
  };
}
