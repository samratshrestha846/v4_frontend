import React from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import classNames from 'classnames';
import {
  capitalizeFirstLetter,
  convertToSlug,
  prepareDynamicUrl,
} from '../../../helpers';
import IconLabelStatus from '../../../components/IconLabelStatus';
import { CustomDropdownMenuItem } from '../../../types/common';
import { UPDATE_SUPPLEMENT } from '../../../constants/permissions';
import { SUPPLEMENT_EDIT } from '../../../constants/path';
import UnitWithSup from '../../../components/UnitWithSup';
import { Supplement } from '../../../types/supplements/supplement';
import useToggle from '../../../hooks/common/useToggle';
import { DEFAULT_NUTRIENT_ROWS } from '../../../constants/constants';
import ActionDropdown from '../../../components/ActionDropdown';

type Props = {
  supplement: Supplement;
};

const SupplementCard: React.FC<Props> = ({ supplement }) => {
  const {
    name,
    is_active: isActive,
    nutrition,
    density,
    standard_concentration: concentration,
    id,
  } = supplement || {};

  const { status, toggle } = useToggle();

  const menuItems: CustomDropdownMenuItem[] = [
    {
      label: 'Edit',
      icon: 'bx bx-edit',
      url: prepareDynamicUrl(SUPPLEMENT_EDIT, id),
      permission: UPDATE_SUPPLEMENT,
    },
  ];

  const displayRows = status
    ? Object.entries(nutrition).length
    : DEFAULT_NUTRIENT_ROWS;

  return (
    <Card className="tilebox-one m-0">
      <Card.Body className="p-2">
        <div className="d-flex flex-column gap-2 nutrient-card">
          <div className="d-flex align-items-center justify-content-between gap-1">
            <h5 className="m-0 text-primary-color text-truncate">{name}</h5>
            <div className="d-flex justify-content-end align-items-center gap-2">
              <IconLabelStatus
                iconTextClass={isActive ? 'text-success' : 'text-gray'}
                label={isActive ? 'Active' : 'Inactive'}
              />
              <ActionDropdown
                menuItems={menuItems}
                containerClass="custom-dropdown d-flex align-items-center justify-content-between text-white"
                iconColorClass="text-gray"
              />
            </div>
          </div>

          <ListGroup as="ul" className="gap-2">
            <ListGroup.Item as="li" key="water_mass" className=" border-0 p-0">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <p className="mb-0 text-steel-gray">Standard Concentration</p>
                </div>
                <p className="mb-0 text-secondary-color text-semibold">
                  {concentration ? `${concentration} %` : '-'}
                </p>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" key="water_mass" className=" border-0 p-0">
              <div className="d-flex align-items-center justify-content-between ">
                <div className="d-flex align-items-center gap-1">
                  <p className="mb-0 text-steel-gray">Density</p>
                </div>
                {supplement?.density ? (
                  <UnitWithSup
                    wrapperClass="text-secondary-color text-semibold"
                    labelText={density.toString()}
                    baseText="Kg/m"
                    supText={3}
                  />
                ) : (
                  '-'
                )}
              </div>
            </ListGroup.Item>
          </ListGroup>

          <div className="nutrient-list-wrapper">
            <h5 className="mt-0 text-slate-gray text-uppercase">
              Nutrient Info
            </h5>
            <ListGroup
              as="ul"
              className={classNames(
                'gap-2',
                status ? 'nutrient-list-full' : 'nutrient-list-brief'
              )}>
              {!nutrition || Object.keys(nutrition).length === 0 ? (
                <ListGroup.Item as="li" className="border-0 p-0 my-1">
                  <div className="d-flex justify-content-center align-items-center gap-1">
                    <p className="mb-0 text-center">No Nutrient available</p>
                  </div>
                </ListGroup.Item>
              ) : (
                Object.entries(nutrition)
                  .slice(0, displayRows)
                  ?.map(([nutrient, value]) => (
                    <ListGroup.Item
                      as="li"
                      key={nutrient}
                      className="border-0 p-0">
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
                          {value} g/ml
                        </p>
                      </div>
                    </ListGroup.Item>
                  ))
              )}
            </ListGroup>
            {nutrition && Object.entries(nutrition).length > 4 && (
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
        </div>
      </Card.Body>
    </Card>
  );
};

export default SupplementCard;
