import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { DoserUsages } from '../../../types/device/device';
import device from '../../../helpers/api/device';

type DoserUsagesData = {
  id: number;
  name: string;
  value: number | string;
  type: string;
};

export default function useUpdateDoserUsages(
  doserUsage: DoserUsages,
  refetch: any
) {
  const { id } = useParams();
  const [doserUsages, setDoserUsages] = useState<DoserUsagesData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentDoserUsageData, setCurrentDoserUsageData] =
    useState<DoserUsagesData>();

  useEffect(() => {
    setDoserUsages([
      {
        id: 1,
        name: 'Dose Count',
        value: doserUsage?.dose_count,
        type: 'dose_count',
      },
      {
        id: 2,
        name: 'Pump Second',
        value: doserUsage?.pump_second,
        type: 'pump_second',
      },
      {
        id: 3,
        name: 'Water Flow (L)',
        value: doserUsage?.water_in_litre,
        type: 'water_in_litre',
      },
      {
        id: 4,
        name: 'Nutrient Flow (L)',
        value: doserUsage?.nutrient_in_litre,
        type: 'nutrient_in_litre',
      },
    ]);
  }, [doserUsage]);

  const updateDoserUsages = (fromData: any) => {
    return device.updateDoserUsages(fromData, id);
  };

  const onSuccess = (): void => {
    toast.success('Device data successfully reset to zero.');
    setShowModal(false);
    refetch();
  };

  const onError = (): void => {
    toast.error('Oops! Something went wrong. Please try again later.');
  };

  const updateDoserUsagesMutation = useMutation({
    mutationKey: ['update-doser-usages', id],
    mutationFn: updateDoserUsages,
    onSuccess,
    onError,
  });

  const handleClick = (value: number, type: string) => {
    if (value <= 0 || value == null) {
      toast.error('Device already have value zero. ');
    } else {
      const params = { [type]: 0 };
      onSubmit(params);
    }
  };

  const onSubmit = async (formData: any) => {
    await updateDoserUsagesMutation.mutate(formData);
  };

  return {
    handleClick,
    doserUsages,
    showModal,
    setShowModal,
    currentDoserUsageData,
    setCurrentDoserUsageData,
  };
}
