import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import moment from 'moment';
import { ProductionFormProps } from '../types/Production';
import { PRODUCTION_LIST, PRODUCTION } from '../constants/constant';
import HttpApi from '../../Http/http';
import { DROPDOWN_SUPPLEMENT } from '../../constants/apiUrls';

type PreviousValuesType = {
  supplement_id: number | null;
  qty: number | null;
  date: string | null | Date;
};

export default function useProductionForm(defaultValues: ProductionFormProps) {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [supplementOptions, setSupplementOptions] = useState([]);
  const [isFormReady, setIsFormReady] = useState(false);
  const previousValues = useRef<PreviousValuesType>({
    supplement_id: null,
    qty: null,
    date: null,
  });
  const apiCore = new HttpApi();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const schemaResolver = yupResolver(
    yup.object().shape({
      batch_number: yup
        .string()
        .required('Batch Number is required.')
        .typeError('Batch Number is required.'),
      supplement_id: yup
        .number()
        .required('Supplement is required.')
        .typeError('Supplement is required.'),
      qty: yup
        .number()
        .positive('Capacity must be a positive numeric value.')
        .required('Capacity is required.')
        .typeError('Capacity must be a positive numeric value.'),
      location_id: yup
        .number()
        .required('Location is required.')
        .typeError('Location is required.'),
      date: yup
        .string()
        .required('Date is required.')
        .test(
          'before-or-equal',
          'Date must be before or equal to today.',
          (value) => {
            if (value === null || value === undefined) return true;
            return moment(value).isSameOrBefore(moment(), 'day');
          }
        ),
      production_order_no: yup
        .string()
        .nullable()
        .typeError('Production Order Number must be a string.'),
      is_jug_tested: yup.boolean().typeError('Is jug tested must be boolean'),
      notes: yup.string().nullable().typeError('Notes must be a string.'),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<ProductionFormProps>({
    resolver: schemaResolver,
    defaultValues,
  });

  const watchedSupplementId = useWatch({
    control,
    name: 'supplement_id',
  });

  const watchedQty = useWatch({
    control,
    name: 'qty',
  });

  const watchedDate = useWatch({
    control,
    name: 'date',
  });

  useEffect((): void => {
    if (defaultValues && !isFormReady) {
      previousValues.current = {
        supplement_id: defaultValues.supplement_id || null,
        qty: defaultValues.qty || null,
        date: defaultValues.date || null,
      };
      setIsFormReady(true);
    }
  }, [defaultValues, isFormReady]);

  useEffect(() => {
    const fetchSupplements = async () => {
      try {
        const response = await apiCore.get(DROPDOWN_SUPPLEMENT);
        setSupplementOptions(response?.data?.data || []);
      } catch (error) {
        console.error('Error fetching supplements:', error);
        toast.error('Failed to load supplements.');
      }
    };

    fetchSupplements();
  }, []);

  useEffect(() => {
    if (!isFormReady) return;

    const currentValues = {
      supplement_id: watchedSupplementId,
      qty: watchedQty,
      date: watchedDate,
    };

    if (
      !previousValues.current.supplement_id &&
      !previousValues.current.qty &&
      !previousValues.current.date
    ) {
      previousValues.current = currentValues;
      return;
    }

    const hasRealChange =
      currentValues.supplement_id !== previousValues.current.supplement_id ||
      currentValues.qty !== previousValues.current.qty ||
      currentValues.date !== previousValues.current.date;

    previousValues.current = currentValues;

    if (hasRealChange && watchedQty && watchedDate && watchedSupplementId) {
      const selectedSupplement: any = supplementOptions?.find(
        (option: any) => option.id === watchedSupplementId
      );

      if (selectedSupplement) {
        const supplementSlug = selectedSupplement?.slug;
        const formattedDate = moment(watchedDate).format('DD-MM-YYYY');

        setValue(
          'batch_number',
          `${supplementSlug}(${watchedQty})-${formattedDate}`
        );
      }
    }
  }, [
    watchedQty,
    watchedDate,
    watchedSupplementId,
    supplementOptions,
    setValue,
    isFormReady,
  ]);

  const createProduction = async (fromData: ProductionFormProps) => {
    if (id) {
      return apiCore.update(`${PRODUCTION}/${id}`, fromData);
    }
    return apiCore.create(PRODUCTION, fromData);
  };

  const navigateToList = () => {
    navigate(location.state?.from || PRODUCTION_LIST);
  };

  const onSuccess = (): void => {
    toast.success(
      !id
        ? 'Production Created Successfully.'
        : 'Production Updated Successfully.'
    );
    navigateToList();
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
    setSubmitted(false);
  };

  const createMutation = useMutation({
    mutationKey: ['create-Production'],
    mutationFn: createProduction,
    onSuccess,
    onError,
  });

  const onSubmit = async (formData: ProductionFormProps) => {
    setSubmitted(true);

    if (formData.date) {
      formData.date = moment(formData.date).format('YYYY-MM-DD');
    }

    createMutation.mutate(formData);
  };

  return {
    register,
    control,
    errors,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    createMutation,
    submitted,
    setSubmitted,
    navigateToList,
    onSubmit,
    setValue,
  };
}
