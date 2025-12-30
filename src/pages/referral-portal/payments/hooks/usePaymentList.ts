import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import payment from '../../../../helpers/api/payment';
import { PaymentQuery } from '../../../../types/payment/paymentList';
import { PAYMENT_ADD } from '../../../../constants/path';

export default function usePaymentList() {
  const [pageNumber, setPageNumber] = useState(0);

  const navigate = useNavigate();

  const fetchPayments = () => {
    const params: PaymentQuery = { page: pageNumber + 1 };
    return payment.fetchPayments(params);
  };

  const { data, isFetching, isFetched, isError, refetch } = useQuery({
    queryKey: ['payments', pageNumber],
    queryFn: fetchPayments,
    refetchOnWindowFocus: false,
  });

  const handlePageChange = (e: any): void => {
    setPageNumber(e.selected);
  };

  const navigateToAddPayment = () => {
    navigate(PAYMENT_ADD);
  };

  return {
    data,
    isFetching,
    isError,
    isFetched,
    pageNumber,
    refetch,
    handlePageChange,
    navigateToAddPayment,
  };
}
