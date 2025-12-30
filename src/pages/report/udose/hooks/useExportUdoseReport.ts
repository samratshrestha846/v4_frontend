/* eslint-disable consistent-return */
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import useCustomersDropdown from '../../../../hooks/dropdown/useCustomersDropdown';
import usePropertiesDropdown from '../../../../hooks/dropdown/usePropertiesDropdown';
import useUdoseSitesDropdown from '../../../../hooks/dropdown/useUdoseSitesDropdown';
import useSupplementsDropdown from '../../../../hooks/dropdown/useSupplementsDropdown';
import useCreditTypesDropdown from '../../../../hooks/dropdown/useCreditTypesDropdown';
import report from '../../../../helpers/api/report';
import { isEmpty } from '../../../../helpers';
import UdoseReportFilterParams from '../../../../types/report/udoseReport';
import { LabelNumericValueDropdown } from '../../../../types/common';
import { ExportReportFormFields } from '../../../../types/exportReport';

export default function useExportUdoseReport() {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [filters, setFilters] = useState<any>();
  const [propertiesOptions, setPropertiesOptions] = useState<any[]>([]);
  const [sitesOptions, setSitesOptions] = useState<
    LabelNumericValueDropdown[] | undefined
  >([]);

  const [customerId, setCustomerId] = useState<number>();

  const [customerPropertyId, setCustomerPropertyId] = useState<number>();

  const {
    customersDropdown,
    isFetchingCustomersDropdown,
    isErrorCustomersDropdown,
  } = useCustomersDropdown();

  const {
    data: propertiesDropdown,
    isFetching: isFetchingPropertiesDropdown,
    isSuccess: isSuccessPropertiesDropdown,
    isError: isErrorPropertiesDropdown,
  } = usePropertiesDropdown(true, customerId);

  const {
    data: sitesDropdown,
    isFetching: isFetchingSitesDropdown,
    isSuccess: isSuccessSitesDropdown,
    isError: isErrorSitesDropdown,
  } = useUdoseSitesDropdown(customerPropertyId);

  const {
    data: supplementsOptions,
    isFetching: isFetchingSupplementsOptions,
    isError: isErrorSupplementsOptions,
  } = useSupplementsDropdown();

  const {
    data: serviceTypesOptions,
    isFetching: isFetchingServiceTypesOptions,
    isError: isErrorServiceTypesOptions,
  } = useCreditTypesDropdown();

  const generateUdoseReport = () => {
    return report.exportUdoseReport(filters);
  };

  const {
    data: reportData,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['generate-udose-report', isGenerating, filters],
    queryFn: generateUdoseReport,
    refetchOnWindowFocus: false,
    enabled: isGenerating,
  });

  const batchId = reportData?.batch_id;

  const checkUdoseReportProgress = () => {
    return report.checkUdoseReportProgress(batchId);
  };

  const {
    data: dataProgress,
    refetch: refetchProgress,
    isError: isErrorDataProgress,
  } = useQuery({
    queryKey: ['check-udose-report-progress', batchId],
    queryFn: checkUdoseReportProgress,
    refetchOnWindowFocus: false,
    enabled: !!batchId,
  });

  useEffect(() => {
    if (dataProgress && !dataProgress.export_processing && batchId) {
      const intervalId = setInterval(() => {
        refetchProgress();
      }, 3000);
      return () => clearInterval(intervalId);
    }

    if (dataProgress && dataProgress.export_processing) {
      exportReport({
        url: reportData!.file_url,
      });
      setIsGenerating(false);
      toast.success('File Downloaded Successfully');
    }

    if (isError || isErrorDataProgress) {
      setIsGenerating(false);
      toast.error('Oops! something went wrong');
    }
  }, [dataProgress, reportData, batchId]);

  const exportReport = (details: { url: string }) => {
    const a = document.createElement('a');
    a.href = details.url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return null;
  };

  const propagateOnCustomerChange = (selected: any) => {
    setCustomerId(selected ? selected.value : undefined);
  };

  useEffect(() => {
    if (propertiesDropdown && isSuccessPropertiesDropdown) {
      setPropertiesOptions(propertiesDropdown);
    }
  }, [propertiesDropdown, isSuccessPropertiesDropdown]);

  const propagateOnPropertyChange = (selected: any) => {
    setCustomerPropertyId(selected ? selected.value : undefined);
  };

  useEffect(() => {
    if (sitesDropdown && isSuccessSitesDropdown) {
      setSitesOptions(sitesDropdown);
    }
  }, [sitesDropdown, isSuccessSitesDropdown]);

  const onSubmit = async (formData: any) => {
    const filterParams: UdoseReportFilterParams = {};
    if (!isEmpty(formData.site_id) && formData.site_id.length > 0)
      filterParams.site_id = formData.site_id.map(
        (element: any) => element.value
      );

    if (!isEmpty(formData.customer_id))
      filterParams.customer_id = formData.customer_id;

    if (!isEmpty(formData.property_id))
      filterParams.customer_property_id = formData.property_id;

    if (!isEmpty(formData.supplement_id))
      filterParams.supplement_id = formData.supplement_id;

    if (!isEmpty(formData.credit_type))
      filterParams.credit_type = formData.credit_type;

    if (!isEmpty(formData.dosing_mode))
      filterParams.dosing_mode = formData.dosing_mode;

    if (!isEmpty(formData.start_date))
      filterParams.start_date = moment(formData.start_date).format(
        'YYYY-MM-DD'
      );

    if (!isEmpty(formData.end_date))
      filterParams.end_date = moment(formData.end_date).format('YYYY-MM-DD');

    const checkedColumns = Object.entries(formData.columns).filter(
      ([, value]) => value
    );

    if (checkedColumns.length > 0) {
      filterParams.columns = checkedColumns.map(([key]) => key).join(',');
    }
    setFilters(filterParams);
    setIsGenerating(true);
  };

  const schemaResolver = yupResolver(
    yup.object().shape({
      start_date: yup
        .string()
        .typeError('Start Date is required.')
        .required('Start Date is required.'),
      end_date: yup
        .string()
        .typeError('End Date is required.')
        .required('End Date is required.'),
    })
  );

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ExportReportFormFields>({
    defaultValues: {
      end_date: new Date(),
    },
    resolver: schemaResolver,
  });

  const reportColumns = [
    {
      name: 'supplement_name',
      value: 'supplement_name',
      label: 'Supplement Name',
    },
    {
      name: 'customer',
      value: 'customer',
      label: 'Customer',
    },
    {
      name: 'property',
      value: 'property',
      label: 'Property',
    },
    {
      name: 'rainfall',
      value: 'rainfall',
      label: 'Rainfall',
    },
  ];

  return {
    reportData,
    isFetching,
    isGenerating,
    setIsGenerating,
    register,
    control,
    errors,
    handleSubmit,
    reportColumns,
    filters,
    setFilters,
    onSubmit,
    propagateOnCustomerChange,
    propagateOnPropertyChange,
    customersDropdown,
    isFetchingCustomersDropdown,
    sitesOptions,
    isFetchingPropertiesDropdown,
    isFetchingSitesDropdown,
    propertiesOptions,
    serviceTypesOptions,
    isFetchingServiceTypesOptions,
    supplementsOptions,
    isFetchingSupplementsOptions,
    isErrorCustomersDropdown,
    isErrorPropertiesDropdown,
    isErrorServiceTypesOptions,
    isErrorSitesDropdown,
    isErrorSupplementsOptions,
  };
}
