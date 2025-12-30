import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import apiSupplementNutrients from '../../../helpers/api/supplementNutrients';

export default function useDeleteSupplementNutrient({
  nutrientId,
  methaneRefetch,
  nonMethaneRefetch,
}: {
  nutrientId: number;
  methaneRefetch: () => void;
  nonMethaneRefetch: () => void;
}) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const deleteSupplementNutrient = async () => {
    return apiSupplementNutrients.deleteSupplementNutrient(nutrientId);
  };

  const onSuccess = (): void => {
    toast.success('Supplement Nutrient Deleted Successfully.');
    toggleModal();
    methaneRefetch();
    nonMethaneRefetch();
  };

  const onError = () => {
    toast.error("Couldn't delete Supplement Nutrient.");
  };

  const deleteSupplementNutrientMutation = useMutation({
    mutationKey: ['delete-supplement-nutrient', nutrientId],
    mutationFn: deleteSupplementNutrient,
    onSuccess,
    onError,
  });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleDelete = () => {
    deleteSupplementNutrientMutation.mutate();
  };

  return {
    showModal,
    toggleModal,
    deleteSupplementNutrientMutation,
    handleDelete,
  };
}
