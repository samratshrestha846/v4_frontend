import React from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import useCreateTag from './hooks/useCreateTag';
import TagForm from './forms/TagForm';
import useTagTypesDropdown from '../../hooks/dropdown/useTagTypesDropdown';
import CustomLoader from '../../components/CustomLoader';
import ErrorMessage from '../../components/ErrorMessage';
import BackendValidationMessage from '../../components/BackendValidationMessage';

type Props = {
  toggleModal: () => void;
  refetch: any;
};

const AddTag: React.FC<Props> = ({ toggleModal, refetch }) => {
  const { data: tagTypeOptions, isFetching, isError } = useTagTypesDropdown();

  const {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
  } = useCreateTag({ toggleModal, refetch });

  if (isFetching) return <CustomLoader />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      {serverValidationError && (
        <BackendValidationMessage
          setServerValidationError={setServerValidationError}
        />
      )}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <TagForm
          control={control}
          register={register}
          errors={errors}
          tagTypeOptions={tagTypeOptions ?? []}
        />
        <Row>
          <Col>
            <div className="button-list float-end mt-2">
              <Button
                variant="outline"
                className="btn btn-ghost"
                onClick={toggleModal}>
                <i className="bx bx-x me-1" />
                Cancel
              </Button>
              <Button
                variant="secondary"
                className="btn btn-secondary"
                type="submit"
                disabled={submitted}>
                <i className="bx bx-save me-1" />
                Save
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default AddTag;
