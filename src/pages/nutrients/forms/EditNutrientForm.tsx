import React from 'react';
import { Button, Form } from 'react-bootstrap';
import FormInput from '../../../components/FormInput';
import useEditSupplementNutrient from '../hooks/useEditSupplementNutrient';
import CustomLoader from '../../../components/CustomLoader';
import ErrorMessage from '../../../components/ErrorMessage';

type Props = {
  nutrientId: number;
  methaneRefetch: Function;
  nonMethaneRefetch: Function;
  toggleModal?: any;
};

const EditNutrientForm: React.FC<Props> = ({
  nutrientId,
  methaneRefetch,
  nonMethaneRefetch,
  toggleModal,
}) => {
  const {
    register,
    errors,
    handleSubmit,
    onSubmit,
    isFetching,
    isError,
    submitted,
    supplementNutrient,
    isMethaneReducerNutrient,
    handleIsMethaneReducerChange,
  } = useEditSupplementNutrient({
    nutrientId,
    toggleModal,
    methaneRefetch,
    nonMethaneRefetch,
  });

  if (isFetching) {
    return <CustomLoader />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        className="mb-2"
        label="Nutrient Name"
        type="text"
        name="name"
        register={register}
        errors={errors}
      />
      <FormInput
        className="mb-2"
        label="Is Methane Reducer"
        name="is_methane_reducer"
        type="checkbox"
        register={register}
        errors={errors}
        propagateOnChange={handleIsMethaneReducerChange}
        defaultChecked={supplementNutrient?.is_methane_reducer}
      />

      {isMethaneReducerNutrient && (
        <FormInput
          label="Methane Reduction Factor"
          className="mb-2"
          type="number"
          placeholder="Enter reduction factor"
          name="methane_reduction_factor"
          register={register}
          errors={errors}
        />
      )}

      <div className="float-end button-list">
        <Button
          className="btn btn-ghost"
          variant="outline"
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
    </Form>
  );
};

export default EditNutrientForm;
