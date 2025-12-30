import React from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import PageTitle from '../../components/PageTitle';
import useCreateSupplement from './hooks/useCreateSupplement';
import { SUPPLEMENT_ADD, SUPPLEMENT_LIST } from '../../constants/path';
import SupplementAddForm from './forms/SupplementAddForm';
import SupplementNutritionAddForm from './forms/SupplementNutritionAddForm';
import CustomLoader from '../../components/CustomLoader';
import ErrorMessage from '../../components/ErrorMessage';
import BackendValidationMessage from '../../components/BackendValidationMessage';

const AddSupplement: React.FC = () => {
  const {
    register,
    control,
    errors,
    watch,
    setValue,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    submitted,
    navigateToSupplementList,
    methaneNonReducingNutrientList,
    isFetchingNonMethaneReducingNutrietList,
    isErrorNonMethaneReducingNutrietList,
    methaneReducingNutrientList,
    isFetchingMethaneReducingNutrietList,
    isErrorMethaneReducingNutrietList,
  } = useCreateSupplement();

  if (
    isFetchingNonMethaneReducingNutrietList ||
    isFetchingMethaneReducingNutrietList
  ) {
    return <CustomLoader />;
  }

  if (
    isErrorMethaneReducingNutrietList ||
    isErrorNonMethaneReducingNutrietList
  ) {
    return <ErrorMessage />;
  }

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: 'Supplements', path: SUPPLEMENT_LIST, active: false },
          {
            label: 'Add Supplement',
            path: SUPPLEMENT_ADD,
            active: true,
          },
        ]}
        title="Add Supplement "
      />
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {serverValidationError && (
              <BackendValidationMessage
                setServerValidationError={setServerValidationError}
              />
            )}

            <SupplementAddForm
              control={control}
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
            />

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

export default AddSupplement;
