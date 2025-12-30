import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import device from '../../../../../../helpers/api/device';
import { UNCLEARABLE_ALARM_LIST } from '../../../../../../constants/errorCode';

export default function useClearAlarm() {
  const { siteDetail } = useSelector((state: any) => state.Site);

  const clearAlarmMessages = (fromData: any) => {
    return device.clearAlarmMessages(fromData, siteDetail.id);
  };

  const onSuccess = () => {
    toast.success('Alarm Messages Updated Successfully.');
  };

  const onError = () => {
    toast.error('Oops something went wrong. Please try again later');
  };

  const clearAlarmMessagesMutation = useMutation({
    mutationKey: ['clear-alarm-messages'],
    mutationFn: clearAlarmMessages,
    onSuccess,
    onError,
  });

  const handleClearAlarm = async () => {
    const formData = { key: 'clear_alarm' };
    clearAlarmMessagesMutation.mutate(formData);
  };

  const checkIsAlarmMessageClearable = () => {
    const latestAlarm = siteDetail?.latest_alarm;
    return !UNCLEARABLE_ALARM_LIST.includes(latestAlarm?.error_code);
  };

  return { handleClearAlarm, checkIsAlarmMessageClearable };
}
