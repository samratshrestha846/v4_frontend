/** ************************* */
/*    PATHS                 */
/** ************************* */

export const FLEET_VEHICLE_LIST = '/dit-connect/fleet-vehicle/list';
export const FLEET_VEHICLE_ADD = '/dit-connect/fleet-vehicle/add';
export const FLEET_VEHICLE_EDIT = '/dit-connect/fleet-vehicle/edit/:id';
export const FLEET_VEHICLE_VIEW = '/dit-connect/fleet-vehicle/view/:id';

/** /////// End PATHS //////// */
export const FLEET_VEHICLE = 'v2/vehicles';
export const FLEET_VEHICLE_DROPDOWN = 'v2/dropdown/vehicles';

/** ************************* */
/*    PERMISSIONS           */
/** ************************* */

export const ACCESS_FLEET_VEHICLE: string = 'access_fleet_vehicle';
export const CREATE_FLEET_VEHICLE: string = 'create_fleet_vehicle';
export const UPDATE_FLEET_VEHICLE: string = 'modify_fleet_vehicle'; // no bug
export const READ_FLEET_VEHICLE: string = 'read_fleet_vehicle';

/** ************************* */
/*    VEHICLES TYPES OPTIONS           */
/** ************************* */

export const FLEET_VEHICLE_TYPE_OPTIONS_PLANE: string = 'Plane';

export const FLEET_VEHICLE_TYPE_OPTIONS: { label: string; value: string }[] = [
  { label: 'Triton', value: 'Triton' },
  { label: 'Trailer', value: 'Trailer' },
  { label: 'Prado', value: 'Prado' },
  { label: 'Landcruiser', value: 'Landcruiser' },
  { label: 'Truck', value: 'Truck' },
  { label: 'Forklift', value: 'Forklift' },
  {
    label: FLEET_VEHICLE_TYPE_OPTIONS_PLANE,
    value: FLEET_VEHICLE_TYPE_OPTIONS_PLANE,
  },
];

/** ************************* */
/*    VEHICLES STATUS OPTIONS           */
/** ************************* */

export const FLEET_VEHICLE_STATUS_ACTIVE = 'Active';
export const FLEET_VEHICLE_STATUS_INACTIVE = 'In-Active';

export const FLEET_VEHICLE_STATUS_OPTIONS: { label: string; value: string }[] =
  [
    { label: FLEET_VEHICLE_STATUS_ACTIVE, value: FLEET_VEHICLE_STATUS_ACTIVE },
    {
      label: FLEET_VEHICLE_STATUS_INACTIVE,
      value: FLEET_VEHICLE_STATUS_INACTIVE,
    },
  ];
