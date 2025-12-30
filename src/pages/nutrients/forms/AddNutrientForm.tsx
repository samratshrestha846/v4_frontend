import React, { ChangeEvent } from 'react';
import { Button, Form } from 'react-bootstrap';
import useCreateSupplementNutrient from '../hooks/useCreateSupplementNutrient';
import { FormInput } from '../../../components';

const AddNutrientForm = ({
  toggleModal,
  methaneRefetch,
  nonMethaneRefetch,
}: {
  toggleModal: () => void;
  methaneRefetch: Function;
  nonMethaneRefetch: Function;
}) => {
  const {
    register,
    handleSubmit,
    errors,
    submitted,
    onSubmit,
    isMethaneReducerNutrient,
    setIsMethaneReducerNutrient,
  } = useCreateSupplementNutrient({
    toggleModal,
    methaneRefetch,
    nonMethaneRefetch,
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        containerClass="mb-2"
        label="Nutrient Name"
        type="text"
        name="name"
        register={register}
        errors={errors}
      />

      <FormInput
        containerClass="mb-2"
        label="Is Methane Reducer"
        name="is_methane_reducer"
        type="checkbox"
        register={register}
        errors={errors}
        propagateOnChange={(e: ChangeEvent<HTMLInputElement>) =>
          setIsMethaneReducerNutrient(e.target.checked)
        }
      />

      {isMethaneReducerNutrient && (
        <FormInput
          label="Methane Reduction Factor"
          containerClass="mb-2"
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

export default AddNutrientForm;
