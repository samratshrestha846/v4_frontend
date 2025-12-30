import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import moment from 'moment';
import { PurchaseRequestFormProps } from '../types/PurchaseRequest';
import {
  PURCHASE_REQUEST_LIST,
  PURCHASE_REQUEST,
  PURCHASE_REQUEST_ALLOWED_FILE_EXTENSIONS,
  PURCHASE_REQUEST_ALLOWED_FILE_SIZE,
  PURCHASE_REQUEST_ALLOWED_FILE_COUNT,
} from '../constants/constant';
import HttpApi from '../../Http/http';

export default function usePurchaseRequestForm(
  defaultValues: PurchaseRequestFormProps
) {
  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const apiCore = new HttpApi();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const schemaResolver = yupResolver(
    yup.object().shape({
      title: yup
        .string()
        .typeError('Title field is required.')
        .required('Title field is required.'),
      requested_to: yup
        .number()
        .typeError('Requested to field is required.')
        .required('Requested to field is required.'),
      required_by_date: yup
        .string()
        .typeError('Required by field is required.')
        .required('Required by field is required.'),
      supplier_id: yup
        .number()
        .typeError('Requested to field is required.')
        .required('Requested to field is required.'),
      priority: yup
        .string()
        .typeError('Priority field is required.')
        .required('Priority field is required.'),
      delivery_location: yup
        .string()
        .typeError('Delivery location field is required.')
        .required('Delivery location field is required.'),
      delivery_method: yup
        .string()
        .typeError('Delivery method field is required.')
        .required('Delivery method field is required.'),
      estimated_payment_date: yup.string().nullable(),
      purchase_request_items: yup
        .array()
        .of(
          yup.object().shape({
            item_name: yup
              .string()
              .required('Name is required.')
              .typeError('Name is required.'),
            unit: yup
              .string()
              .required('Unit is required.')
              .typeError('Unit is required.'),
            qty: yup
              .number()
              .positive('Must be a positive number.')
              .required('Quantity is required.')
              .typeError('Quantity is required.')
              .transform((value, originalValue) =>
                originalValue === '' ? null : value
              ),
            rate: yup
              .number()
              .positive('Must be a positive number.')
              .required('Rate is required.')
              .typeError('Rate is required.'),
            total: yup
              .number()
              .positive('Must be a positive number.')
              .required('Total is required.')
              .typeError('Total is required.'),
          })
        )
        .min(1, 'Atleast one item is required.'),
      quotation: yup
        .mixed()
        .nullable()
        .test(
          'file-format',
          `Files must be of type: ${PURCHASE_REQUEST_ALLOWED_FILE_EXTENSIONS.toString().split(',').join(', ')}`,
          (value) => {
            if (!value) return true;

            return Array.from(value as FileList).every((file) => {
              const fileExtension = file.name.split('.').pop()?.toLowerCase(); // Extract extension
              return PURCHASE_REQUEST_ALLOWED_FILE_EXTENSIONS.includes(
                fileExtension || ''
              );
            });
          }
        )
        .test(
          'file-size',
          `Each attachment size must not exceed ${PURCHASE_REQUEST_ALLOWED_FILE_SIZE}MB.`,
          (value) => {
            if (!value) return true;
            return Array.from(value as FileList).every(
              (file) =>
                file.size <= PURCHASE_REQUEST_ALLOWED_FILE_SIZE * 1024 * 1024
            );
          }
        )
        .test(
          'max-files',
          `You can upload up to ${PURCHASE_REQUEST_ALLOWED_FILE_COUNT} files.`,
          (value) => {
            if (!value) return true;
            return (
              (value as FileList).length <= PURCHASE_REQUEST_ALLOWED_FILE_COUNT
            );
          }
        ),
      invoice: yup
        .mixed()
        .nullable()
        .test(
          'file-format',
          `Files must be of type: ${PURCHASE_REQUEST_ALLOWED_FILE_EXTENSIONS.toString().split(',').join(', ')}`,
          (value) => {
            if (!value) return true;

            return Array.from(value as FileList).every((file) => {
              const fileExtension = file.name.split('.').pop()?.toLowerCase(); // Extract extension
              return PURCHASE_REQUEST_ALLOWED_FILE_EXTENSIONS.includes(
                fileExtension || ''
              );
            });
          }
        )
        .test(
          'file-size',
          `Each attachment size must not exceed ${PURCHASE_REQUEST_ALLOWED_FILE_SIZE}MB.`,
          (value) => {
            if (!value) return true;
            return Array.from(value as FileList).every(
              (file) =>
                file.size <= PURCHASE_REQUEST_ALLOWED_FILE_SIZE * 1024 * 1024
            );
          }
        )
        .test(
          'max-files',
          `You can upload up to ${PURCHASE_REQUEST_ALLOWED_FILE_COUNT} files.`,
          (value) => {
            if (!value) return true;
            return (
              (value as FileList).length <= PURCHASE_REQUEST_ALLOWED_FILE_COUNT
            );
          }
        ),
      contract: yup
        .mixed()
        .nullable()
        .test(
          'file-format',
          `Files must be of type: ${PURCHASE_REQUEST_ALLOWED_FILE_EXTENSIONS.toString().split(',').join(', ')}`,
          (value) => {
            if (!value) return true;

            return Array.from(value as FileList).every((file) => {
              const fileExtension = file.name.split('.').pop()?.toLowerCase(); // Extract extension
              return PURCHASE_REQUEST_ALLOWED_FILE_EXTENSIONS.includes(
                fileExtension || ''
              );
            });
          }
        )
        .test(
          'file-size',
          `Each attachment size must not exceed ${PURCHASE_REQUEST_ALLOWED_FILE_SIZE}MB.`,
          (value) => {
            if (!value) return true;
            return Array.from(value as FileList).every(
              (file) =>
                file.size <= PURCHASE_REQUEST_ALLOWED_FILE_SIZE * 1024 * 1024
            );
          }
        )
        .test(
          'max-files',
          `You can upload up to ${PURCHASE_REQUEST_ALLOWED_FILE_COUNT} files.`,
          (value) => {
            if (!value) return true;
            return (
              (value as FileList).length <= PURCHASE_REQUEST_ALLOWED_FILE_COUNT
            );
          }
        ),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<PurchaseRequestFormProps>({
    resolver: schemaResolver,
    defaultValues,
  });

  const {
    fields: itemFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'purchase_request_items',
  });

  // Total Price Calculation
  // Watching the specific field in the array
  const watchedItem = useWatch({
    control,
    name: 'purchase_request_items',
  });

  useEffect(() => {
    const totalPrice = watchedItem?.reduce(
      (acc, item) => acc + Number(item.total || 0),
      0
    );
    // Set values in form state
    setValue('total_price', Math.round(totalPrice * 10000) / 10000); // round-off to 4 digits
  }, [watchedItem, setValue]);

  const createPurchaseRequest = async (fromData: PurchaseRequestFormProps) => {
    if (id) {
      return apiCore.createWithFile(`${PURCHASE_REQUEST}/${id}`, fromData);
    }
    return apiCore.createWithFile(PURCHASE_REQUEST, fromData);
  };

  const navigateToList = () => {
    navigate(location.state?.from || PURCHASE_REQUEST_LIST);
  };

  const onSuccess = (): void => {
    toast.success(
      !id
        ? 'PurchaseRequest Created Successfully.'
        : 'PurchaseRequest Updated Successfully.'
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
    mutationKey: ['create-PurchaseRequest'],
    mutationFn: createPurchaseRequest,
    onSuccess,
    onError,
  });

  const onSubmit = async (formData: PurchaseRequestFormProps) => {
    setSubmitted(true);

    if (formData.required_by_date) {
      formData.required_by_date = moment(formData.required_by_date).format(
        'YYYY-MM-DD'
      );
    }

    if (formData.estimated_payment_date) {
      formData.estimated_payment_date = moment(
        formData.estimated_payment_date
      ).format('YYYY-MM-DD');
    }

    formData.quotation = Array.from(formData.quotation);
    formData.invoice = Array.from(formData.invoice);
    formData.contract = Array.from(formData.contract);
    formData.total_price = Number(formData.total_price);
    formData.purchase_request_items = Array.from(
      formData.purchase_request_items
    );

    delete formData.invoiceResponse;
    delete formData.quotationResponse;
    delete formData.contractResponse;
    createMutation.mutate(formData);
  };

  const addItem = () => {
    append({
      id: null,
      item_name: null,
      unit: null,
      qty: null,
      rate: null,
      total: null,
    });

    if (itemFields?.length > 1) {
      toast.success('New Row Added Successfully.');
    }
  };

  const removeItem = (index: number) => {
    remove(index);
    toast.success('Row Removed Successfully.');
  };

  useEffect(() => {
    if (defaultValues?.purchase_request_items?.length === 0) {
      addItem();
    }
  }, []);

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
    itemFields,
    addItem,
    removeItem,
    getValues,
  };
}
