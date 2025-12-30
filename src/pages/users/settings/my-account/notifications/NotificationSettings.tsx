import React, { useMemo } from 'react';
import { Card, Table } from 'react-bootstrap';
import { capitalizeFirstLetter } from '@uhub/helpers';
import { NotificationSetting, User } from '../../../../../types/user/user';
import {
  ALARM_NOTIFICATION_MEDIUM,
  ALARM_NOTIFICATION_MEDIUM_SMS,
  NOTIFICATION_TYPE_ALARM,
} from '../constants/constant';
import AlarmNotificationSetting from './AlarmNotificationSetting';
import AlarmNotificationPreferenceSetting from './AlarmNotificationPreferenceSetting';

type Props = {
  user: User;
};

const NotificationSettings: React.FC<Props> = ({ user }) => {
  const { notification_settings: notificationSettings } = user;
  const defaultAlarmSettings: NotificationSetting = {
    user_id: user.id,
    is_turned_on: 0,
    preference: [],
    type: NOTIFICATION_TYPE_ALARM,
  };

  const alarmNotificationSetting = useMemo(
    () =>
      notificationSettings.find(
        (item) => item.type === NOTIFICATION_TYPE_ALARM
      ) ?? defaultAlarmSettings,
    [notificationSettings]
  );
  return (
    <>
      <h5 className="mt-0 mb-2 text-primary-color">Notification Settings</h5>
      <Card className="tilebox-one">
        <Card.Body className="p-0">
          <div className="table-responsive table-no-min-height">
            <Table size="sm" borderless>
              <thead className="thead-bg-light">
                <tr>
                  <th>Type</th>
                  <th>ON/OFF</th>
                  {ALARM_NOTIFICATION_MEDIUM?.map((item) => (
                    <th key={item}>
                      {item === ALARM_NOTIFICATION_MEDIUM_SMS
                        ? item.toUpperCase()
                        : capitalizeFirstLetter(item)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {capitalizeFirstLetter(alarmNotificationSetting?.type)}
                  </td>
                  <td>
                    <AlarmNotificationSetting
                      notificationSettings={alarmNotificationSetting}
                    />
                  </td>
                  {ALARM_NOTIFICATION_MEDIUM?.map((item) => (
                    <td key={item}>
                      <AlarmNotificationPreferenceSetting
                        key={item}
                        notificationSettings={alarmNotificationSetting}
                        via={item}
                      />
                    </td>
                  ))}
                </tr>
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default NotificationSettings;
