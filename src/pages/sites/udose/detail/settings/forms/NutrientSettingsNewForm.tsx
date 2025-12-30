import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import useUpdateUdoseNutrientSettings from '../hooks/useUpdateUdoseSiteSupplement';
import ReactSelect from '../../../../../../components/ReactSelect';
import { FormInput } from '../../../../../../components';
import { SUPPLEMENT_DRY_QUANTITY_OPTIONS } from '../../../../../../constants/udoseSettings';
import { LabelNumericValue } from '../../../../../../types/common';
import UdoseRecordSettings, {
  UdoseSiteSupplement,
} from '../../../../../../types/udose/udoseSettings';
import BackendValidationMessage from '../../../../../../components/BackendValidationMessage';
import CustomLoader from '../../../../../../components/CustomLoader';

type Props = {
  nutrientSelectionOption: LabelNumericValue[];
  settings?: UdoseRecordSettings;
  toggleModal: () => void;
  latestSupplement?: UdoseSiteSupplement | null;
  isFetchingUdose?: boolean;
  refetchUdose: () => void;
};

const NutrientSettingsNewForm: React.FC<Props> = ({
  nutrientSelectionOption,
  settings,
  toggleModal,
  latestSupplement,
  isFetchingUdose,
  refetchUdose,
}) => {
  const {
    register,
    control,
    errors,
    onSubmit,
    handleSubmit,
    supplementOptions,
    addRow,
    removeRow,
    serverValidationError,
    setServerValidationError,
    fields,
    agreed,
    toggleAgree,
  } = useUpdateUdoseNutrientSettings({
    nutrientSelectionOption,
    settings,
    toggleModal,
    latestSupplement,
    refetchUdose,
  });

  if (isFetchingUdose) {
    return <CustomLoader />;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {serverValidationError && (
        <BackendValidationMessage
          setServerValidationError={setServerValidationError}
        />
      )}

      <Row className="mb-2">
        <Col md={6}>
          <ReactSelect
            label="Primary Supplement"
            name="supplement_id"
            control={control}
            errors={errors}
            options={nutrientSelectionOption}
            defaultSelected={nutrientSelectionOption?.find(
              (item) => item.value === latestSupplement?.supplement_id
            )}
          />
        </Col>
        <Col md={6}>
          <ReactSelect
            label="Quantity (Kg)"
            name="bulk_bag_weight_in_kg"
            control={control}
            errors={errors}
            options={SUPPLEMENT_DRY_QUANTITY_OPTIONS}
            defaultSelected={SUPPLEMENT_DRY_QUANTITY_OPTIONS?.find(
              (item) => item.value === latestSupplement?.bulk_bag_weight_in_kg
            )}
          />
        </Col>
      </Row>
      {fields?.length > 0 ? (
        <Row className="mb-2">
          <Col md={6}>
            <Form.Label className="m-0">Trace Supplements</Form.Label>
          </Col>
          <Col md={6}>
            <Form.Label className="m-0">Quantity (L)</Form.Label>
          </Col>
        </Row>
      ) : (
        <div className="d-flex justify-content-center align-items-center my-2">
          <Button
            variant=""
            onClick={addRow}
            className="border-dashed-success flex-grow-1"
            size="sm">
            <i className="bx bx-plus ms-1 text-success" />
            <span className="text-success">Add Trace Supplement</span>
          </Button>
        </div>
      )}

      {fields?.map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Row key={index} className="mb-2">
          <Col md={6}>
            <ReactSelect
              name={`nutrients[${index}][supplement_id]`}
              control={control}
              errors={errors}
              options={supplementOptions}
              defaultSelected={nutrientSelectionOption?.find(
                (item) =>
                  item.value ===
                  latestSupplement?.nutrients?.[index]?.supplement_id
              )}
              isClearable
            />
            {errors && errors.nutrients?.[index]?.supplement_id ? (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.nutrients?.[index]?.supplement_id?.message}
              </Form.Control.Feedback>
            ) : null}
          </Col>
          <Col md={4}>
            <FormInput
              type="text"
              name={`nutrients[${index}][volume_in_liter]`}
              control={control}
              register={register}
              errors={errors}
            />
            {errors && errors.nutrients?.[index]?.volume_in_liter ? (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.nutrients?.[index]?.volume_in_liter?.message}
              </Form.Control.Feedback>
            ) : null}
          </Col>
          <Col md={2}>
            <div className="d-flex justify-content-start align-items-center gap-1 mt-2">
              {fields?.length > 0 && (
                <button
                  onClick={() => removeRow(index)}
                  className="btn btn-link btn-sm p-0 m-0"
                  type="button">
                  <i className="bx bx-trash-alt text-danger" />
                </button>
              )}
              {fields && fields.length - 1 === index && (
                <button
                  onClick={addRow}
                  className="btn btn-link btn-sm p-0 m-0"
                  type="button">
                  <i className="bx bx-plus text-info" />
                </button>
              )}
            </div>
          </Col>
        </Row>
      ))}

      {errors && errors.nutrients ? (
        <Form.Control.Feedback type="invalid" className="d-block mb-2">
          {errors.nutrients?.message}
        </Form.Control.Feedback>
      ) : null}

      <Row>
        <Col md={12}>
          <FormInput
            type="text"
            name="final_solution_volume"
            label="Final Solution (L)"
            control={control}
            register={register}
            errors={errors}
          />
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <div className="d-flex justify-content-start align-items-start gap-2 my-3">
            <FormInput
              label="I agree that I have consulted my Territory Manager or DIT AgTech prior to changing this settings."
              type="checkbox"
              id="inline-checkbox"
              name="agreeTerms"
              propagateOnChange={toggleAgree}
            />
          </div>
        </Col>
      </Row>

      <div className="d-flex justify-content-end align-items-center button-list">
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
          disabled={!agreed}>
          <i className="bx bx-save " /> Save
        </Button>
      </div>
    </Form>
  );
};

export default NutrientSettingsNewForm;
