import { useQuery } from '@tanstack/react-query';
import { APICore } from '../../../helpers/api/apiCore';
import { useState } from 'react';
import { PropertyDropdownOption } from '../../../types/common';

const useFetchPropertyDropdown = () => {
  const [propertyDropdowns, setPropertyDropdowns] = useState<
    Array<PropertyDropdownOption>
  >([]);
  const api = new APICore();

  const fetchPropertyDropdown = async () => {
    const response = await api.get('/dropdown/customer-properties');
    setPropertyDropdowns(
      response.data.body.map((item: any) => {
        return {
          name: item?.name,
          id: item?.id,
        };
      })
    );
    return response.data.body;
  };

  const { data, isFetching, error } = useQuery(
    ['property_Dropdown'],
    fetchPropertyDropdown,
    { refetchOnWindowFocus: false }
  );

  return { data, propertyDropdowns, isFetching, error };
};

export default useFetchPropertyDropdown;
