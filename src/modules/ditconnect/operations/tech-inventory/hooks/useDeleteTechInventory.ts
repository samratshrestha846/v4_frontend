import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useState } from 'react';
import HttpApi from '../../../Http/http';
import {
  TECH_INVENTORY_ITEM_COUNTS,
  TECH_INVENTORY_UI,
} from '../constants/constant';

type Props = {
  id: number;
};

export default function useDeleteTechInventory({ id }: Props) {
  const apiCore = new HttpApi();

  const [showModal, setShowModal] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const remove = async () => {
    return apiCore.delete(`${TECH_INVENTORY_ITEM_COUNTS}/${id}`);
  };

  const removeAll = async () => {
    return apiCore.delete(`${TECH_INVENTORY_ITEM_COUNTS}/${id}/destroy-all`);
  };

  const onSuccess = (): void => {
    toast.success('Tech Inventory Deleted Successfully.');
    queryClient.invalidateQueries({ queryKey: [TECH_INVENTORY_UI] });
  };

  const onError = () => {
    toast.error('Unable to delete the Tech Inventory. Please try again.');
  };

  const deleteMutation = useMutation({
    mutationKey: ['Tech-Inventory-Delete', id],
    mutationFn: remove,
    onSuccess,
    onError,
  });
  const deleteAllMutation = useMutation({
    mutationKey: ['Tech-Inventory-Delete All', id],
    mutationFn: removeAll,
    onSuccess,
    onError,
  });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const removeInventoryItem = () => {
    deleteMutation.mutate();
  };

  const removeAllInventoryItem = () => {
    deleteAllMutation.mutate();
  };

  return {
    showModal,
    toggleModal,
    removeInventoryItem,
    removeAllInventoryItem,
  };
}
