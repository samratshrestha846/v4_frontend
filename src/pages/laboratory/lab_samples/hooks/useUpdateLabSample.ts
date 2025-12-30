/* eslint-disable func-names */
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

import labSample from '../../../../helpers/api/labSample';

import useReadLabSample from './useReadLabSample';
import useTestParamsByLabSampleType from '../../lab_test_results/hooks/useTestParamsByLabSampleType';
import useTestTypesDropdownBySampleTypeId from '../../lab_test_results/hooks/useTestTypesDropdownBySampleTypeId';
import useUdoseSitesDropdown from '../../../../hooks/dropdown/useUdoseSitesDropdown';

import { LAB_SAMPLE_LIST } from '../../../../constants/path';
import { LabTestParams } from '../../../../types/lab/labTestParams';
import {
  LabelNumericValue,
  LabelValueDropdown,
} from '../../../../types/common';
import { LabSampleFormValues } from '../../../../types/lab/labSampleList';
import { getTestParamsByKey } from '../helpers/testParamHelper';
import { LAB_SAMPLE_TYPE_PASTURE } from '../../../../constants/labConstants';
import useLabSampleTypesDropdown from '../../../../hooks/dropdown/useLabSampleTypesDropdown';

export default function useUpdateLabSample() {
  const { id } = useParams();
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [fileUploaded, setFileUploaded] = useState<string>();

  const [customerPropertyId, setCustomerPropertyId] = useState<number>();
  const [labSampleType, setLabSampleType] = useState<LabelNumericValue>();
  const [labTestParamId, setLabTestParamId] = useState<number>();

  const [testParameters, setTestParameters] = useState<LabTestParams>();
  const [labTestTypeOptions, setLabTestTypeOptions] =
    useState<LabelValueDropdown[]>();
  const [siteOptions, setSiteOptions] = useState<LabelNumericValue[]>([]);

  const [selectedTestParam, setSelectedTestParam] =
    useState<
      Record<
        string,
        { isSelectedAll: boolean; selectedKeys: Record<string, boolean> }
      >
    >();

  const navigate = useNavigate();

  const {
    data: sitesDropdown,
    isFetching: isFetchingSiteOptions,
    isError: isErrorSiteOptions,
    isSuccess: isSuccessSiteOptions,
  } = useUdoseSitesDropdown(customerPropertyId);

  const {
    data: sampleData,
    isFetching: isFetchingSampleData,
    isError: isErrorSampleData,
  } = useReadLabSample();

  const {
    data: testParams,
    isFetching: isFetchingTestParams,
    isError: isErrorTestParams,
    testType,
    setTestType,
  } = useTestParamsByLabSampleType(labSampleType?.value);

  const {
    data: testTypesOptions,
    isFetching: isFetchingTestTypesOptions,
    isError: isErrorTestTypesOptions,
  } = useTestTypesDropdownBySampleTypeId(labSampleType?.value);

  const {
    data: labSampleTypeOptions,
    isFetching: isFetchingLabSampleTypeOptions,
    isError: isErrorLabSampleTypeOptions,
  } = useLabSampleTypesDropdown();

  const updateLabSample = (fromData: any) => {
    return labSample.updateLabSample(fromData, id);
  };

  const navigateToLabSampleList = () => {
    navigate(LAB_SAMPLE_LIST);
  };

  const onSuccess = (): void => {
    toast.success('Lab Sample Updated Successfully.');
    setSubmitted(false);
    navigateToLabSampleList();
  };

  const onError = (error: any) => {
    if (error.response && error.response.status === 417) {
      setServerValidationError(true);
      const errorData = error.response.data.errors;
      Object.keys(errorData).forEach((key) => {
        setError(key as any, {
          type: 'server',
          message: errorData[key][0],
        });
      });
    } else {
      toast.error(error.response.data.status.message);
    }
  };

  const updateLabSampleMutation = useMutation({
    mutationKey: ['update-lab-sample', id],
    mutationFn: updateLabSample,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      customer_property_id: yup.number().nullable(),
      lab_sample_type_id: yup
        .number()
        .typeError('Lab Sample type is invalid.')
        .required('Lab Sample type is required.'),
      test_type: yup
        .string()
        .when('lab_sample_type_id', {
          is: () => {
            return Boolean(
              labSampleTypeOptions?.find(
                (item: LabelNumericValue) => item.value === labSampleType?.value
              )?.label === LAB_SAMPLE_TYPE_PASTURE
            );
          },
          then: yup
            .string()
            .typeError('Test type is invalid.')
            .required(
              `Test type is required when sample type is ${
                labSampleTypeOptions?.find(
                  (item: LabelNumericValue) =>
                    item.label === LAB_SAMPLE_TYPE_PASTURE
                )?.label
              }.`
            ),
        })
        .nullable(),
      site_id: yup.number().nullable(),
      collected_datetime: yup
        .string()
        .required('Collected on date is required.'),
      received_datetime: yup
        .mixed()
        .typeError('Received on date is invalid.')
        .required('Received on date is required.')
        .test(
          'not-before-than-collected-datetime',
          'Received date should not be before than collected date.',
          function (value: any) {
            if (value === null) return true;
            const dayDifference = moment(value).diff(
              moment(this.parent.collected_datetime),
              'days'
            );
            return dayDifference >= 0;
          }
        ),
      sample_taken_by: yup
        .number()
        .typeError('Sample taken by is invalid.')
        .required('Sample taken by is required.'),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    reset,
    setValue,
    formState: { errors },
  } = useForm<LabSampleFormValues>({ resolver: schemaResolver });

  useEffect(() => {
    if (sampleData) {
      setLabSampleType({
        value: sampleData?.lab_sample_type?.id,
        label: sampleData?.lab_sample_type?.name,
      });
      setTestType(sampleData?.lab_test_param?.test_type);
      setCustomerPropertyId(sampleData?.customer_property?.id);
      reset({
        sample_id: sampleData.sample_id,
        site_id: sampleData.site?.id,
        lab_sample_type_id: sampleData.lab_sample_type?.id,
        sample_taken_by: sampleData.sample_taken_by?.id,
        sample_kind: sampleData.sample_kind,
        animal_specs: sampleData.animal_specs,
        latitude: sampleData.latitude,
        longitude: sampleData.longitude,
        collected_datetime: new Date(sampleData.collected_datetime),
        received_datetime: new Date(sampleData.received_datetime),
        paddock: sampleData.paddock,
        grass_species: sampleData.grass_species,
        comments: sampleData.comments,
        test_type: sampleData.lab_test_param?.test_type,
        lab_test_param_id: sampleData.lab_test_param?.id,
        customer_property_id: sampleData.customer_property?.id,
      });
    }
  }, [sampleData]);

  const onSubmit = async (formData: any) => {
    setSubmitted(true);
    if (formData.collected_datetime) {
      formData.collected_datetime = moment(formData.collected_datetime).format(
        'YYYY-MM-DD'
      );
    }

    if (formData.received_datetime) {
      formData.received_datetime = moment(formData.received_datetime).format(
        'YYYY-MM-DD'
      );
    }

    if (fileUploaded) {
      formData.file = fileUploaded;
    }

    formData.lab_sample_type_id = labSampleType?.value;

    if (testType) {
      formData.test_type = testType;
    } else {
      delete formData.test_type;
    }

    if (labTestParamId) {
      formData.lab_test_param_id = labTestParamId;
    } else {
      delete formData.lab_test_param_id;
    }

    const submittedTestParameters = formData.default_test_parameters;
    // filter only selected params
    const filterTestParams: any[] = [];
    Object.keys(submittedTestParameters).forEach((key) => {
      if (submittedTestParameters[key] === true) {
        filterTestParams.push(key);
      }

      if (typeof submittedTestParameters[key] === 'object') {
        if (
          Object.values(submittedTestParameters[key]).some(
            (val) => val === true
          )
        ) {
          const subParams = submittedTestParameters[key];
          const subParamsKeyList: string[] = [];
          Object.keys(subParams).forEach((itemKey) => {
            if (subParams[itemKey] === true) {
              subParamsKeyList.push(itemKey);
            }
          });
          filterTestParams.push({ [key]: subParamsKeyList });
        }
      }
    });

    // prepare default params i.e. params without sub params
    const preparedDefaultTestParams: any = [];
    filterTestParams.forEach((paramKey) => {
      if (typeof paramKey === 'string') {
        const paramByKey = getTestParamsByKey({
          paramKey,
          params: testParameters?.params,
        });
        if (paramByKey) {
          preparedDefaultTestParams.push(paramByKey);
        }
      }
      if (typeof paramKey === 'object') {
        const paramByKey = getTestParamsByKey({
          paramKey,
          params: testParameters?.params,
        });
        if (paramByKey) {
          preparedDefaultTestParams.push(paramByKey);
        }
      }
    });

    formData.default_test_parameters = JSON.stringify(
      preparedDefaultTestParams
    );

    updateLabSampleMutation.mutate(formData);
  };

  // update lab test type options on sample type change
  useEffect(() => {
    if (testTypesOptions && testTypesOptions.length > 0) {
      setLabTestTypeOptions(testTypesOptions);
    } else {
      setLabTestTypeOptions([]);
    }
  }, [testTypesOptions]);

  // update test parameters and test param id on test type change and corresponding data received
  useEffect(() => {
    if (testParams && testParams.length === 1) {
      setTestParameters(testParams[0]);
      setLabTestParamId(testParams[0]?.id);
    } else {
      setTestParameters(undefined);
      setLabTestParamId(undefined);
    }
  }, [testParams, testType]);

  const propagateOnLabSampleTypeChange = (selected: any) => {
    setLabSampleType(selected ?? undefined);
    setValue('default_test_parameters', []);
    setTestType(undefined);
  };

  const propagateOnTestTypeChange = (selected: any) => {
    setTestType(selected ? selected.value : undefined);
  };

  const propagateOnCustomerPeropertyChange = (selectedOption: any) => {
    setCustomerPropertyId(selectedOption ? selectedOption.value : undefined);
  };

  // set site options
  useEffect(() => {
    if (sitesDropdown && isSuccessSiteOptions) {
      setSiteOptions(sitesDropdown);
    }
  }, [sitesDropdown, isSuccessSiteOptions]);

  return {
    register,
    control,
    errors,
    reset,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    updateLabSampleMutation,
    submitted,
    setSubmitted,
    navigateToLabSampleList,
    fileUploaded,
    setFileUploaded,
    sampleData,
    isFetchingSampleData,
    isErrorSampleData,
    isFetchingTestParams,
    isErrorTestParams,
    testTypesOptions,
    isFetchingTestTypesOptions,
    isErrorTestTypesOptions,
    testType,
    setTestType,
    labSampleType,
    setLabSampleType,
    testParameters,
    labTestTypeOptions,
    setTestParameters,
    propagateOnLabSampleTypeChange,
    propagateOnTestTypeChange,
    siteOptions,
    isFetchingSiteOptions,
    isErrorSiteOptions,
    propagateOnCustomerPeropertyChange,
    customerPropertyId,
    setValue,
    labSampleTypeOptions,
    isFetchingLabSampleTypeOptions,
    isErrorLabSampleTypeOptions,
    selectedTestParam,
    setSelectedTestParam,
  };
}
