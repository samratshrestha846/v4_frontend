import React from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import BlockForm from './forms/BlockForm';
import { Block } from '../../../../types/horticulture/block';
import useUpdateBlock from './hooks/useUpdateBlock';
import useReadBlock from './hooks/useReadBlock';
import CustomLoader from '../../../../components/CustomLoader';
import ErrorMessage from '../../../../components/ErrorMessage';

type Props = {
  toggleModal: () => void;
  refetchBlocks?: () => void;
  blockDetail?: Block;
};

const UpdateBlock: React.FC<Props> = ({
  toggleModal,
  refetchBlocks,
  blockDetail,
}) => {
  const { data: block, isError, isFetching } = useReadBlock(blockDetail?.id);

  const {
    register,
    control,
    errors,
    onSubmit,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
  } = useUpdateBlock({
    refetchBlocks,
    toggleModal,
    blockDetail: block,
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
          <BlockForm register={register} control={control} errors={errors} />
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

export default UpdateBlock;
