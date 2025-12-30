import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { NutrientCostAnalysis } from '../../../../../types/udose/costAnalysis';

type Props = {
  costAnalysisData: NutrientCostAnalysis | undefined;
};

const CostAnalysisTable: React.FC<Props> = ({ costAnalysisData }) => {
  if (!costAnalysisData) return null;

  return (
    <>
      <Card className="tilebox-one">
        <Card.Header
          as="h4"
          className="text-primary-color border-0 bg-ghost-white">
          Cost Analysis
        </Card.Header>
        <Card.Body>
          <h5 className="text-secondary-color text-uppercase mt-0">
            Supplement Info
          </h5>
          <Row>
            <Col md={6} sm={6}>
              <h5>Supplement</h5>
              <p>
                {costAnalysisData?.concentration
                  ? `${costAnalysisData?.supplementName} - (${costAnalysisData?.concentration}%)`
                  : costAnalysisData?.supplementName ?? '-'}
              </p>
            </Col>

            <Col md={6} sm={6}>
              <h5>Target Dose Rate</h5>
              <p>
                {costAnalysisData?.doseRate
                  ? `${costAnalysisData.doseRate} mL`
                  : '-'}
              </p>
            </Col>

            <Col md={6} sm={6}>
              <h5>Trigger Point</h5>
              <p>
                {costAnalysisData?.triggerPoint
                  ? `${costAnalysisData.triggerPoint} L`
                  : '-'}
              </p>
            </Col>

            <Col md={6} sm={6}>
              <h5>Supplement Intake (mL/Head/Day)</h5>
              <p>
                {costAnalysisData?.supplementIntake
                  ? `${costAnalysisData.supplementIntake} mL`
                  : '-'}
              </p>
            </Col>

            <Col md={6} sm={6}>
              <h5>Total Nutrient Consumed (g/Head/Day)</h5>
              <p>
                {costAnalysisData?.totalNutrientInGrams
                  ? `${costAnalysisData.totalNutrientInGrams} g`
                  : '-'}
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="tilebox-one">
        <Card.Body>
          <h5 className="text-secondary-color text-uppercase mt-0">
            Cost Info
          </h5>
          <Row>
            <Col md={6} sm={6}>
              <h5>Cost Per Head Per Day</h5>
              <p>
                {costAnalysisData?.costPerHeadPerDay
                  ? `$${costAnalysisData.costPerHeadPerDay}`
                  : '-'}
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default CostAnalysisTable;
