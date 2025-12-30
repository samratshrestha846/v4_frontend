/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import BackendValidationMessage from '../../components/BackendValidationMessage';
import TagForm from './forms/TagForm';
import useTagTypesDropdown from '../../hooks/dropdown/useTagTypesDropdown';
import CustomLoader from '../../components/CustomLoader';
import ErrorMessage from '../../components/ErrorMessage';
import useUpdateTag from './hooks/useUpdateTag';
import useReadTag from './hooks/useReadTag';

type Props = {
  toggleModal: () => void;
  refetch: any;
  id: number;
};

const EditTag: React.FC<Props> = ({ toggleModal, refetch, id }) => {
  const { data: tagTypeOptions, isFetching, isError } = useTagTypesDropdown();

  const {
    data: tagDetail,
    isFetching: isFetchingTag,
    isError: isErrorTag,
  } = useReadTag(id);

  const {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
  } = useUpdateTag({
    toggleModal,
    refetch,
    tagDetail,
  });

  if (isFetching || isFetchingTag) return <CustomLoader />;

  if (isError || isErrorTag) return <ErrorMessage />;

  return (
    <Row>
      <Col>
        {serverValidationError && (
          <BackendValidationMessage
            setServerValidationError={setServerValidationError}
          />
        )}

        <div className="p-1">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <TagForm
              control={control}
              register={register}
              errors={errors}
              tagTypeOptions={tagTypeOptions ?? []}
              tagDetail={tagDetail}
            />

            <div className="float-end button-list mt-2">
              <Button
                variant="outline"
                className="btn btn-ghost"
                onClick={toggleModal}>
                <i className="bx bx-x me-1" /> Cancel
              </Button>
              <Button
                variant="secondary"
                type="submit"
                className="btn btn-secondary "
                disabled={submitted}>
                <i className="bx bx-save me-1" /> Save
              </Button>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default EditTag;
