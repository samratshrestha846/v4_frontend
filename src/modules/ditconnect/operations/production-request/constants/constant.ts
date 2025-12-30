/** ************************* */
/*    ENDPOINTS              
/*************************** */
export const PRODUCTION_REQUEST = '/v2/production-facilities';
/** ************************* */
/*    PATHS                 
/*************************** */
export const PRODUCTION_REQUEST_LIST = '/dit-connect/production-request/list';
export const PRODUCTION_REQUEST_ADD = '/dit-connect/production-request/add';
export const PRODUCTION_REQUEST_EDIT =
  '/dit-connect/production-request/edit/:id';

/** ************************* */
/*    PERMISSIONS            
/*************************** */
export const ACCESS_PRODUCTION_REQUEST = 'access_production_facility';
export const CREATE_PRODUCTION_REQUEST: string = 'create_production_facility';
export const UPDATE_PRODUCTION_REQUEST: string = 'update_production_facility';
export const MODIFY_PRODUCTION_REQUEST: string = 'modify_production_facility';
