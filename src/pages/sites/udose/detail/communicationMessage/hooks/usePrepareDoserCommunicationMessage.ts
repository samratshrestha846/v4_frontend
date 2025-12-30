import { useEffect, useState } from 'react';
import moment from 'moment';
import { DoserCommunicationMessage } from '../../../../../../types/device/device';
import {
  DOSER_STATUS_ALARMED,
  DOSER_STATUS_RUNNING,
  DOSER_STATUS_STOPPED,
  DOSER_STATUS_NOT_COMMUNICATED,
  DOSER_COMMUNICATION_MESSAGES,
  ALARM_SEVERITY_LEVELS,
} from '../../../../../../constants/constants';
import { Site } from '../../../../../../types/site';

type Props = {
  siteDetail: Site;
  isDashboard?: boolean;
};

export default function usePrepareDoserCommunicationMessage({
  siteDetail,
  isDashboard,
}: Props) {
  const [communicationMessage, setCommunicationMessage] =
    useState<DoserCommunicationMessage>({
      variant: '',
      message: '',
      alarmedMessage: '',
    });

  useEffect(() => {
    if (JSON.stringify(siteDetail) !== '{}') {
      setCommunicationMessage(getPreparedMessage());
    }
  }, [siteDetail]);

  const getPreparedMessage = () => {
    if (siteDetail.is_alarmed) {
      return {
        ...DOSER_COMMUNICATION_MESSAGES[DOSER_STATUS_ALARMED],
        alarmedMessage: isDashboard
          ? siteDetail?.latest_udose_record_alarm?.alarm_type?.description ?? ''
          : siteDetail?.alarm_type?.description ?? '',
        alarmSeverity: isDashboard
          ? ALARM_SEVERITY_LEVELS[
              siteDetail?.latest_udose_record_alarm?.alarm_type
                ?.severity_level ?? ''
            ]
          : ALARM_SEVERITY_LEVELS[siteDetail?.alarm_type?.severity_level],
      };
    }

    if (siteDetail.is_running) {
      const isCommunicatedInTwentyFourHours = moment
        .utc(siteDetail.communicated_at)
        .local()
        .isAfter(moment().subtract(24, 'hours'));

      if (isCommunicatedInTwentyFourHours) {
        return DOSER_COMMUNICATION_MESSAGES[DOSER_STATUS_RUNNING];
      }
      return DOSER_COMMUNICATION_MESSAGES[DOSER_STATUS_NOT_COMMUNICATED];
    }

    return DOSER_COMMUNICATION_MESSAGES[DOSER_STATUS_STOPPED];
  };

  return { communicationMessage };
}
