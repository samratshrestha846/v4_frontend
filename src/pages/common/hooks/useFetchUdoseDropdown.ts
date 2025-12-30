import { useQuery } from '@tanstack/react-query';
import { APICore } from '../../../helpers/api/apiCore';
import { useState } from 'react';
import { SiteDropdownOptions } from '../../../types/common';

const useFetchUdoseDropdown = () => {
  const [udoseDropdowns, setUdoseDropdowns] = useState<
    Array<SiteDropdownOptions>
  >([]);
  const api = new APICore();

  const fetchUdoseSiteDropdown = async () => {
    const response = await api.get('/dropdown/sites');
    setUdoseDropdowns(
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
    ['udose_site_dropdown'],
    fetchUdoseSiteDropdown,
    { refetchOnWindowFocus: false }
  );

  return { data, udoseDropdowns, isFetching, error };
};

export default useFetchUdoseDropdown;
