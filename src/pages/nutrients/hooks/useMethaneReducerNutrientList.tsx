import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import apiSupplementNutrients from '../../../helpers/api/supplementNutrients';

export default function useMethaneReducerNutrientList() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const fetchMethaneReducerNutrients = async () => {
    return apiSupplementNutrients.getMethaneReducerNutrients();
  };

  const { data, isFetching, refetch, isError } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: fetchMethaneReducerNutrients,
    queryKey: ['methane-reducers'],
  });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return { showModal, isFetching, isError, data, refetch, toggleModal };
}
