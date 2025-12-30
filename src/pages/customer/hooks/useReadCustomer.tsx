import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import customer from '../../../helpers/api/customer';

export default function useReadCustomer() {
  const { id } = useParams();

  const getCustomerById = async () => {
    return customer.getCustomerById(Number(id));
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['read-customer', id],
    queryFn: getCustomerById,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
  };
}
