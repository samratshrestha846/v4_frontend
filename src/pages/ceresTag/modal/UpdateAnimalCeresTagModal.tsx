import React from 'react';
import { Button, Form } from 'react-bootstrap';
import CeresTagUpdateOnAnimalForm from '../forms/CeresTagUpdateOnAnimalForm';
import useUpdateAnimalCeresTag from '../hooks/useUpdateAnimalCeresTag';
import BackendValidationMessage from '../../../components/BackendValidationMessage';

type Props = {
  id: string;
  refetch: any;
  toggleModal?: any;
};

const UpdateAnimalCeresTagModal: React.FC<Props> = ({
  id,
  refetch,
  toggleModal,
}) => {
  const {
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
  } = useUpdateAnimalCeresTag(String(id), refetch);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {serverValidationError && (
        <BackendValidationMessage
          setServerValidationError={setServerValidationError}
        />
      )}
      <CeresTagUpdateOnAnimalForm control={control} errors={errors} />

      <div className="button-list float-end">
        <Button
          variant="outline"
          className="btn btn-ghost"
          onClick={toggleModal}>
          <i className="bx bx-x me-1 font-18" />
          Cancel
        </Button>
        <Button className="btn btn-save" type="submit" disabled={submitted}>
          <i className="bx bx-save me-1 font-18" />
          Save
        </Button>
      </div>
    </Form>
  );
};

export default UpdateAnimalCeresTagModal;
