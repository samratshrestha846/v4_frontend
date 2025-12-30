import React from 'react';
import { NotificationSetting } from '@uhub/types/user/user';
import { Form } from 'react-bootstrap';
import useNotificationSettings from './hooks/useNotificationSettings';
import NotificationSettingModal from './AlarmNotificationSettingModal';

type Props = { notificationSettings: NotificationSetting };

const AlarmNotificationSetting: React.FC<Props> = ({
  notificationSettings,
}) => {
  const {
    settings,
    showModal,
    handleNotificationSettingChange,
    cancelNotificationSettingChange,
    onSubmit,
  } = useNotificationSettings({
    userId: Number(notificationSettings?.user_id),
    initialSettings: notificationSettings,
  });

  return (
    <>
      <Form>
        <Form.Check
          type="switch"
          name="switch"
          checked={!!settings.is_turned_on}
          onChange={handleNotificationSettingChange}
        />
      </Form>
      <NotificationSettingModal
        showModal={showModal}
        toggleModal={cancelNotificationSettingChange}
        handleSave={onSubmit}
        status={!!settings.is_turned_on}
      />
    </>
  );
};

export default AlarmNotificationSetting;
