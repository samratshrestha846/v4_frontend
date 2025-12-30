import React from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import useUpdateSubBlock from './hooks/useUpdateSubBlock';
import SubBlockForm from './forms/SubBlockForm';
import { SubBlock } from '../../../../types/horticulture/subBlock';
import useReadSubBlock from './hooks/useReadSubBlock';
import CustomLoader from '../../../../components/CustomLoader';
import ErrorMessage from '../../../../components/ErrorMessage';

type Props = {
  toggleModal: () => void;
  refetchSubBlocks?: () => void;
  subBlockDetail?: SubBlock;
};

const UpdateSubBlock: React.FC<Props> = ({
  toggleModal,
  refetchSubBlocks,
  subBlockDetail,
}) => {
  const { data, isFetching, isError } = useReadSubBlock(subBlockDetail?.id);
  const {
    register,
    control,
    errors,
    onSubmit,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
  } = useUpdateSubBlock({
    refetchSubBlocks,
    toggleModal,
    subBlockDetail: data,
  });

  if (isFetching) {
    return <CustomLoader />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <Row>
      <Col md={12} xs={12}>
        {serverValidationError && (
          <Alert
            variant="danger"
            onClose={() => setServerValidationError(false)}
            dismissible>
            <strong>Validation Failed - </strong> Please fix validation errors
            and try again
          </Alert>
        )}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <SubBlockForm register={register} control={control} errors={errors} />
          <Row xs="auto" className="float-end">
            <Col>
              <div className="button-list">
                <Button
                  variant="outline"
                  className="btn btn-ghost"
                  onClick={toggleModal}>
                  <i className="bx bx-x " /> Cancel
                </Button>

                <Button
                  variant="secondary"
                  type="submit"
                  className="btn btn-secondary"
                  disabled={submitted}>
                  <i className="bx bx-save " /> Save
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default UpdateSubBlock;
