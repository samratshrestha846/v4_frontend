import { useQuery } from '@tanstack/react-query';
import apiDropdown from '../../helpers/api/dropdown';

export default function useProductsDropdown() {
  const fetchProductsDropdown = async () => {
    const { body } = await apiDropdown.fetchProducts();
    return body;
  };

  const {
    data: productsDropdown,
    isFetching: isFetchingProductsDropdown,
    isFetched: isFetchedProductsDropdown,
    isError: isErrorProductsDropdown,
  } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['products-dropdown '],
    queryFn: fetchProductsDropdown,
  });

  return {
    productsDropdown,
    isFetchingProductsDropdown,
    isFetchedProductsDropdown,
    isErrorProductsDropdown,
  };
}
