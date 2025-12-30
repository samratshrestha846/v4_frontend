import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Fertilizer } from '../../../../types/horticulture/fertilizer';

type Props = {
  fertilizer?: Fertilizer;
};

const FertilizerAnalysisParameters: React.FC<Props> = ({ fertilizer }) => {
  return (
    <div>
      <h5 className="mt-0 text-slate-gray text-uppercase">
        Analysis Parameters
      </h5>

      <ListGroup as="ul" className="gap-2">
        <ListGroup.Item as="li" key="water_mass" className=" border-0 p-0">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <p className="mb-0 text-steel-gray">Water Mass</p>
            </div>
            <p className="mb-0 text-secondary-color text-semibold">
              {fertilizer?.water_mass ? `${fertilizer?.water_mass} g` : '-'}
            </p>
          </div>
        </ListGroup.Item>
        <ListGroup.Item as="li" key="fertlizer_mass" className=" border-0 p-0">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <p className="mb-0 text-steel-gray">Fertlizer Mass</p>
            </div>
            <p className="mb-0 text-secondary-color text-semibold">
              {fertilizer?.fertilizer_mass
                ? `${fertilizer?.fertilizer_mass} g`
                : '-'}
            </p>
          </div>
        </ListGroup.Item>
        <ListGroup.Item as="li" key="solution_volumn" className=" border-0 p-0">
          <div className="d-flex align-items-center justify-content-between ">
            <div className="d-flex align-items-center gap-1">
              <p className="mb-0 text-steel-gray">Solution Volume</p>
            </div>
            <p className="mb-0 text-secondary-color text-semibold">
              {fertilizer?.solution_volume
                ? `${fertilizer?.solution_volume} mL`
                : '-'}
            </p>
          </div>
        </ListGroup.Item>
        <ListGroup.Item as="li" key="solution_weight" className=" border-0 p-0">
          <div className="d-flex align-items-center justify-content-between ">
            <div className="d-flex align-items-center gap-1">
              <p className="mb-0 text-steel-gray">Solution Weight</p>
            </div>
            <p className="mb-0 text-secondary-color text-semibold">
              {fertilizer?.solution_weight
                ? `${fertilizer?.solution_weight} g`
                : '-'}
            </p>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default FertilizerAnalysisParameters;
