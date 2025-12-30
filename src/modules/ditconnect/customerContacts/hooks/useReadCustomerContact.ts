import { useQuery } from '@tanstack/react-query';
import HttpApi from '../../Http/http';
import { CUSTOMER_CONTACTS } from '../constants/constant';

export default function useReadCustomerContact(id?: string) {
  const apiCore = new HttpApi();

  const readCustomerContact = async () => {
    const response = await apiCore.get(`${CUSTOMER_CONTACTS}/${id}`);
    return response.data.data;
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['site-maintenance', id],
    queryFn: readCustomerContact,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  return {
    data,
    isFetching,
    isFetched,
    isError,
  };
}
