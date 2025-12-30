import React, { FC } from 'react';
import { Row, Col, Card, Alert } from 'react-bootstrap';

import CarbonCreditGraph from './components/CarbonCreditGraph';
import { Vera } from '../../../../../assets/images';
import CustomLoader from '../../../../../components/CustomLoader';
import useCarbonAccounting from './hooks/useCarbonAccounting';
import CarbonCreditSummary from './components/CarbonCreditSummary';

const CarbonAccouting: FC = () => {
  const { data, isFetching, carbonCredits, isError } = useCarbonAccounting();

  if (isFetching) {
    return <CustomLoader />;
  }

  if (isError) {
    return (
      <Alert variant="danger" className="my-3">
        <i className="bx bx-error-alt" /> Oops something went wrong! Please try
        again later.
      </Alert>
    );
  }

  return (
    <Row className="mx-0 mt-2">
      <Col md={12}>
        <CarbonCreditSummary carbonCredits={carbonCredits!} />
      </Col>
      <Col md={8}>
        <Card>
          <Card.Body>
            <Row>
              <Col md={8}>{data && <CarbonCreditGraph data={data} />}</Col>
              <Col md={4}>
                <div className="">
                  <h5 className="text-primary">Net Carbon Abatement</h5>
                  <div className="box-wrapper mt-1 p-1">
                    <div className="text-center">
                      <h3 className="text-black">
                        {data?.last_seven_days}
                        <small className="text-black-50 fw-normal ms-1">
                          (tCO<sub>2</sub>e)
                        </small>
                      </h3>
                      <h5 className="text-black-50 fw-normal">last 7 Days</h5>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <h5 className="text-primary">Feed Additive</h5>
                  <div className="box-wrapper mt-1 p-1">
                    <div className="text-center">
                      <h3 className="text-black">Agolin</h3>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <h5 className="text-primary">Methodology</h5>
                  <div className="box-wrapper mt-1">
                    <div className="text-left">
                      <div className="d-grid">
                        <img src={Vera} className="w-100" alt="Vera" />
                      </div>
                      <p className="mt-1 font-14">
                        The Verified Carbon Standard (VCS) Program is the
                        world’s most widely used greenhouse gas (GHG) crediting
                        program.
                      </p>
                      <a
                        href="https://ditagtech.com.au/"
                        className="d-flex justify-content-end font-14">
                        Read more....
                      </a>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <div className="wallet ">
          <div className="wallet-bg p-2">
            <div className="d-flex justify-content-between">
              <h4 className="text-primary">My Carbon Wallet</h4>
              <i className="bx bx-station font-48 text-secondary" />
            </div>
            <h3 className="text-white">
              117,863.00
              <br />
              <small className="amount">Credit Amount</small>
            </h3>
            <div className="dots">
              <i className="bx bx-dots-horizontal-rounded text-white font-48" />
              <i className="bx bx-dots-horizontal-rounded text-white font-48" />
              <i className="bx bx-dots-horizontal-rounded text-white font-48" />
            </div>
          </div>
        </div>
        <div className="wallet-shadow">
          <div className="wallet-shadow-1" />
          <div className="wallet-shadow-2" />
        </div>
        <div className="wallet-detail mt-3">
          <Card>
            <Card.Body>
              <div className="">
                <div className="d-flex align-items-center ">
                  <div className="flex-shrink-0">
                    <div className="avatar-sm">
                      <span className="avatar-title bg-purple rounded-circle h3 my-0">
                        <i className="bx bx-credit-card " />
                      </span>
                    </div>
                  </div>
                  <div className="flex-grow-1 text-center">
                    <h3 className="text-black">
                      {data?.total}
                      <small className="text-black-50 fw-normal ms-1">
                        (tCO<sub>2</sub>e)
                      </small>
                    </h3>
                    <h5
                      className="text-black-50  fw-normal"
                      title="Daily Average Cost">
                      Credit Produced
                    </h5>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <div className="d-flex align-items-center ">
                  <div className="flex-shrink-0">
                    <div className="avatar-sm">
                      <span className="avatar-title bg-info rounded-circle h3 my-0">
                        <i className="bx bx-check-shield " />
                      </span>
                    </div>
                  </div>
                  <div className="flex-grow-1 text-center">
                    <h3 className="text-black">
                      0
                      <small className="text-black-50 fw-normal ms-1">
                        (tCO<sub>2</sub>e)
                      </small>
                    </h3>
                    <h5
                      className="text-black-50  fw-normal "
                      title="Daily Average Cost">
                      Credit Claimed
                    </h5>
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <div className="d-flex align-items-center justify-content-between gap-2">
                  <div className="text-center">
                    <h5 className="text-black m-0">
                      0
                      <small className="text-muted fw-normal font-10 ms-1">
                        (tCO<sub>2</sub>e)
                      </small>
                    </h5>
                    <p
                      className="text-black-50  fw-normal font-10"
                      title="Daily Average Cost">
                      Credit Offset
                    </p>
                  </div>
                  <div className="text-center">
                    <h5 className="text-black m-0">
                      0
                      <small className="text-muted fw-normal ms-1 font-10">
                        (tCO<sub>2</sub>e)
                      </small>
                    </h5>
                    <p
                      className="text-black-50  fw-normal font-10"
                      title="Daily Average Cost">
                      Credit Inset
                    </p>
                  </div>
                  <div className="text-center">
                    <h5 className="text-black m-0">
                      0
                      <small className="text-muted fw-normal ms-1 font-10">
                        (tCO<sub>2</sub>e)
                      </small>
                    </h5>
                    <p
                      className="text-black-50  fw-normal font-10"
                      title="Daily Average Cost">
                      Credit Balanced
                    </p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Col>
    </Row>
  );
};

export default CarbonAccouting;
