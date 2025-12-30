import { Param, SubParam } from '../../../../types/lab/labTestParams';

/* eslint-disable import/prefer-default-export */
const getTestParamsByKey = ({
  paramKey,
  params,
}: {
  paramKey: string | Param;
  params: Param[] | undefined;
}): Param => {
  let testParamsObject;
  if (params && typeof paramKey === 'string') {
    testParamsObject = params.find((item) => item.key === paramKey);
  }

  if (params && typeof paramKey === 'object') {
    const parentKey = Object.keys(paramKey)?.[0];

    const subParamsValues: any = Object.values(paramKey)?.[0];
    const searchParam: any = params?.find((item) => item.key === parentKey);
    const subTestParameters: SubParam[] = [];
    searchParam?.sub_params?.forEach((subItem: SubParam) => {
      if (subParamsValues.includes(subItem.key)) {
        subTestParameters.push(subItem);
      }
    });
    testParamsObject = { ...searchParam, sub_params: subTestParameters };
  }
  return testParamsObject;
};

export { getTestParamsByKey };
