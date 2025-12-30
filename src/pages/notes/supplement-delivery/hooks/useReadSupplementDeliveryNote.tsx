import { useQuery } from '@tanstack/react-query';
import supplementDeliveryNotes from '../../../../helpers/api/supplementDeliveryNotes';

export default function useReadSupplementDeliveryNote(id: number) {
  const getSupplementDeliveryNoteById = () => {
    return supplementDeliveryNotes.getSupplementDeliverNoteById(id);
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['read-suppliment-delivery-note', id],
    queryFn: getSupplementDeliveryNoteById,
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
