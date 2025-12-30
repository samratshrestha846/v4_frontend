import React from 'react';
import { Row, Col } from 'react-bootstrap';

import ActionDropdown from '@uhub/components/ActionDropdown';
import { CustomDropdownMenuItem } from '@uhub/types/common';
import { formattedDate } from '@uhub/helpers';
import useModalFeature from '@uhub/hooks/common/useModalFeature';
import MaintenanceBookingForm from '../../maintenance-booking/pages/MaintenanceBookingForm';
import { UPDATE_MAINTENANCE_BOOKING } from '../../maintenance-booking/constants/constant';

import { FleetMaintenanceBooking } from '../../types/FleetMaintenance';

type Props = {
  booking: FleetMaintenanceBooking;
};

const MaintenanceBookingInfo: React.FC<Props> = ({ booking }) => {
  const { toggleModal } = useModalFeature();

  const menuItems: CustomDropdownMenuItem[] = [
    {
      label: 'Edit',
      icon: 'bx bx-edit',
      actionKey: 'Edit Maintenance Booking ',
      modalContent: (
        <MaintenanceBookingForm
          defaultValues={{
            ...booking,
            booking_date: booking?.booking_date
              ? new Date(booking?.booking_date)
              : null,
          }}
          toggleModal={toggleModal}
        />
      ),
      permission: UPDATE_MAINTENANCE_BOOKING,
    },
  ];

  return (
    <Row>
      <Col sm={6} md={3}>
        <h6 className="font-14">Booked Date</h6>
        <p>
          {booking?.booking_date ? formattedDate(booking.booking_date) : '-'}
        </p>
      </Col>
      <Col sm={6} md={3}>
        <h6 className="font-14">Location</h6>
        <p>{booking?.location ?? '-'}</p>
      </Col>
      <Col sm={5} md={5}>
        <h6 className="font-14">Assigned To</h6>
        {booking?.assignee ? (
          <div className="d-flex flex-column align-items-start">
            <p className="mb-1">
              {`${booking.assignee.first_name} ${booking.assignee.last_name}`}
            </p>
            {booking.assignee.phone_number && (
              <div className="d-flex justify-conten-start align-items-start gap-1 flex-nowrap">
                <i className="bx bx-phone" />
                <p className="m-0">{booking.assignee.phone_number}</p>
              </div>
            )}
            {booking.assignee.email && (
              <div className="d-flex justify-content-start align-items-center gap-1 flex-nowrap">
                <i className="bx bx-envelope" />
                <p className="m-0">{booking.assignee.email}</p>
              </div>
            )}
          </div>
        ) : (
          <p>-</p>
        )}
      </Col>
      <Col sm={1} md={1}>
        <div className="float-end">
          <ActionDropdown
            icon="bx bx-dots-vertical-rounded"
            containerClass="custom-dropdown"
            menuItems={menuItems}
          />
        </div>
      </Col>
    </Row>
  );
};

export default MaintenanceBookingInfo;
