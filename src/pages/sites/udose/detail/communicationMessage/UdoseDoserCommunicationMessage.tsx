import React from 'react';
import { Alert, OverlayTrigger, Tooltip } from 'react-bootstrap';
import classNames from 'classnames';

import useAuth from '../../../../../hooks/useAuth';
import useClearAlarm from './hooks/useClearAlarm';
import useManageDosercommunicationMessage from './hooks/usePrepareDoserCommunicationMessage';

import { formattedDatetime } from '../../../../../helpers';
import TruncateTextWithOverlayTooltip from '../../../../../components/TruncateTextWithOverlayTooltip';
import { Site } from '../../../../../types/site';
import useModalFeature from '../../../../../hooks/common/useModalFeature';
import PotentialActionModal from './PotentialActionModal';
import {
  ALARM_SEVERITY_LEVEL_ALARM,
  DOSER_COMMUNICATION_MESSAGE_DISPLAY_LENGTH,
} from '../../../../../constants/constants';

type Props = {
  siteDetail: Site;
  isDashboard?: boolean;
};

const UdoseDoserCommunicationMessage: React.FC<Props> = ({
  siteDetail,
  isDashboard,
}) => {
  const { isAdmin, isSuperAdmin } = useAuth();
  const { showModal, toggleModal } = useModalFeature();
  const { checkIsAlarmMessageClearable, handleClearAlarm } = useClearAlarm();
  const { communicationMessage } = useManageDosercommunicationMessage({
    siteDetail,
    isDashboard,
  });

  let doserStatusMessage = '';
  if (siteDetail?.is_alarmed) {
    // Initial message (Doser is alarmed.) is displayed only for severity level - alarm.
    doserStatusMessage =
      communicationMessage?.alarmSeverity?.level === ALARM_SEVERITY_LEVEL_ALARM
        ? `${communicationMessage.message} ${communicationMessage.alarmedMessage}`
        : communicationMessage.alarmedMessage;
  } else {
    doserStatusMessage = communicationMessage.message;
  }

  return (
    <>
      <Alert
        className={classNames(
          'm-0 custom-alert',
          siteDetail?.is_alarmed
            ? communicationMessage.alarmSeverity?.bgColor
            : communicationMessage.variant
        )}>
        <div className="d-flex justify-content-start gap-1 communication-message-alert-wrapper">
          {communicationMessage?.icon ? (
            <i
              className={classNames(
                'font-18',
                communicationMessage.icon,
                siteDetail?.is_alarmed
                  ? communicationMessage.alarmSeverity?.iconColor
                  : communicationMessage.iconColorClass
              )}
            />
          ) : null}

          <div className="d-flex flex-column justify-content-start flex-grow-1">
            <p className="mb-0 font-10 text-secondary-color communication-message-alert pe-3">
              {siteDetail?.is_alarmed ? (
                <span className="text-black fw-bold font-10 me-half">
                  {`${communicationMessage.alarmSeverity?.level} :`}
                </span>
              ) : null}

              {doserStatusMessage?.length >
              DOSER_COMMUNICATION_MESSAGE_DISPLAY_LENGTH ? (
                <TruncateTextWithOverlayTooltip
                  text={doserStatusMessage}
                  endIndex={70}
                />
              ) : (
                doserStatusMessage
              )}
            </p>
            <div className="d-flex justify-content-between align-items-center gap-1 flex-wrap">
              <p className="mb-0 font-8 text-muted">
                {`Last Update - `}
                <span className="text-black">
                  {siteDetail?.communicated_at
                    ? formattedDatetime(siteDetail.communicated_at)
                    : ''}
                </span>
              </p>

              {(isAdmin || isSuperAdmin) && siteDetail?.is_alarmed ? (
                <div className="d-flex flex-column justify-content-start flex-grow-1">
                  <button
                    type="button"
                    className={classNames(
                      'p-0 m-0',
                      'font-8',
                      'btn btn-sm btn-link',
                      'underline-text',
                      'alert-aditional-info-btn'
                    )}
                    onClick={toggleModal}>
                    Additional Info
                  </button>
                  {!isDashboard && (
                    <div className="d-flex align-items-center">
                      <button
                        type="button"
                        className={classNames(
                          'p-0 m-0',
                          'font-8',
                          'btn btn-sm btn-link',
                          'underline-text',
                          'alert-clear-alarm-btn',
                          checkIsAlarmMessageClearable() ? '' : 'disabled'
                        )}
                        onClick={handleClearAlarm}>
                        Clear Alarm
                      </button>
                      <sup>
                        <span>
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="info">
                                The Battery Low and Conductivity Alarms messages
                                cannot be cleared.
                              </Tooltip>
                            }>
                            <i className="bx bx-info-circle text-info font-12" />
                          </OverlayTrigger>
                        </span>
                      </sup>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Alert>
      <PotentialActionModal
        showModal={showModal}
        toggleModal={toggleModal}
        potentialAction={
          isDashboard
            ? siteDetail?.latest_udose_record_alarm?.alarm_type
                ?.potential_actions
            : siteDetail?.alarm_type?.potential_actions
        }
      />
    </>
  );
};

export default UdoseDoserCommunicationMessage;
