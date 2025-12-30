import React from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { Block } from '../../../../../types/horticulture/block';
import useCropsDropdown from '../../../../../hooks/dropdown/useCropsDropdown';
import CustomLoader from '../../../../../components/CustomLoader';
import ErrorMessage from '../../../../../components/ErrorMessage';
import useAssignCropToBlock from './hooks/useAssignCropToBlock';
import AssignCropForm from '../../cropables/forms/AssignCropForm';

type Props = {
  toggleModal: () => void;
  refetchBlocks?: () => void;
  blockDetail?: Block;
};

const AssignCropToBlock: React.FC<Props> = ({
  toggleModal,
  refetchBlocks,
  blockDetail,
}) => {
  const {
    register,
    control,
    errors,
    onSubmit,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
  } = useAssignCropToBlock({
    refetchBlocks,
    toggleModal,
    blockDetail,
  });

  const {
    data: cropsOptions,
    isFetching: isFetchingCropsOptions,
    isError: isErrorCropsOptions,
  } = useCropsDropdown();

  if (isFetchingCropsOptions) {
    return <CustomLoader />;
  }

  if (isErrorCropsOptions) {
    return <ErrorMessage />;
  }

  return (
    <>
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
        </Col>
      </Row>

      <Row>
        <Col>
          <p className="text-sm lh-150">{blockDetail?.name ?? '-'}</p>
        </Col>
      </Row>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <AssignCropForm
          register={register}
          control={control}
          errors={errors}
          cropsOptions={cropsOptions}
        />
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
    </>
  );
};

export default AssignCropToBlock;
