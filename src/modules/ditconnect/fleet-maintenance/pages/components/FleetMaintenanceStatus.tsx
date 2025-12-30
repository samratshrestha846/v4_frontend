import React from 'react';
import IconLabelStatus from '@uhub/components/IconLabelStatus';
import {
  FLEET_MAINTENANCE_STATUS_BOOKING_SCHEDULED,
  FLEET_MAINTENANCE_STATUS_COMPLETED,
  FLEET_MAINTENANCE_STATUS_PENDING,
} from '../../constants/constant';

type Props = {
  status: string;
};

const FleetMaintenanceStatus: React.FC<Props> = ({ status }) => {
  switch (status) {
    case FLEET_MAINTENANCE_STATUS_PENDING:
      return (
        <IconLabelStatus
          label={FLEET_MAINTENANCE_STATUS_PENDING}
          iconTextClass="text-warning"
        />
      );
    case FLEET_MAINTENANCE_STATUS_BOOKING_SCHEDULED:
      return (
        <IconLabelStatus
          label={FLEET_MAINTENANCE_STATUS_BOOKING_SCHEDULED}
          iconTextClass="text-info"
          labelClass="text-nowrap"
        />
      );

    case FLEET_MAINTENANCE_STATUS_COMPLETED:
      return (
        <IconLabelStatus
          label={FLEET_MAINTENANCE_STATUS_COMPLETED}
          iconTextClass="text-success"
        />
      );

    default:
      return '-';
  }
};

export default FleetMaintenanceStatus;
