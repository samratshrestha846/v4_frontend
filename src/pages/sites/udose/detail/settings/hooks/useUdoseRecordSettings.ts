import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { UPDATE_UDOSE_SETTING } from '../../../../../../constants/permissions';
import { can } from '../../../../../../helpers/checkPermission';
import udoseSettings from '../../../../../../helpers/api/udose/udoseSettings';

export default function useUdoseRecordSettings() {
  const { id } = useParams();

  const hasEditPermission = can(UPDATE_UDOSE_SETTING);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [editModalChildren, setEditModalChildren] = useState<any>(null);

  const toggleEdit = useCallback(() => {
    setEditModal(!editModal);
  }, [editModal]);

  const refreshUdoseRecordSettings = () => {
    return udoseSettings.getUdoseRecordSettings(id);
  };

  const {
    data: settings,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['udose-redcord-settings', id],
    queryFn: refreshUdoseRecordSettings,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  return {
    refetch,
    toggleEdit,
    hasEditPermission,
    settings,
    editModal,
    setEditModal,
    editModalChildren,
    setEditModalChildren,
    isFetching,
  };
}
