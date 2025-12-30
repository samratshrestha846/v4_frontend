import { LabelValueDropdown } from '@uhub/types/common';
import { DIT_CONNECT } from '../../constants/path';
import {
  FILE_EXTENSION_DOC,
  FILE_EXTENSION_DOCX,
  FILE_EXTENSION_HEIC,
  FILE_EXTENSION_JPEG,
  FILE_EXTENSION_JPG,
  FILE_EXTENSION_PDF,
  FILE_EXTENSION_PNG,
} from '../../../../constants/fileExtensions';

/** ************************* */
/*    PATHS                 */
/** ************************* */

export const PURCHASE_REQUEST_LIST = `${DIT_CONNECT}/purchase-request/list`;
export const PURCHASE_REQUEST_ADD = `${DIT_CONNECT}/purchase-request/add`;
export const PURCHASE_REQUEST_EDIT = `${DIT_CONNECT}/purchase-request/edit/:id`;
export const PURCHASE_REQUEST_VIEW = `${DIT_CONNECT}/purchase-request/view/:id`;

/** /////// End PATHS //////// */
export const PURCHASE_REQUEST = '/v2/purchase-requests';
export const EXPORT_PURCHASE_REQUEST_ENDPOPINT = '/v2/export/purchase-requests';
export const PURCHASE_REQUEST_FILE = '/v2/purchase-request-files';

/** ************************* */
/*    PERMISSIONS           */
/** ************************* */

export const ACCESS_PURCHASE_REQUEST: string = 'access_purchase_request';
export const CREATE_PURCHASE_REQUEST: string = 'create_purchase_request';
export const UPDATE_PURCHASE_REQUEST: string = 'update_purchase_request';
export const READ_PURCHASE_REQUEST: string = 'read_purchase_request';
export const EXPORT_PURCHASE_REQUEST: string = 'export_purchase_request';

/** ************************* */
/*    PURCHASE REQUEST STATUS           */
/** ************************* */

export const PURCHASE_REQUEST_STATUS_DOCUMENT_PENDING: string =
  'Document Pending';
export const PURCHASE_REQUEST_STATUS_DOCUMENT_COMPLETED: string =
  'Document Completed';
export const PURCHASE_REQUEST_STATUS_APPROVED: string = 'Approved';
export const PURCHASE_REQUEST_STATUS_ON_HOLD: string = 'On Hold';
export const PURCHASE_REQUEST_STATUS_REJECTED: string = 'Rejected';
export const PURCHASE_REQUEST_STATUS_PAID: string = 'Paid';
export const PURCHASE_REQUEST_STATUS_SERVICE_COMPLETED: string =
  'Service/Delivery Completed';

export const PURCHASE_REQUEST_STATUS_OPTIONS: LabelValueDropdown[] = [
  {
    label: PURCHASE_REQUEST_STATUS_DOCUMENT_PENDING,
    value: PURCHASE_REQUEST_STATUS_DOCUMENT_PENDING,
  },
  {
    label: PURCHASE_REQUEST_STATUS_DOCUMENT_COMPLETED,
    value: PURCHASE_REQUEST_STATUS_DOCUMENT_COMPLETED,
  },
  {
    label: PURCHASE_REQUEST_STATUS_APPROVED,
    value: PURCHASE_REQUEST_STATUS_APPROVED,
  },
  {
    label: PURCHASE_REQUEST_STATUS_ON_HOLD,
    value: PURCHASE_REQUEST_STATUS_ON_HOLD,
  },
  {
    label: PURCHASE_REQUEST_STATUS_REJECTED,
    value: PURCHASE_REQUEST_STATUS_REJECTED,
  },
  { label: PURCHASE_REQUEST_STATUS_PAID, value: PURCHASE_REQUEST_STATUS_PAID },
  {
    label: PURCHASE_REQUEST_STATUS_SERVICE_COMPLETED,
    value: PURCHASE_REQUEST_STATUS_SERVICE_COMPLETED,
  },
];

/** ************************* */
/*    PURCHASE REQUEST PRIORITIES           */
/** ************************* */

export const PURCHASE_REQUEST_PRIORITY_HIGH = 'High';
export const PURCHASE_REQUEST_PRIORITY_MEDIUM = 'Medium';
export const PURCHASE_REQUEST_PRIORITY_LOW = 'Low';

export const PURCHASE_REQUEST_PRIORITY_OPTIONS: LabelValueDropdown[] = [
  {
    label: PURCHASE_REQUEST_PRIORITY_HIGH,
    value: PURCHASE_REQUEST_PRIORITY_HIGH,
  },
  {
    label: PURCHASE_REQUEST_PRIORITY_MEDIUM,
    value: PURCHASE_REQUEST_PRIORITY_MEDIUM,
  },
  {
    label: PURCHASE_REQUEST_PRIORITY_LOW,
    value: PURCHASE_REQUEST_PRIORITY_LOW,
  },
];

/** ******************************************** */
/*    PURCHASE REQUEST DELIVERY METHODS          */
/** ******************************************** */

export const PURCHASE_REQUEST_DELIVERY_METHOD_PICKUP = 'Pickup';
export const PURCHASE_REQUEST_DELIVERY_METHOD_DELIVERY = 'Delivery';
export const PURCHASE_REQUEST_DELIVERY_METHOD_NA = 'N/A';

export const PURCHASE_REQUEST_DELIVERY_METHOD_OPTIONS: LabelValueDropdown[] = [
  {
    label: PURCHASE_REQUEST_DELIVERY_METHOD_PICKUP,
    value: PURCHASE_REQUEST_DELIVERY_METHOD_PICKUP,
  },
  {
    label: PURCHASE_REQUEST_DELIVERY_METHOD_DELIVERY,
    value: PURCHASE_REQUEST_DELIVERY_METHOD_DELIVERY,
  },
  {
    label: PURCHASE_REQUEST_DELIVERY_METHOD_NA,
    value: PURCHASE_REQUEST_DELIVERY_METHOD_NA,
  },
];

/** ******************************************** */
/*    PURCHASE REQUEST FILES          */
/** ******************************************** */

export const PURCHASE_REQUEST_ALLOWED_FILE_EXTENSIONS = [
  FILE_EXTENSION_JPEG,
  FILE_EXTENSION_JPG,
  FILE_EXTENSION_PNG,
  FILE_EXTENSION_HEIC,
  FILE_EXTENSION_PDF,
  FILE_EXTENSION_DOCX,
  FILE_EXTENSION_DOC,
];

export const PURCHASE_REQUEST_ALLOWED_FILE_SIZE = 5; // in MB

export const PURCHASE_REQUEST_ALLOWED_FILE_COUNT = 5;
