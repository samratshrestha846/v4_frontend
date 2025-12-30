import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { CostFeedAnalysis } from '../../../types/costFeed/costFeed';
import commaSeperatedNumber from '../../../helpers/numberHelper';

type Props = {
  costFeedData: CostFeedAnalysis;
};

const CostAnalysis: React.FC<Props> = ({ costFeedData }) => {
  return (
    <div className="box-showdow p-3">
      <h4 className="analysis-header">Cost Analysis</h4>
      <Row>
        <Col md={6}>
          <h5 className="text-label fw-bold">Product Name </h5>
          <p className="text-value">{costFeedData.productName}</p>
        </Col>
        <Col md={6}>
          <h5 className="text-label fw-bold">
            Actual nutrient Consumption <br />
            <span className="text-label fw-bold font-10">Head/Day</span>
          </h5>
          <p className="text-value">
            {commaSeperatedNumber(costFeedData.actualNutrientConsumption)}
          </p>
        </Col>
        <Col md={6}>
          <h5 className="text-label fw-bold">
            Nutrient consumption
            <br />
            <span className="text-label fw-bold font-10">
              Per Month/Head Count (L)
            </span>
          </h5>
          <p className="text-value">
            {commaSeperatedNumber(
              costFeedData.nutrientConsumptionPerHeadPerMonth
            )}
          </p>
        </Col>

        <Col md={6}>
          <h5 className="text-label fw-bold">
            Nutrient consumption
            <br />
            <span className="text-label fw-bold font-10">Per Month (L)</span>
          </h5>
          <p className="text-value">
            {commaSeperatedNumber(costFeedData.nutrientConsumptionPerMonth)}
          </p>
        </Col>

        <Col md={6}>
          <h5 className="text-label fw-bold">Quality in Bulkers</h5>
          <p className="text-value">
            {commaSeperatedNumber(costFeedData.quantityInBulkers)}{' '}
          </p>
        </Col>
        <Col md={6}>
          <h5 className="text-label fw-bold"> Price in Bulkers/IBC </h5>
          <p className="text-value">
            {`$ ${commaSeperatedNumber(costFeedData.priceInBulkers)}`}{' '}
          </p>
        </Col>

        <Col md={6}>
          <h5 className="text-label fw-bold">Cost Per Month </h5>
          <p className="text-value">
            {`$ ${commaSeperatedNumber(costFeedData.costPerMonth)}`}{' '}
          </p>
        </Col>
        <Col md={6}>
          <h5 className="text-label fw-bold">Cost Per Day Per Head </h5>
          <p className="text-value">
            {`$ ${commaSeperatedNumber(costFeedData.costPerDayPerHead)}`}{' '}
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default CostAnalysis;
