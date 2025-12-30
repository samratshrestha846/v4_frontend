/* eslint-disable react/no-danger */
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { LabTestResultView } from '../../../../types/lab/labTestResult';

type Props = {
  defaultTestResults?: LabTestResultView[];
};

const LabSampleSpeciesInfo: React.FC<Props> = ({ defaultTestResults }) => {
  return (
    <>
      {defaultTestResults
        ?.map((item) => item.grass_species)
        .some((element) => element) && (
        <Row>
          <Col>
            <div className="mt-3">
              <h5 className="text-primary">Grass Species</h5>
              <ul className="mb-0">
                {defaultTestResults?.map(
                  (item) =>
                    item?.grass_species && (
                      <li key={item?.lab_sample_id}>
                        {item?.grass_species ?? '-'}
                      </li>
                    )
                )}
              </ul>
            </div>
          </Col>
        </Row>
      )}

      {defaultTestResults
        ?.map((item) => item.grass_species)
        .some((element) => element) && (
        <Row>
          <Col>
            <div className="mt-3">
              <h5 className="text-primary">Animal type grazing in paddock</h5>
              <ul className="mb-0">
                {defaultTestResults?.map(
                  (item) =>
                    item?.grass_species && (
                      <li key={item?.lab_sample_id}>
                        {item?.animal_specs ?? '-'}
                      </li>
                    )
                )}
              </ul>
            </div>
          </Col>
        </Row>
      )}
    </>
  );
};

export default LabSampleSpeciesInfo;
