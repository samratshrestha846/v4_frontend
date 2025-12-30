import { useQuery } from '@tanstack/react-query';
import HttpApi from '../Http/http';
import { PERMISSIONS } from '../constants/apiUrls';
import { Permission } from '../role/types/Role';

export default function usePermissions<
  T extends { module: string; permissions: Permission[] }[],
>() {
  const httpApi = new HttpApi();

  const fetchPermissions = async (): Promise<T> => {
    const response = await httpApi.get(PERMISSIONS);

    const permissionsArray: Permission[] = response.data.data;

    const groupedPermissions = permissionsArray.reduce<
      Record<string, Permission[]>
    >((acc, permission) => {
      if (!acc[permission.module_name]) {
        acc[permission.module_name] = [];
      }
      acc[permission.module_name].push(permission);
      return acc;
    }, {});

    return Object.entries(groupedPermissions).map(([module, permissions]) => ({
      module,
      permissions,
    })) as T;
  };

  const { data, isFetching, isError } = useQuery({
    refetchOnWindowFocus: false,
    queryFn: fetchPermissions,
    queryKey: ['permissions'],
  });

  return { data, isFetching, isError };
}
