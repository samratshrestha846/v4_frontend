import { useQuery } from '@tanstack/react-query';
import maintenanceNotes from '../../../../helpers/api/notes/maintenanceNotes';

export default function useReadMaintenanceNote(id: number) {
  const getMaintenanceNoteById = () => {
    return maintenanceNotes.getMaintenanceNoteById(id);
  };

  const { data, isFetching, isFetched, isError } = useQuery({
    queryKey: ['read-maintenance-note', id],
    queryFn: getMaintenanceNoteById,
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
