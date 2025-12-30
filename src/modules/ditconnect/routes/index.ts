import DIT_CONNECT_DASHBOARD_ROUTE from '../dashboard/routes';
import CUSTOMER_CONTACT_ROUTE from '../customerContacts/routes';
import PRODUCTION_REQUEST_ROUTE from '../operations/production-request/routes';
import SITE_MAINTENANCE_ROUTE from '../operations/site-maintainances/routes';
import TECH_INVENTORY_ROUTE from '../operations/tech-inventory/routes/routes';
import RND_ACTIVITY_ROUTE from '../rnd-activity/routes/routes';
import SALES_ORDER_ROUTE from '../sales-order/routes/routes';
import FLEET_VEHICLE_ROUTE from '../fleet-vehicle/routes/routes';
import STORAGE_TANK_ROUTE from '../storage-tank/routes/routes';
import FLEET_MAINTENANCE_ROUTE from '../fleet-maintenance/routes/routes';
import INVENTORY_LOCATION_ROUTE from '../inventory-location/routes/routes';
import POLICY_ROUTE from '../policy/routes/routes';
import ACTIVITY_LOG_ROUTE from '../activity-log/routes/routes';
import WORK_DIARY_ROUTE from '../daily-diary/work-diary/routes/routes';
import TRAVEL_DIARY_ROUTE from '../daily-diary/travel-diary/routes/routes';
import SUPPLIER_ROUTE from '../supplier/routes/routes';
import DOCUMENT_ROUTE from '../document/routes/routes';
import ROLE_ROUTE from '../role/routes/routes';
import SUPPLEMENT_ROUTE from '../supplement/routes/routes';
import MESSAGE_ROUTE from '../message/routes/routes';
import TASK_ROUTE from '../operations/task/routes/routes';
import SUPPLEMENT_TRANSFER_ROUTE from '../supplement-transfer/routes/routes';
import SUPPLEMENT_MIXING_ROUTE from '../supplement-mixing/routes/routes';
import SUPPLEMENT_REFILL_ROUTE from '../supplement-refill/routes/routes';
import SUPPLEMENT_SALE_ROUTE from '../supplement-sale/routes/routes';
import STOCK_AVAILABILITY_ROUTE from '../stock-availability/summary/routes/routes';
import SUPPLEMENT_INVENTORY_ROUTE from '../stock-availability/supplement-inventory/routes/routes';
import TEMPLATE_ROUTE from '../operations/template/routes/routes';
import STAFF_ROUTE from '../staff/routes/routes';
import LAB_SAMPLE_ROUTE from '../lab-sample/routes/routes';
import RESPONSE_SET_ROUTE from '../response-set/routes/routes';
import PRODUCTION_ROUTE from '../production/routes/routes';
import PURCHASE_REQUEST_ROUTE from '../purchase-request/routes/routes';
import STOCKTAKE_ROUTE from '../stocktake/routes/routes';

// todo instead of spread operator use something
const DIT_CONNECT_ROUTE = [
  ...DIT_CONNECT_DASHBOARD_ROUTE,
  ...FLEET_VEHICLE_ROUTE,
  ...FLEET_MAINTENANCE_ROUTE,
  ...PURCHASE_REQUEST_ROUTE,
  ...WORK_DIARY_ROUTE,
  ...TRAVEL_DIARY_ROUTE,
  ...INVENTORY_LOCATION_ROUTE,
  ...SITE_MAINTENANCE_ROUTE,
  ...PRODUCTION_REQUEST_ROUTE,
  ...CUSTOMER_CONTACT_ROUTE,
  ...TECH_INVENTORY_ROUTE,
  ...SALES_ORDER_ROUTE,
  ...SUPPLIER_ROUTE,
  ...STORAGE_TANK_ROUTE,
  ...STOCKTAKE_ROUTE,
  ...DOCUMENT_ROUTE,
  ...SUPPLEMENT_TRANSFER_ROUTE,
  ...SUPPLEMENT_MIXING_ROUTE,
  ...SUPPLEMENT_REFILL_ROUTE,
  ...SUPPLEMENT_SALE_ROUTE,
  ...POLICY_ROUTE,
  ...ACTIVITY_LOG_ROUTE,
  ...ROLE_ROUTE,
  ...SUPPLEMENT_ROUTE,
  ...MESSAGE_ROUTE,
  ...TASK_ROUTE,
  ...LAB_SAMPLE_ROUTE,
  ...STOCK_AVAILABILITY_ROUTE,
  ...SUPPLEMENT_INVENTORY_ROUTE,
  ...TEMPLATE_ROUTE,
  ...STAFF_ROUTE,
  ...RESPONSE_SET_ROUTE,
  ...PRODUCTION_ROUTE,
  ...RND_ACTIVITY_ROUTE,
];

export default DIT_CONNECT_ROUTE;
