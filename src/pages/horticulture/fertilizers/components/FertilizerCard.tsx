import React from 'react';
import { Card } from 'react-bootstrap';
import { prepareDynamicUrl } from '../../../../helpers';
import { Fertilizer } from '../../../../types/horticulture/fertilizer';
import { FERTILIZER_EDIT } from '../../../../constants/path';
import { UPDATE_FERTILIZER } from '../../../../constants/permissions';
import FertilizerAnalysisParameters from './FertilizerAnalysisParameters';
import FertilizerNutrientCombination from './FertilizerNutrientCombination';
import ActiveInactiveStatus from '../../../../components/ActiveInactiveStatus';
import { CustomDropdownMenuItem } from '../../../../types/common';
import ActionDropdown from '../../../../components/ActionDropdown';

type Props = {
  fertilizer?: Fertilizer;
};

const FertilizerCard: React.FC<Props> = ({ fertilizer }) => {
  const menuItems: CustomDropdownMenuItem[] = [
    {
      label: 'Edit',
      icon: 'bx bx-edit',
      url: prepareDynamicUrl(FERTILIZER_EDIT, fertilizer?.id),
      permission: UPDATE_FERTILIZER,
    },
  ];

  return (
    <Card className="tilebox-one m-0">
      <Card.Body className="p-2">
        <div className="d-flex flex-column gap-2 nutrient-card">
          <div className="d-flex align-items-center justify-content-between gap-1">
            <h5 className="m-0 text-primary-color text-truncate">
              {fertilizer?.name ?? '-'}
            </h5>
            <div className="d-flex justify-content-end align-items-center gap-2">
              <ActiveInactiveStatus isActive={!!fertilizer?.is_active} />

              <ActionDropdown
                menuItems={menuItems}
                containerClass="custom-dropdown d-flex align-items-center justify-content-between text-white"
                iconColorClass="text-gray"
              />
            </div>
          </div>
          <FertilizerAnalysisParameters fertilizer={fertilizer} />
          <FertilizerNutrientCombination fertilizer={fertilizer} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default FertilizerCard;
