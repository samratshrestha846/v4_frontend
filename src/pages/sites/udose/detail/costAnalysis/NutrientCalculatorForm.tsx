import React from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import FormInput from '../../../../../components/FormInput';
import ReactSelect from '../../../../../components/ReactSelect';
import { LabelNumericValue } from '../../../../../types/common';
import useNutrientCostAnalysis from './hooks/useNutrientCostAnalysis';
import BackendValidationMessage from '../../../../../components/BackendValidationMessage';
import CustomLoader from '../../../../../components/CustomLoader';
import CostAnalysisTable from './CostAnalysisTable';
import FeedAnalysisTable from './FeedAnalysisTable';

type Props = {
  supplementOptions: LabelNumericValue[];
};

const NutrientCalculatorForm: React.FC<Props> = ({ supplementOptions }) => {
  const {
    register,
    control,
    errors,
    handleSubmit,
    onSubmit,
    serverValidationError,
    setServerValidationError,
    propagateOnSupplementChange,
    isFetchingCostAnalysedData,
    mineralOptions,
    clearFormFields,
    targetMineral,
    supplementId,
    propagateOnMineralChange,
    analysisData,
  } = useNutrientCostAnalysis();

  return (
    <>
      {serverValidationError && (
        <BackendValidationMessage
          setServerValidationError={setServerValidationError}
        />
      )}

      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={3} className="mb-3">
                <ReactSelect
                  name="supplementId"
                  label="Supplement"
                  options={supplementOptions}
                  control={control}
                  errors={errors}
                  propagateOnChange={propagateOnSupplementChange}
                  isClearable
                  defaultSelected={supplementOptions?.find(
                    (item) => item.value === supplementId
                  )}
                />
              </Col>
              <Col md={3} className="mb-3">
                <ReactSelect
                  name="target_mineral"
                  label="Target Mineral"
                  options={mineralOptions}
                  control={control}
                  errors={errors}
                  propagateOnChange={propagateOnMineralChange}
                  defaultSelected={mineralOptions?.find(
                    (item) => item.value === targetMineral
                  )}
                  isClearable
                />
              </Col>
              <Col md={3} className="mb-3">
                <FormInput
                  label="Target Mineral Amount (g)"
                  type="text"
                  name="target_mineral_amount"
                  placeholder="0.00"
                  control={control}
                  register={register}
                  errors={errors}
                />
              </Col>
              <Col md={3} className="mb-3">
                <FormInput
                  label="Total Water Intake Per Head (L)"
                  type="text"
                  name="waterIntake"
                  placeholder="0.00"
                  control={control}
                  register={register}
                  errors={errors}
                />
              </Col>
              <Col md={3} className="mb-3">
                <FormInput
                  label="Retail Price Per Litre($)"
                  type="text"
                  name="price"
                  placeholder="0.00"
                  control={control}
                  register={register}
                  errors={errors}
                />
              </Col>
            </Row>
            <div className="text-center d-flex justify-content-end button-list ">
              <Button
                variant="outline"
                className="btn btn-ghost"
                onClick={clearFormFields}>
                <i className="bx bx-reset " /> Reset
              </Button>

              <Button
                type="submit"
                variant="secondary"
                className="btn btn-secondary ">
                <i className="bx bx-calculator me-1" />
                Calculate
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <Row className="mt-3">
        <Col md={6}>
          {isFetchingCostAnalysedData ? (
            <CustomLoader />
          ) : (
            <CostAnalysisTable costAnalysisData={analysisData} />
          )}
        </Col>
        <Col md={6}>
          {isFetchingCostAnalysedData ? (
            <CustomLoader />
          ) : (
            <FeedAnalysisTable costAnalysisData={analysisData} />
          )}
        </Col>
      </Row>
    </>
  );
};

export default NutrientCalculatorForm;
