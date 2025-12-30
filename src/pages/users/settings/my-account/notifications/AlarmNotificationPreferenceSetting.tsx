import React from 'react';
import { NotificationSetting } from '@uhub/types/user/user';
import { Form } from 'react-bootstrap';
import useNotificationSettings from './hooks/useNotificationSettings';
import AlarmNotificationPreferenceSettingModal from './AlarmNotificationPreferenceSettingModal';

type Props = { notificationSettings: NotificationSetting; via: string };

const AlarmNotificationPreferenceSetting: React.FC<Props> = ({
  notificationSettings,
  via,
}) => {
  const {
    settings,
    showModal,
    handleNotificationPreferenceSettingChange,
    cancelNotificationPreferenceSettingChange,
    onSubmit,
  } = useNotificationSettings({
    userId: Number(notificationSettings?.user_id),
    initialSettings: notificationSettings,
  });

  return (
    <>
      <Form>
        <div className="d-flex align-items-center">
          <Form.Check
            type="checkbox"
            name="via"
            value={via}
            checked={settings.preference.includes(via)}
            onChange={handleNotificationPreferenceSettingChange}
          />
        </div>
      </Form>
      <AlarmNotificationPreferenceSettingModal
        showModal={showModal}
        toggleModal={() => cancelNotificationPreferenceSettingChange(via)}
        handleSave={onSubmit}
        via={via}
        status={settings.preference.includes(via)}
      />
    </>
  );
};

export default AlarmNotificationPreferenceSetting;
