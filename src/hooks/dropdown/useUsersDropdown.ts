import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import apiDropdown from '../../helpers/api/dropdown';
import { hasRoles } from '../../helpers';

export default function useUsersDropdown({
  filterParam,
  isBlankInitially,
}: {
  filterParam?: {
    role?: string;
    customerId?: number;
  };
  isBlankInitially?: boolean;
}) {
  const [stationManagerOptions, setStationManagerOptions] = useState<any>([]);

  const fetchUsersDropdown = async (params: any) => {
    return apiDropdown.fetchUsers(params);
  };

  const {
    data: usersData,
    isFetching: isFetchingUsersDropdown,
    isFetched: isFetchedUsersDropdown,
  } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['users-dropdown '],
    queryFn: () => fetchUsersDropdown({ type: 'dropdown' }),
  });

  useEffect(() => {
    let filteredList = usersData?.body;

    if (filterParam && filterParam?.role) {
      filteredList = filteredList?.filter((item: any) => {
        return hasRoles(item) && item.roles[0]?.name === filterParam?.role;
      });
    }

    if (filterParam && filterParam?.customerId) {
      filteredList = filteredList?.filter((item: any) => {
        return item?.customer_id === filterParam?.customerId;
      });
    }

    setStationManagerOptions(
      isBlankInitially
        ? []
        : filteredList?.map((item: any) => {
            return {
              value: item.id,
              label: `${item?.first_name} ${item?.last_name}`,
            };
          })
    );
  }, [usersData, filterParam?.customerId]);

  const propagateOnCustomerChange = (selected: any) => {
    if (selected) {
      const userListFiltered = usersData?.body?.filter((item: any) => {
        return (
          hasRoles(item) &&
          item.roles[0]?.name === filterParam?.role &&
          item?.customer_id === selected.value
        );
      });

      setStationManagerOptions(
        userListFiltered?.map((item: any) => {
          return {
            value: item.id,
            label: `${item?.first_name} ${item?.last_name}`,
          };
        })
      );
    } else {
      setStationManagerOptions([]);
    }
  };

  return {
    stationManagerOptions,
    setStationManagerOptions,
    propagateOnCustomerChange,
    isFetchingUsersDropdown,
    isFetchedUsersDropdown,
  };
}
