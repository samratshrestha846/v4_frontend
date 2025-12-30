import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import classNames from 'classnames';
import { Fertilizer } from '../../../../types/horticulture/fertilizer';
import { capitalizeFirstLetter, convertToSlug } from '../../../../helpers';
import useToggle from '../../../../hooks/common/useToggle';
import { DEFAULT_NUTRIENT_ROWS } from '../../../../constants/constants';

type Props = {
  fertilizer?: Fertilizer;
};

const FertilizerNutrientCombination: React.FC<Props> = ({ fertilizer }) => {
  const { status, toggle } = useToggle();

  const displayRows =
    status && fertilizer?.nutrition_combination
      ? Object.entries(fertilizer.nutrition_combination).length
      : DEFAULT_NUTRIENT_ROWS;

  return (
    <div className="nutrient-list-wrapper">
      <h5 className="mt-0 text-slate-gray text-uppercase">
        Nutrition Combination
      </h5>
      <ListGroup
        as="ul"
        className={classNames(
          'gap-2',
          status ? 'nutrient-list-full' : 'nutrient-list-brief'
        )}>
        {!fertilizer?.nutrition_combination ||
        Object.keys(fertilizer.nutrition_combination).length === 0 ? (
          <ListGroup.Item as="li" className="border-0 p-0 my-1">
            <div className="d-flex justify-content-center align-items-center gap-1">
              <p className="mb-0 text-center">No Nutrient available</p>
            </div>
          </ListGroup.Item>
        ) : (
          Object.entries(fertilizer?.nutrition_combination)
            .slice(0, displayRows)
            ?.map(([nutrient, value]) => (
              <ListGroup.Item as="li" key={nutrient} className="border-0 p-0">
                <div className="d-flex align-items-center justify-content-between ">
                  <div className="d-flex align-items-center gap-1">
                    <i
                      className={classNames(
                        'bx bxs-square-rounded',
                        `text-${convertToSlug(nutrient)}`
                      )}
                    />
                    <p className="mb-0 text-capitalize text-steel-gray">
                      {capitalizeFirstLetter(nutrient)}
                    </p>
                  </div>
                  <p className="text-secondary-color text-semibold mb-0">
                    {value} %
                  </p>
                </div>
              </ListGroup.Item>
            ))
        )}
      </ListGroup>
      {fertilizer?.nutrition_combination &&
        Object.entries(fertilizer.nutrition_combination).length > 4 && (
          <div
            className={classNames(
              'd-flex justify-content-center align-items-center view-more-less-toggle-btn-wrapper'
            )}>
            <Button
              variant="btn-link"
              onClick={toggle}
              className="font-12 view-more-less-toggle-btn flex-grow-1 p-0">
              {status ? '- View Less' : '+ View More'}
            </Button>
          </div>
        )}
    </div>
  );
};

export default FertilizerNutrientCombination;
