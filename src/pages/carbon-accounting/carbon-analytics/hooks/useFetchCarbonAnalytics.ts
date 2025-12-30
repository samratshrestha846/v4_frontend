import { useQuery } from '@tanstack/react-query';
import carbonCreditAccounting from '../../../../helpers/api/carbonCreditAccounting';

export default function useFetchCarbonEmissionReductions() {
  const fetchCarbonEmissionReductions = () => {
    return carbonCreditAccounting.fetchCarbonEmissionReductions();
  };

  const { data, isFetching, isError } = useQuery({
    queryFn: fetchCarbonEmissionReductions,
    queryKey: ['fetch-carbon-emission-reductions'],
    refetchOnWindowFocus: false,
  });
  return { data, isFetching, isError };
}
