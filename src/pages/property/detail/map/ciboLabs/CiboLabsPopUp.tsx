import React from 'react';
import { Card } from 'react-bootstrap';

type props = {
  feature: any;
  name: string;
};

const CiboLabsPopUp: React.FC<props> = ({ feature, name }) => {
  return (
    <Card>
      <Card.Body>
        <div className=" border-1">
          <h5 className="mb-1">{name}</h5>
          <div className="d-flex flex-column gap-1">
            <div>
              <span className="me-1 text-black-50 fw-bold ">Date:</span>
              <span className="text-black  me-1 font-12 fw-normal ">
                {feature.properties.image_date}
              </span>
            </div>
            <div>
              <span className="me-1 text-black-50 fw-bold ">Area:</span>
              <span className="text-black  me-1 font-12 fw-normal ">
                {feature.properties.area_ha} Hectare
              </span>
            </div>
            <div>
              <span className="me-1 text-black-50 fw-bold ">Mean:</span>
              <span className="text-black  me-1 font-12 fw-normal ">
                {feature.properties.mean_kgha} Kg/Hectare
              </span>
            </div>
            <div>
              <span className="me-1 text-black-50 fw-bold ">STD:</span>
              <span className="text-black  me-1 font-12 fw-normal ">
                {feature.properties.std_kgha} Kg/Hectare
              </span>
            </div>
            <div>
              <span className="me-1 text-black-50 fw-bold ">
                Food on offer:
              </span>
              <span className="text-black  me-1 font-12 fw-normal ">
                {feature.properties.food_on_offer_kg} Kg
              </span>
            </div>
            <div>
              <span className="me-1 text-black-50 fw-bold ">Rate per day:</span>
              <span className="text-black  me-1 font-12 fw-normal ">
                {`${feature.properties.rate_per_day_kgha} Kg/Hectare`}
              </span>
            </div>
            <div>
              <span className="me-1 text-black-50 fw-bold ">
                Seasonal comparison rank:
              </span>
              <span className="text-black  me-1 font-12 fw-normal ">
                {feature.properties.seasonal_comparison_rank}
              </span>
            </div>
            <div>
              <span className="me-1 text-black-50 fw-bold ">
                Mean Green TSDM:
              </span>
              <span className="text-black  me-1 font-12 fw-normal ">
                {feature.properties.mean_greentsdm_kgha} Kg/Ha
              </span>
            </div>
            <div>
              <span className="me-1 text-black-50 fw-bold ">
                Mean Dry TSDM:
              </span>
              <span className="text-black  me-1 font-12 fw-normal ">
                {feature.properties.mean_drytsdm_kgha} Kg/Ha
              </span>
            </div>
            <div>
              <span className="me-1 text-black-50 fw-bold ">Groundcover:</span>
              <span className="text-black  me-1 font-12 fw-normal ">
                {feature.properties.groundcover_percent} %
              </span>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CiboLabsPopUp;
