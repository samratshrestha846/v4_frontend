import { SetStateAction, useState } from 'react';
import { useParams } from 'react-router-dom';
import { APICore } from '../../../../helpers/api/apiCore';
import { useQuery } from '@tanstack/react-query';
import { shortDateFormat } from '../../../../helpers';

const useFetchOptiweighWeightCharts = () => {
  const { id } = useParams();
  const api = new APICore();

  const [dateSet, setDateSet] = useState<Array<any>>([]);
  const [weightSet, setWeightSet] = useState<Array<any>>([]);
  const [animalCount, setAnimalCount] = useState<Array<any>>([]);

  const fetchOptiweighWeightCharts = async () => {
    const response = await api.get(`/kpis/optiweighs/${id}/weight-charts`);
    const date: SetStateAction<any[]> = [];
    const weight: SetStateAction<any[]> = [];
    const animal: SetStateAction<any[]> = [];

    response?.data?.body?.forEach((item: any) => {
      date.push(shortDateFormat(item.date));
      weight.push(item.avg_weight_on_day);
      animal.push(item.animal_count);
    });

    setDateSet(date);
    setWeightSet(weight);
    setAnimalCount(animal);

    return response.data.body;
  };

  const { data, error, isFetching } = useQuery(
    ['optiweighWeightCharts', id],
    fetchOptiweighWeightCharts,
    { refetchOnWindowFocus: false }
  );

  return { data, dateSet, weightSet, animalCount, error, isFetching };
};

export default useFetchOptiweighWeightCharts;
