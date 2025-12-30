import { LabelValue } from '@uhub/types/common';
import { RND_ACTIVITIES } from '../../daily-diary/work-diary/constants/constant';
import useDropDown from '../../hooks/useDropDown';

export default function useDropdownRndActivity() {
  const transform = (data: any[]) => {
    return data?.map((item) => ({
      value: item?.id,
      label: `${item?.name}`,
      group: item?.group,
    }));
  };

  const {
    data: activityOptions,
    isFetching: isFetchingActivityOptions,
    isError: isErrorActivityOptions,
  } = useDropDown<LabelValue[]>(RND_ACTIVITIES, transform);
  return {
    activityOptions,
    isFetchingActivityOptions,
    isErrorActivityOptions,
  };
}
