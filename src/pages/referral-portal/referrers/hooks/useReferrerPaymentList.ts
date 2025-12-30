import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import payment from '../../../../helpers/api/payment';
import { PaymentQuery } from '../../../../types/payment/paymentList';

export default function useReferrerPaymentList() {
  const [pageNumber, setPageNumber] = useState(0);

  const { id } = useParams();

  const getPaymentsByReferrerId = () => {
    const params: PaymentQuery = { page: pageNumber + 1 };
    return payment.getPaymentsByReferrerId(params, Number(id));
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['get-payments-by-referrer', pageNumber],
    queryFn: getPaymentsByReferrerId,
    refetchOnWindowFocus: false,
  });

  const handlePageChange = (e: any): void => {
    setPageNumber(e.selected);
  };

  return {
    data,
    isFetching,
    isError,
    isFetched,
    pageNumber,
    handlePageChange,
  };
}
