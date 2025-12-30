import { SetStateAction, useState } from 'react';
import { useParams } from 'react-router-dom';
import { APICore } from '../../../../helpers/api/apiCore';
import { useQuery } from '@tanstack/react-query';

const useFetchOptiweighDistribution = () => {
  const { id } = useParams();
  const api = new APICore();

  const [weightRange, setWeightRange] = useState<Array<any>>([]);
  const [frequency, setFrequency] = useState<Array<any>>([]);

  const fetchOptiweighWeightCharts = async () => {
    const response = await api.get(
      `/kpis/optiweighs/${id}/weight-distributions`
    );
    const weightRange: SetStateAction<any[]> = [];
    const frequency: SetStateAction<any[]> = [];

    response?.data?.body?.forEach((item: any) => {
      weightRange.push(item.weight_range);
      frequency.push(item.frequency);
    });

    setWeightRange(weightRange);
    setFrequency(frequency);

    return response.data.body;
  };

  const { data, error, isFetching } = useQuery(
    ['optiweighWeightDistributions', id],
    fetchOptiweighWeightCharts,
    { refetchOnWindowFocus: false }
  );

  return { data, weightRange, frequency, error, isFetching };
};

export default useFetchOptiweighDistribution;
