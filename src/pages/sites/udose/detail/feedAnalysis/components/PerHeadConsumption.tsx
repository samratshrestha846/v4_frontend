import React from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';
import UproOrange from '../supplements/UproOrange';
import * as constants from '../constants/FilterConstant';
import UTrace from '../supplements/Utrace';
import UproSouthern from '../supplements/UproSouthern';
import UcalmWeaner from '../supplements/UcalmWeaner';
import Ucalm from '../supplements/Ucalm';
import UproForage from '../supplements/UproForage';
import UproMulga from '../supplements/UproMulga';
import * as Supplements from '../../../../../../constants/Supplements';
import UproBlueAgolin from '../supplements/UproBlueAgolin';
import {
  AveragePerHeadData,
  SumPerHeadData,
  SupplementFeedAnalysisFilterData,
} from '../../../../../../types/udose/supplementFeedAnalysis';

type Props = {
  sumPerHead: SumPerHeadData;
  avgPerHead: AveragePerHeadData;
  totalRecords: number;
  filters: SupplementFeedAnalysisFilterData;
};

const PerHeadConsumption: React.FC<Props> = ({
  sumPerHead,
  avgPerHead,
  totalRecords,
  filters,
}) => {
  const supplementComponents = (supplement: string, breakdowns: any) => {
    if (supplement === Supplements.UPRO_ORANGE)
      return <UproOrange breakdowns={breakdowns} />;

    if (supplement === Supplements.UTRACE)
      return <UTrace breakdowns={breakdowns} />;

    if (supplement === Supplements.UPRO_SOUTHERN)
      return <UproSouthern breakdowns={breakdowns} />;

    if (supplement === Supplements.UCALM_WEANER)
      return <UcalmWeaner breakdowns={breakdowns} />;

    if (supplement === Supplements.UCALM)
      return <Ucalm breakdowns={breakdowns} />;

    if (supplement === Supplements.UPRO_FORAGE)
      return <UproForage breakdowns={breakdowns} />;

    if (supplement === Supplements.UPRO_MULGA)
      return <UproMulga breakdowns={breakdowns} />;

    if (supplement === Supplements.UPRO_BLUE_WITH_AGOLIN)
      return <UproBlueAgolin breakdowns={breakdowns} />;

    return <UproOrange breakdowns={breakdowns} />;
  };

  return (
    <>
      <Row className="mt-1">
        <Col md={6}>
          <h5 className="text-primary-color mt-0 mb-2 font-16">
            Total Water and Nutrient Consumption Per Head
          </h5>
          <Card className="box-shadow-custom">
            <Card.Body>
              <Table responsive hover borderless>
                <tbody>
                  <tr>
                    <td className="p-1 text-secondary-color fw-semibold">
                      Water Intake (incl. supplement)
                    </td>
                    <td className="p-1 text-end text-secondary-color fw-semibold">
                      {sumPerHead.water_intake_in_l} L
                    </td>
                  </tr>
                  <tr className="mb-2">
                    <td className="p-1 text-secondary-color fw-semibold">
                      Nutrient Consumed
                    </td>
                    <td className="p-1 text-end text-secondary-color fw-semibold">
                      {sumPerHead.nutrient_in_ml} g
                    </td>
                  </tr>
                  {sumPerHead?.supplement_breakdowns?.map((item) => (
                    <React.Fragment key={item.supplement_name}>
                      <tr style={{ borderBottom: '1px solid #DFE1E6' }}>
                        <td className="p-1 text-secondary-color fw-bold">
                          {item.supplement_name}
                        </td>
                        <td className="p-1 text-end fw-semibold">Gram/Head</td>
                      </tr>
                      {supplementComponents(
                        item.supplement_name,
                        item.breakdowns
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <h5 className="text-primary-color mt-0 mb-2 font-16">
            Water and Nutrient Consumption Per Head Per Day
          </h5>
          <Card className="box-shadow-custom">
            <Card.Body>
              <Table responsive hover borderless>
                <tbody>
                  <tr>
                    <td className="p-1 text-secondary-color fw-semibold">
                      Water Intake (incl. supplement)
                    </td>
                    <td className="p-1 text-end text-secondary-color fw-semibold">
                      {avgPerHead.water_intake_in_l} L
                    </td>
                  </tr>
                  <tr>
                    <td className="p-1 text-secondary-color fw-semibold">
                      Nutrient Consumed
                    </td>
                    <td className="p-1 text-end text-secondary-color fw-semibold">
                      {avgPerHead.nutrient_in_ml} g
                    </td>
                  </tr>
                  {/* <tr className="mb-2">
                    <td className="p-1 text-secondary-color fw-semibold">
                      Cost (Head/Day/Litre)
                    </td>
                    <td className="p-1 text-end text-secondary-color fw-semibold">
                      $
                    </td>
                  </tr> */}

                  {avgPerHead?.supplement_breakdowns?.map((item) => (
                    <React.Fragment key={item.supplement_name}>
                      <tr style={{ borderBottom: '1px solid #DFE1E6' }}>
                        <td className="p-1 text-secondary-color fw-semibold">
                          {item.supplement_name}
                        </td>
                        <td className="p-1 text-end fw-semibold">
                          Gram/Head/Day
                        </td>
                      </tr>
                      {supplementComponents(
                        item.supplement_name,
                        item.breakdowns
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="mb-3">
        <small className="text-muted">
          The above calculation is based on total records found in the system in
          the duration of specified period. Total records: {totalRecords} in{' '}
          {constants.DURATION_LABEL[filters?.duration]}
        </small>
      </div>
    </>
  );
};

export default PerHeadConsumption;
