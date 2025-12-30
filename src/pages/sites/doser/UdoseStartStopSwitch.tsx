/* eslint-disable react/prop-types */
import React from 'react';
import { Form } from 'react-bootstrap';
import useModalFeature from '../../../hooks/common/useModalFeature';
import SiteStartStopModal from './SiteStartStopModal';
import useStartStopDoser from './hooks/useStartStopDoser';

type Props = {
  siteId: number;
  isDoserRunning: boolean;
};

const UdoseStartStopSwitch: React.FC<Props> = ({ siteId, isDoserRunning }) => {
  const { showModal, toggleModal } = useModalFeature();

  const {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    submitted,
    doserStatus,
    handleChange,
    handleCancel,
    serverValidationError,
    setServerValidationError,
  } = useStartStopDoser(siteId, isDoserRunning, toggleModal);

  return (
    <div className="udose-action-switch float-end">
      <Form.Switch
        id="custom-switch"
        className="custom-switch"
        checked={doserStatus}
        onChange={handleChange}
        label={doserStatus ? 'Stop Udose' : 'Start Udose'}
      />

      <SiteStartStopModal
        showModal={showModal}
        toggleModal={toggleModal}
        doserStatus={doserStatus}
        register={register}
        control={control}
        errors={errors}
        handleCancel={handleCancel}
        submitted={submitted}
        serverValidationError={serverValidationError}
        setServerValidationError={setServerValidationError}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default UdoseStartStopSwitch;
