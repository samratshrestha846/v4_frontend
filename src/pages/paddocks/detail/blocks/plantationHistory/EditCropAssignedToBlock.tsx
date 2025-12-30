import React from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import useReadCropable from '../../cropables/hooks/useReadCropable';
import { Cropable } from '../../../../../types/horticulture/cropable';
import useUpdateCropAssignedToBlock from './hooks/useUpdateCropAssignedToBlock';
import CustomLoader from '../../../../../components/CustomLoader';
import ErrorMessage from '../../../../../components/ErrorMessage';
import useCropsDropdown from '../../../../../hooks/dropdown/useCropsDropdown';
import AssignCropEditForm from '../../cropables/forms/AssignCropEditForm';

type Props = {
  toggleModal: () => void;
  refetchBlocks?: () => void;
  cropableDetail?: Cropable;
};

const EditCropAssignedToBlock: React.FC<Props> = ({
  toggleModal,
  refetchBlocks,
  cropableDetail,
}) => {
  const {
    data: cropable,
    isError,
    isFetching,
  } = useReadCropable(cropableDetail?.id);

  const {
    data: cropsOptions,
    isFetching: isFetchingCropsOptions,
    isError: isErrorCropsOptions,
  } = useCropsDropdown();

  const {
    register,
    control,
    errors,
    onSubmit,
    handleSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
  } = useUpdateCropAssignedToBlock({
    refetchBlocks,
    toggleModal,
    cropableDetail: cropable,
  });

  if (isFetching || isFetchingCropsOptions) {
    return <CustomLoader />;
  }

  if (isError || isErrorCropsOptions) {
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
          <AssignCropEditForm
            register={register}
            control={control}
            errors={errors}
            cropsOptions={cropsOptions}
            cropable={cropable}
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
      </Col>
    </Row>
  );
};

export default EditCropAssignedToBlock;
