import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import labTestResultApi from '../../../../helpers/api/labTestResult';
import { LAB_SAMPLE_VIEW } from '../../../../constants/path';
import { prepareDynamicUrl } from '../../../../helpers';
import useReadLabTestResult from './useReadLabTestResult';

export default function useUpdateLabTestResult() {
  const { id } = useParams();
  const [serverValidationError, setServerValidationError] = useState(false);
  const [labSampleId, setLabSampleId] = useState<number>();

  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const {
    data: labTestResult,
    isFetching: isFetchingLabTestResult,
    isError: isErrorLabTestResult,
  } = useReadLabTestResult();

  const updateLabTestResult = (fromData: any) => {
    return labTestResultApi.updateLabTestResult(fromData, id);
  };

  const navigateToLabSampleView = () => {
    navigate(prepareDynamicUrl(LAB_SAMPLE_VIEW, labSampleId));
  };

  const onSuccess = (): void => {
    toast.success('Lab Test Result Updated Successfully.');
    navigateToLabSampleView();
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
  };

  const updateLabTestResultMutation = useMutation({
    mutationKey: ['update-lab-test-result', id],
    mutationFn: updateLabTestResult,
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
    reset,
    formState: { errors },
  } = useForm({ resolver: schemaResolver });

  useEffect(() => {
    setLabSampleId(labTestResult?.lab_sample?.id);
    reset({
      analysed_by: labTestResult?.analysed_by?.id,
      lab_sample_id: labTestResult?.lab_sample?.id,
      lab_test_param_id: labTestResult?.lab_test_param?.id,
      analysed_date_time: labTestResult?.analysed_date_time
        ? new Date(labTestResult?.analysed_date_time)
        : labTestResult?.analysed_date_time,
      comments: labTestResult?.comments,
    });
  }, [labTestResult]);

  const onSubmit = async (formData: any) => {
    setSubmitted(true);
    formData.lab_sample_id = labTestResult?.lab_sample?.id;
    formData.lab_test_param_id = labTestResult?.lab_test_param?.id;
    if (formData.analysed_date_time) {
      formData.analysed_date_time = moment(formData.analysed_date_time).format(
        'YYYY-MM-DD HH:mm:ss'
      );
    }
    const resultsArray: any = [];
    const resultData = formData.results;
    if (labTestResult) {
      labTestResult?.results?.forEach((param: any) => {
        Object.keys(resultData).forEach((key: any) => {
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
    }
    formData.results = resultsArray;
    updateLabTestResultMutation.mutate(formData);
    setSubmitted(false);
  };

  return {
    register,
    control,
    errors,
    reset,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    updateLabTestResultMutation,
    submitted,
    setSubmitted,
    navigateToLabSampleView,
    setLabSampleId,
    labTestResult,
    isFetchingLabTestResult,
    isErrorLabTestResult,
  };
}
