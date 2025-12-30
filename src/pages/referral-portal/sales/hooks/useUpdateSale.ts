import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

import { SALE_LIST } from '../../../../constants/path';
import sale from '../../../../helpers/api/sale';
import { SaleFormFields } from '../../../../types/sale/saleList';
import useReadSale from './useReadSale';

export default function useUpdateSale() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [serverValidationError, setServerValidationError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    data: saleDetail,
    isFetching: isFetchingSale,
    isError: isErrorSale,
  } = useReadSale(Number(id));

  const updateSale = async (fromData: SaleFormFields) => {
    return sale.updateSale(fromData, Number(id));
  };

  const navigateToSaleList = () => {
    navigate(SALE_LIST);
  };

  const onSuccess = (): void => {
    toast.success('Sale Updated Successfully.');
    navigateToSaleList();
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

  const updateSaleMutation = useMutation({
    mutationKey: ['update-sale', id],
    mutationFn: updateSale,
    onSuccess,
    onError,
  });

  const schemaResolver = yupResolver(
    yup.object().shape({
      customer_id: yup
        .number()
        .typeError('Customer is invalid')
        .required('Customer is required.'),
      product_detail: yup
        .string()
        .typeError('Product detail is invalid')
        .required('Product detail is required.'),
      total_billed_amount: yup
        .number()
        .positive('Bill amount must be a postive number.')
        .typeError('Bill amount is invalid.')
        .required('Bill amount is required.'),
      total_received_amount: yup
        .number()
        .positive('Received amount must be a postive number.')
        .typeError('Received amount is invalid.')
        .required('Received amount is required.')
        .test(
          'not-greater-than-bill-amount',
          'Total received amount should not be greater than total bill amount.',
          // eslint-disable-next-line func-names
          function (value: any) {
            return value <= this.parent.total_billed_amount;
          }
        ),
      purchase_date: yup
        .date()
        .typeError('Purchase date is invalid.')
        .required('Purchase date is required.'),
      bill_cleared_date: yup.mixed().test(
        'not-before-than-purchase-date',
        'Bill cleared date should not be before than purchase date.',
        // eslint-disable-next-line func-names
        function (value: any) {
          if (value === null) return true;
          const dayDifference = moment(value).diff(
            moment(this.parent.purchase_date),
            'days'
          );
          return dayDifference >= 0;
        }
      ),
    })
  );

  const {
    register,
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<SaleFormFields>({ resolver: schemaResolver });

  useEffect(() => {
    if (saleDetail) {
      reset({
        customer_id: saleDetail.customer_id,
        product_detail: saleDetail.product_detail,
        total_billed_amount: saleDetail.total_billed_amount,
        total_received_amount: saleDetail.total_received_amount,
        purchase_date: saleDetail.purchase_date
          ? new Date(saleDetail.purchase_date)
          : saleDetail.purchase_date,
        bill_cleared_date: saleDetail.bill_cleared_date
          ? new Date(saleDetail.bill_cleared_date)
          : saleDetail.bill_cleared_date,
        external_invoice_number: saleDetail.external_invoice_number,
      });
    }
  }, [saleDetail]);

  const onSubmit = async (formData: any) => {
    setSubmitted(true);
    if (formData.purchase_date) {
      formData.purchase_date = moment(formData.purchase_date).format(
        'YYYY-MM-DD'
      );
    }
    if (formData.bill_cleared_date) {
      formData.bill_cleared_date = moment(formData.bill_cleared_date).format(
        'YYYY-MM-DD'
      );
    }
    updateSaleMutation.mutate(formData);
  };

  return {
    register,
    control,
    errors,
    reset,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    updateSaleMutation,
    submitted,
    setSubmitted,
    navigateToSaleList,
    onSubmit,
    saleDetail,
    isFetchingSale,
    isErrorSale,
  };
}
