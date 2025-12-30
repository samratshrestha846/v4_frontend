import React from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { SubBlock } from '../../../../../types/horticulture/subBlock';
import useCropsDropdown from '../../../../../hooks/dropdown/useCropsDropdown';
import CustomLoader from '../../../../../components/CustomLoader';
import ErrorMessage from '../../../../../components/ErrorMessage';
import useAssignCropToSubBlock from './hooks/useAssignCropToSubBlock';
import AssignCropForm from '../../cropables/forms/AssignCropForm';

type Props = {
  toggleModal: () => void;
  refetchSubBlocks?: () => void;
  subBlockDetail?: SubBlock;
};

const AssignCropToSubBlock: React.FC<Props> = ({
  toggleModal,
  refetchSubBlocks,
  subBlockDetail,
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
  } = useAssignCropToSubBlock({
    refetchSubBlocks,
    toggleModal,
    subBlockDetail,
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
          <p className="text-sm lh-150">{subBlockDetail?.name ?? '-'}</p>
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

export default AssignCropToSubBlock;
