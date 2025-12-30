import { LabelNumericValue } from '@uhub/types/common';
import { useEffect, useState } from 'react';
import useDropDown from '../../../hooks/useDropDown';
import { RND_ACTIVITIES } from '../constants/constant';

export default function useFilterActivitiesByGroup() {
  const [activities, setActivities] = useState<LabelNumericValue[]>([]);

  const transform = (data: any[]) => {
    return data?.map((item) => ({
      value: item?.id,
      label: `${item?.name}`,
      group: item?.group,
    }));
  };

  const { data, isFetching, isError } = useDropDown(RND_ACTIVITIES, transform);

  const propagateOnGroupChange = (selected: any) => {
    if (selected) {
      const filteredActivities = (data as LabelNumericValue[])?.filter(
        (activity: any) => activity.group === selected.value
      );
      setActivities(filteredActivities);
    } else {
      setActivities(data as LabelNumericValue[]);
    }
  };

  useEffect(() => {
    if (data) {
      setActivities(data as LabelNumericValue[]);
    }
  }, [data]);

  return {
    activities,
    setActivities,
    isFetching,
    isError,
    propagateOnGroupChange,
  };
}
