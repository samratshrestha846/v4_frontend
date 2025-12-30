import React from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { SUPPLEMENT_LIST } from '../../constants/path';
import PageTitle from '../../components/PageTitle';
import useUpdateSupplement from './hooks/useUpdateSupplement';
import SupplementAddForm from './forms/SupplementAddForm';
import SupplementNutritionAddForm from './forms/SupplementNutritionAddForm';
import CustomLoader from '../../components/CustomLoader';
import ErrorMessage from '../../components/ErrorMessage';

const EditSupplement: React.FC = () => {
  const {
    register,
    errors,
    control,
    handleSubmit,
    onSubmit,
    watch,
    setValue,
    submitted,
    navigateToSupplementList,
    serverValidationError,
    setServerValidationError,
    methaneNonReducingNutrientList,
    isFetchingNonMethaneReducingNutrietList,
    isErrorNonMethaneReducingNutrietList,
    methaneReducingNutrientList,
    isFetchingMethaneReducingNutrietList,
    isErrorMethaneReducingNutrietList,
    supplement,
    isFetchingSupplement,
    isErrorSupplement,
  } = useUpdateSupplement();

  if (
    isFetchingNonMethaneReducingNutrietList ||
    isFetchingMethaneReducingNutrietList ||
    isFetchingSupplement
  ) {
    return <CustomLoader />;
  }

  if (
    isErrorMethaneReducingNutrietList ||
    isErrorNonMethaneReducingNutrietList ||
    isErrorSupplement
  ) {
    return <ErrorMessage />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Supplements', path: SUPPLEMENT_LIST, active: false },
          {
            label: 'Edit Supplement',
            path: '/supplement/edit',
            active: true,
          },
        ]}
        title="Edit Supplement"
      />
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {serverValidationError && (
              <Alert
                variant="danger"
                onClose={() => setServerValidationError(false)}
                dismissible>
                <strong>Validation Failed - </strong> Please fix validation
                errors and try again
              </Alert>
            )}

            {supplement && (
              <SupplementAddForm
                control={control}
                register={register}
                errors={errors}
                supplement={supplement}
                watch={watch}
                setValue={setValue}
              />
            )}
            {methaneNonReducingNutrientList && (
              <SupplementNutritionAddForm
                control={control}
                register={register}
                errors={errors}
                methaneNonReducingNutrientList={
                  methaneNonReducingNutrientList ?? []
                }
                methaneReducingNutrientList={methaneReducingNutrientList ?? []}
              />
            )}
            <div className="float-end button-list mt-3">
              <Button
                className="btn btn-ghost"
                variant="outline"
                onClick={navigateToSupplementList}>
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
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default EditSupplement;
