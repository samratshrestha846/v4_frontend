import { useQuery } from '@tanstack/react-query';
import { SALES_ORDER } from '../constants/constant';
import HttpApi from '../../Http/http';

export default function useReadSalesOrder(id?: string) {
  const apiCore = new HttpApi();
  const readSalesOrder = async () => {
    const response = await apiCore.get(`${SALES_ORDER}/${id}`);
    const saleOrder = response.data.data;
    saleOrder.customer = JSON.parse(saleOrder.customer);
    return saleOrder;
  };
  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['SalesOrder', id],
    queryFn: readSalesOrder,
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
