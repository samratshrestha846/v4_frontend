/** ************************* */
/*    PATHS                 */
/** ************************* */

export const FLEET_MAINTENANCE_LIST = '/dit-connect/fleet-maintenance/list';
export const FLEET_MAINTENANCE_VIEW = '/dit-connect/fleet-maintenance/view/:id';

/** /////// End PATHS //////// */
export const FLEET_MAINTENANCE = '/v2/fleet-maintenances';

/** ************************* */
/*    PERMISSIONS           */
/** ************************* */

export const ACCESS_FLEET_MAINTENANCE: string = 'access_fleet_maintenance';
export const READ_FLEET_MAINTENANCE: string = 'read_fleet_maintenance';

/** ************************* */
/*    VEHICLE MAINTENANCE STATUS OPTIONS           */
/** ************************* */

export const FLEET_MAINTENANCE_STATUS_PENDING = 'Pending';
export const FLEET_MAINTENANCE_STATUS_BOOKING_SCHEDULED = 'Booking Scheduled';
export const FLEET_MAINTENANCE_STATUS_COMPLETED = 'Completed';

export const FLEET_MAINTENANCE_STATUS_OPTIONS: {
  label: string;
  value: string;
}[] = [
  {
    label: FLEET_MAINTENANCE_STATUS_PENDING,
    value: FLEET_MAINTENANCE_STATUS_PENDING,
  },
  {
    label: FLEET_MAINTENANCE_STATUS_BOOKING_SCHEDULED,
    value: FLEET_MAINTENANCE_STATUS_BOOKING_SCHEDULED,
  },
  {
    label: FLEET_MAINTENANCE_STATUS_COMPLETED,
    value: FLEET_MAINTENANCE_STATUS_COMPLETED,
  },
];
