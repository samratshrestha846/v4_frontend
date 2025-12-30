import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-toastify';
import labTestResult from '../../../../helpers/api/labTestResult';

export default function useUpdatePatchLabTestResult(
  labResultId: number | string,
  refetch: () => void
) {
  const [showModal, setShowModal] = React.useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const updatePatchLabResult = (fromData: any) => {
    return labTestResult.updatePatchLabResult(fromData, labResultId);
  };

  const onSuccess = (): void => {
    toast.success('Lab Result Updated Successfully.');
    refetch();
    toggleModal();
  };

  const onError = () => {
    toast.error('Failed to Publish Lab Result.');
  };

  const updatePatchLabTestResult = useMutation({
    mutationKey: ['update-patch-lab-result', labResultId],
    mutationFn: updatePatchLabResult,
    onSuccess,
    onError,
  });

  return {
    showModal,
    toggleModal,
    setShowModal,
    updatePatchLabTestResult,
  };
}
