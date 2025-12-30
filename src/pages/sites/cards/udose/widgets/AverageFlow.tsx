import React from 'react';
import classNames from 'classnames';
import { Col, Row } from 'react-bootstrap';
import LowWaterFlowIndicator from './LowWaterFlowIndicator';
import { SiteWaterFlowCheck } from '../../../../../types/site';
import commaSeperatedNumber from '../../../../../helpers/numberHelper';
import { DURATION_LAST_14_DAYS } from '../../../../../constants/durationOptions';

type Props = {
  wrapperClass?: string;
  averageWaterFlow: number;
  averageNutrientFlow: number;
  waterFlowCheck: SiteWaterFlowCheck;
  showDurationLabel?: boolean;
  duration?: string;
  showDefault?: boolean;
};

const AverageFlow: React.FC<Props> = ({
  wrapperClass,
  averageWaterFlow,
  averageNutrientFlow,
  waterFlowCheck,
  showDurationLabel = true,
  duration,
  showDefault = true,
}) => {
  return (
    <div className={classNames('chart-content-bg', wrapperClass ?? 'mt-1')}>
      <Row>
        <Col md={6} className="text-center">
          <div className="d-flex justify-content-center align-items-center">
            <p className="text-black-50 mb-0 mt-2">
              Average Water Flow
              {showDurationLabel && (
                <small className="text-slate-gray">( last 14 Days)</small>
              )}
              {(waterFlowCheck.status &&
                duration === DURATION_LAST_14_DAYS &&
                !showDefault) ||
                (waterFlowCheck.status && showDefault && (
                  <LowWaterFlowIndicator message={waterFlowCheck.message} />
                ))}
            </p>
          </div>
          <h4 className="fw-normal mb-2">
            <span className="text-info">
              {commaSeperatedNumber(averageWaterFlow)} L
            </span>
          </h4>
        </Col>

        <Col md={6} className="text-center">
          <p className="text-black-50 mb-0 mt-2">
            Average Nutrient Flow
            {showDurationLabel && (
              <small className="text-slate-gray">( last 14 Days)</small>
            )}
          </p>
          <h4 className="fw-normal mb-2">
            <span className="text-warning">
              {commaSeperatedNumber(averageNutrientFlow)} L
            </span>
          </h4>
        </Col>
      </Row>
    </div>
  );
};
export default AverageFlow;
