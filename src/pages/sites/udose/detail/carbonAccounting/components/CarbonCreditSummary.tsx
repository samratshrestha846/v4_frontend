import React, { FC } from 'react';
import { Col, Row, Card } from 'react-bootstrap';
import classNames from 'classnames';
import { CarbonCreditSummaryData } from '../../../../../../types/udose/carbonAccounting';

type Props = {
  carbonCredits: CarbonCreditSummaryData[];
};

const CarbonCreditSummary: FC<Props> = ({ carbonCredits }) => {
  return (
    <div className="carbon-summery">
      <Row>
        {carbonCredits.slice(1).map((item) => (
          <Col md={3} sm={6} key={item.label}>
            <Card className="tilebox-one">
              <Card.Body
                className={classNames('summary_card text-center', item.class)}>
                <h3 className="text-black">
                  {item.credit}
                  <small className="text-black-50 fw-normal ms-1">
                    (tCO<sub>2</sub>e)
                  </small>
                </h3>
                <h5 className="text-black-50 fw-normal">{item.label}</h5>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default CarbonCreditSummary;
