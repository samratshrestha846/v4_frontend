import { useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router-dom';
import udoseSummary from '../../../../../../helpers/api/udose/udoseSummary';
import { shortDateFormat } from '../../../../../../helpers';
import { UdoseDailySummaryRecord } from '../../../../../../types/udose/udoseSummary';

export default function useFetchUdoseDailySummary() {
  const { id } = useParams();

  const [searchParams] = useSearchParams();

  const getUdoseDailySummary = () => {
    return udoseSummary.getUdoseDailySummary(id);
  };

  const { data, isFetching, isError } = useQuery({
    queryKey: ['udose-daily-summary'],
    queryFn: getUdoseDailySummary,
    refetchOnWindowFocus: false,
  });

  const columns = [
    {
      dataField: 'message_date',
      text: 'Date',
      sort: true,
      formatter: (row: UdoseDailySummaryRecord) =>
        shortDateFormat(row.message_date),
    },
    {
      dataField: 'water_flow',
      text: 'Water Flow',
      sort: true,
    },
    {
      dataField: 'nutrient_flow',
      text: 'Actual Nutrient Flow',
      sort: true,
    },
    {
      dataField: 'expected_nutrient_flow',
      text: 'Exp. Nutrient Flow',
      sort: true,
    },
    {
      dataField: 'on_target',
      text: 'On Target (%)',
      sort: true,
    },
    {
      dataField: 'pump_speed',
      text: 'Pump Speed (mls/sec)',
      sort: true,
    },
    {
      dataField: 'dose_count',
      text: 'Dose Count',
      sort: true,
    },
    {
      dataField: 'no_of_livestock',
      text: 'Estm. Livestock Eq.',
      sort: true,
    },
  ];
  return { data, isFetching, isError, searchParams, columns };
}
