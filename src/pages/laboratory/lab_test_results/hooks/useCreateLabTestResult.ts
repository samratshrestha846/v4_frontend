import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { LAB_SAMPLE_LIST, LAB_SAMPLE_VIEW } from '../../../../constants/path';
import useUsersDropdownByRole from '../../../../hooks/dropdown/useUserDropdownByRole';
import useReadLabSample from '../../lab_samples/hooks/useReadLabSample';
import { prepareDynamicUrl } from '../../../../helpers';
import labSampleTestResult from '../../../../helpers/api/labTestResult';

export default function useCreateLabTestResult() {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const {
    data: labSample,
    isFetching: isFetchingLabSample,
    isError: isErrorLabSample,
  } = useReadLabSample();

  const {
    data: userOptions,
    isFetching: isFetchingUserOptions,
    isError: isErrorUserOptions,
  } = useUsersDropdownByRole({
    type: 'dropdown',
    roles: 'Admin,Manager',
  });

  const createLabTestResult = (fromData: FormData) => {
    return labSampleTestResult.createLabTestResult(fromData);
  };

  const navigateToLabSamplesList = () => {
    return navigate(LAB_SAMPLE_LIST);
  };

  const navigateToLabSamplesView = () => {
    return navigate(prepareDynamicUrl(LAB_SAMPLE_VIEW, labSample?.id));
  };

  const onSuccess = (): void => {
    toast.success('Lab Sample Test Result Created Successfully.');
    setSubmitted(false);
    navigateToLabSamplesView();
  };

  const onError = (error: any) => {
    if (error.response && error.response.status === 417) {
      setServerValidationError(true);
      const errorData = error.response.data.errors;
      Object.keys(errorData).forEach((key) => {
        setError(key, {
          type: 'server',
          message: errorData[key][0],
        });
      });
    } else {
      toast.error(error.response.data.status.message);
    }
    setSubmitted(false);
  };

  const createLabTestResultMutation = useMutation({
    mutationKey: ['create-lab-test-result'],
    mutationFn: createLabTestResult,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      analysed_by: yup
        .number()
        .typeError('Analysed By is invalid.')
        .required('Analysed By is required.'),
      analysed_date_time: yup.string().required('Analysed date is required.'),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: schemaResolver });

  const onSubmit = async (formData: any) => {
    setSubmitted(true);
    formData.lab_sample_id = labSample?.id;
    formData.lab_test_param_id = labSample?.lab_test_param_id;
    if (formData.analysed_date_time) {
      formData.analysed_date_time = moment(formData.analysed_date_time).format(
        'YYYY-MM-DD HH:mm:ss'
      );
    }
    const resultsArray: any = [];
    const resultData = formData.results;
    labSample?.default_test_parameters?.forEach((param: any) => {
      Object.keys(resultData).forEach((key) => {
        if (key === param.key) {
          if (param?.sub_params) {
            const subParamValue: any[] = [];
            param?.sub_params?.forEach((subParam: any) => {
              subParamValue.push({
                ...subParam,
                result: resultData[key][subParam.key],
              });
            });
            resultsArray.push({ ...param, sub_params: subParamValue });
          } else {
            resultsArray.push({ ...param, result: resultData[key] });
          }
        }
      });
    });
    formData.results = resultsArray;
    createLabTestResultMutation.mutate(formData);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    createLabTestResultMutation,
    submitted,
    navigateToLabSamplesList,
    navigateToLabSamplesView,
    labSample,
    isFetchingLabSample,
    isErrorLabSample,
    userOptions,
    isFetchingUserOptions,
    isErrorUserOptions,
  };
}
