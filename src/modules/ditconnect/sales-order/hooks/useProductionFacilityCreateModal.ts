import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { prepareDynamicUrl } from '@uhub/helpers';
import useDitConnectLocationDropDown from '../../hooks/useDitConnectLocationDropDown';
import HttpApi from '../../Http/http';
import { PRODUCTION_REQUEST } from '../../operations/production-request/constants/constant';
import {
  PRODUCTION_REQUESTS,
  SUPPLEMENT_CHECK_AVAILABILITY,
} from '../constants/constant';
import { CheckAvailabilitySupplement } from '../types/SalesOrder';
import useFetchList from '../../hooks/useFetchList';
import { ProductionRequestListResponse } from '../../operations/production-request/types/productionRequest';

type Props = {
  toggleModal: () => void;
  product: any;
};
const schema = yup.object().shape({
  location_id: yup.string().required('Location is required'),
});
export default function useProductionFacilityCreateModal({
  toggleModal,
  product,
}: Props) {
  const apiCore = new HttpApi();
  const [submitted, setSubmitted] = useState(false);
  const [serverValidationError, setServerValidationError] = useState(false);
  const [addProduction, setAddProduction] = useState(false);
  const [topLocationId, setTopLocationId] = useState<number | null>();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      sales_order_confirmation_id: product.sales_order_confirmation_id,
      location_id: '',
      supplement_id: product.supplement_id,
      qty: product.qty,
    },
  });
  const onSuccess = (): void => {
    toast.success('Production Facility created successfully.');
    toggleModal();
    onClear();
  };

  const onClear = () => {
    setTopLocationId(null);
    setAddProduction(false);
    reset();
  };

  const onError = (error: any) => {
    if (error.response && error.response.status === 417) {
      setServerValidationError(true);
      const errorData = error.response.data.errors;
      Object.keys(errorData).forEach((key) => {
        setError(key as any, {
          type: 'server',
          message: errorData[key][0],
        });
      });
    } else {
      toast.error(error.response.data.status.message);
    }
    setSubmitted(false);
  };
  const createProductionRequest = (formData: any) => {
    return apiCore.create(PRODUCTION_REQUEST, formData);
  };
  const mutation = useMutation({
    mutationKey: ['create-production-request'],
    mutationFn: createProductionRequest,
    onSuccess,
    onError,
  });

  const { locationOptions, isFetchingLocationOptions, isErrorLocationOptions } =
    useDitConnectLocationDropDown();
  const { locationOptions: productionLocations } =
    useDitConnectLocationDropDown({
      is_production_facility: 1,
    });
  const { data: productionRequests, isFetching: productionRequestFetching } =
    useFetchList<ProductionRequestListResponse>(PRODUCTION_REQUESTS, {
      supplement_id: product.supplement_id,
      sales_order_confirmation_id: product.sales_order_confirmation_id,
    });

  const readCheckAvailability = async (): Promise<
    CheckAvailabilitySupplement[]
  > => {
    const response = await apiCore.get(
      prepareDynamicUrl(
        SUPPLEMENT_CHECK_AVAILABILITY,
        product.supplement.group
      ),
      {
        location_id: topLocationId,
      }
    );
    return response.data.data;
  };
  const {
    data: availableSupplements,
    isFetching: isAvailableSupplementFetching,
    isError: isAvailableSupplementError,
  } = useQuery<CheckAvailabilitySupplement[]>({
    queryKey: ['CheckAvailiability', topLocationId],
    queryFn: readCheckAvailability,
    refetchOnWindowFocus: false,
    enabled: !!topLocationId,
  });

  const onSubmit = async (formData: any) => {
    setSubmitted(true);
    setServerValidationError(false);
    mutation.mutate(formData);
  };

  return {
    isLoading: isFetchingLocationOptions || productionRequestFetching,
    isError: isErrorLocationOptions,
    isAvailableSupplementFetching,
    isAvailableSupplementError,
    serverValidationError,
    setServerValidationError,
    submitted,
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    errors,
    locationOptions,
    productionLocations,
    onSubmit,
    availableSupplements,
    addProduction,
    setAddProduction,
    setTopLocationId,
    productionRequests,
    onClear,
  };
}
