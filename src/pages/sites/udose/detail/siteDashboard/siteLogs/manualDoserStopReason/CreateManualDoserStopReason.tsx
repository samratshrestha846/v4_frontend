import React from 'react';
import useManuallyStartStopDoser from './hooks/useManuallyStartStopDoser';
import ManualDoserStopForm from './forms/ManualDoserStopForm';

type Props = {
  siteId: number;
  toggleModal?: () => void;
  refetch: any;
};

const CreateManualDoserStopReason: React.FC<Props> = ({
  siteId,
  toggleModal,
  refetch,
}) => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    submitted,
    serverValidationError,
    setServerValidationError,
    handleCancel,
  } = useManuallyStartStopDoser(siteId, toggleModal, refetch);

  return (
    <ManualDoserStopForm
      doserStatus={false}
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
  );
};

export default CreateManualDoserStopReason;
