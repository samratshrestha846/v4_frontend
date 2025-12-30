import { ISupplement } from '../operations/production-request/types/productionRequest';
import useDropDown from './useDropDown';
import { GroupedOption } from '../types/ditConnect';
import { DROPDOWN_SUPPLEMENT } from '../constants/apiUrls';

export default function useSuppplementWithGroup() {
  const transform = (supplementOpts: ISupplement[]) => {
    const grouped = supplementOpts.reduce<
      Record<string, { id: number; name: string }[]>
    >(
      (
        acc: { [x: string]: { id: any; name: any }[] },
        supplement: { group: string; id: any; name: any }
      ) => {
        const groupKey = supplement.group || 'Other';
        if (!acc[groupKey]) {
          acc[groupKey] = [];
        }
        acc[groupKey].push({ id: supplement.id, name: supplement.name });
        return acc;
      },
      {}
    );

    return Object.keys(grouped).map((group) => ({
      label: group,
      options: grouped[group],
    }));
  };
  const {
    data: supplementWithGroupOptions,
    isFetching: isSupplementWithGroupFetching,
    isError: isSupplementWithGroupError,
  } = useDropDown<GroupedOption<ISupplement>[]>(DROPDOWN_SUPPLEMENT, transform);

  return {
    supplementWithGroupOptions,
    isSupplementWithGroupFetching,
    isSupplementWithGroupError,
  };
}
