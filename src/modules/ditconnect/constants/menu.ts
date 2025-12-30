import { MenuItem } from '@uhub/types/common';
import {
  ACCESS_SITE_MAINTENANCE,
  SITE_MAINTENANCE_LIST,
} from '../operations/site-maintainances/constants/constant';
import {
  ACCESS_PRODUCTION_REQUEST,
  PRODUCTION_REQUEST_LIST,
} from '../operations/production-request/constants/constant';
import {
  ACCESS_TECH_INVENTORY,
  TECH_INVENTORY_LIST,
} from '../operations/tech-inventory/constants/constant';
import {
  ACCESS_RND_ACTIVITY,
  RND_ACTIVITY_LIST,
} from '../rnd-activity/constants/constant';
import {
  ACCESS_SALES_ORDER,
  SALES_ORDER_LIST,
} from '../sales-order/constants/constant';
import {
  ACCESS_FLEET_VEHICLE,
  FLEET_VEHICLE_LIST,
} from '../fleet-vehicle/constants/constant';
import {
  ACCESS_STORAGE_TANK,
  STORAGE_TANK_LIST,
} from '../storage-tank/constants/constant';
import {
  ACCESS_FLEET_MAINTENANCE,
  FLEET_MAINTENANCE_LIST,
} from '../fleet-maintenance/constants/constant';
import { ACCESS_SUPPLIER, SUPPLIER_LIST } from '../supplier/constants/constant';
import {
  ACCESS_INVENTORY_LOCATION,
  INVENTORY_LOCATION_LIST,
} from '../inventory-location/constants/constant';
import { ACCESS_POLICY, POLICY_LIST } from '../policy/constants/constant';
import {
  ACCESS_ACTIVITY_LOG,
  ACTIVITY_LOG_LIST,
} from '../activity-log/constants/constant';
import {
  ACCESS_WORK_DIARY,
  WORK_DIARY_LIST,
} from '../daily-diary/work-diary/constants/constant';
import { ACCESS_FOLDER, FOLDER_LIST } from '../document/constants/constant';
import { ACCESS_ROLE, ROLE_LIST } from '../role/constants/constant';
import {
  ACCESS_SUPPLEMENT,
  SUPPLEMENT_LIST,
} from '../supplement/constants/constant';
import { ACCESS_MESSAGE, MESSAGE_LIST } from '../message/constants/constant';
import {
  ACCESS_CUSTOMER_CONTACT,
  CUSTOMER_CONTACT_LIST,
} from '../customerContacts/constants/constant';
import { ACCESS_TASK, TASK_LIST } from '../operations/task/constants/constant';
import {
  ACCESS_SUPPLEMENT_TRANSFER,
  SUPPLEMENT_TRANSFER_LIST,
} from '../supplement-transfer/constants/constant';
import {
  ACCESS_SUPPLEMENT_MIXING,
  SUPPLEMENT_MIXING_LIST,
} from '../supplement-mixing/constants/constant';
import {
  ACCESS_SUPPLEMENT_REFILL,
  SUPPLEMENT_REFILL_LIST,
} from '../supplement-refill/constants/constant';
import {
  ACCESS_SUPPLEMENT_SALE,
  SUPPLEMENT_SALE_LIST,
} from '../supplement-sale/constants/constant';
import { SUMMARY_LIST } from '../stock-availability/summary/constants/constant';
import {
  ACCESS_TEMPLATE,
  TEMPLATE_LIST,
} from '../operations/template/constants/constant';
import { ACCESS_STAFF, STAFF_LIST } from '../staff/constants/constant';
import {
  ACCESS_LAB_SAMPLE,
  LAB_SAMPLE_LIST,
} from '../lab-sample/constants/constant';
import {
  ACCESS_RESPONSE_SET,
  RESPONSE_SET_LIST,
} from '../response-set/constants/constant';
import {
  ACCESS_PURCHASE_REQUEST,
  PURCHASE_REQUEST_LIST,
} from '../purchase-request/constants/constant';
import {
  ACCESS_PRODUCTION,
  PRODUCTION_LIST,
} from '../production/constants/constant';
import {
  ACCESS_STOCKTAKE,
  STOCKTAKE_LIST,
} from '../stocktake/constants/constant';
import { ACCESS_SUPPLEMENT_INVENTORY } from '../stock-availability/supplement-inventory/constants/constant';

const DIT_CONNECT_MENU_ITEMS: MenuItem[] = [
  {
    key: 'daily-diary',
    label: 'Daily Dairy',
    isTitle: false,
    icon: 'bx bx-notepad',
    url: WORK_DIARY_LIST,
    permission: [ACCESS_WORK_DIARY],
  },
  {
    key: 'fleet',
    label: 'Fleet',
    isTitle: false,
    icon: 'bx bxs-truck',
    permission: [ACCESS_FLEET_VEHICLE, ACCESS_FLEET_MAINTENANCE],
    children: [
      {
        key: 'fleet-vehicles',
        label: 'Fleet Vehicles',
        isTitle: false,
        icon: 'bx bxs-circle',
        url: FLEET_VEHICLE_LIST,
        permission: ACCESS_FLEET_VEHICLE,
        parentKey: 'fleet',
      },
      {
        key: 'fleet-maintenances',
        label: 'Fleet Maintenances',
        isTitle: false,
        icon: 'bx bxs-circle',
        url: FLEET_MAINTENANCE_LIST,
        permission: ACCESS_FLEET_MAINTENANCE,
        parentKey: 'fleet',
      },
    ],
  },
  {
    key: 'purchase-request',
    label: 'Purchase Request',
    isTitle: false,
    icon: 'bx bx-basket',
    url: PURCHASE_REQUEST_LIST,
    permission: [ACCESS_PURCHASE_REQUEST],
  },

  {
    key: 'supplement-module',
    label: 'Supplement',
    isTitle: false,
    icon: 'bx bxs-flask',
    permission: [
      ACCESS_SUPPLEMENT,
      ACCESS_SUPPLEMENT_INVENTORY,
      ACCESS_STORAGE_TANK,
      ACCESS_STOCKTAKE,
      ACCESS_SUPPLEMENT_TRANSFER,
      ACCESS_SUPPLEMENT_MIXING,
      ACCESS_SUPPLEMENT_REFILL,
      ACCESS_SUPPLEMENT_SALE,
      ACCESS_PRODUCTION,
    ],
    children: [
      {
        key: 'supplements',
        label: 'Supplement',
        isTitle: false,
        icon: 'bx bxs-circle',
        url: SUPPLEMENT_LIST,
        permission: ACCESS_SUPPLEMENT,
        parentKey: 'supplement-module',
      },
      {
        key: 'stock-availability',
        label: 'Stock Availability',
        isTitle: false,
        icon: 'bx bxs-circle',
        url: SUMMARY_LIST,
        permission: ACCESS_SUPPLEMENT_INVENTORY,
        parentKey: 'supplement-module',
      },
      {
        key: 'storage-tanks',
        label: 'Storage Tank',
        isTitle: false,
        icon: 'bx bxs-circle',
        url: STORAGE_TANK_LIST,
        permission: ACCESS_STORAGE_TANK,
        parentKey: 'supplement-module',
      },
      {
        key: 'production',
        label: 'Production',
        isTitle: false,
        icon: 'bx bxs-circle',
        url: PRODUCTION_LIST,
        permission: ACCESS_PRODUCTION,
        parentKey: 'supplement-module',
      },
      {
        key: 'stocktake',
        label: 'Stocktake',
        isTitle: false,
        icon: 'bx bxs-circle',
        url: STOCKTAKE_LIST,
        permission: ACCESS_STOCKTAKE,
        parentKey: 'supplement-module',
      },
      {
        key: 'supplement-transfers',
        label: 'Transfer',
        isTitle: false,
        icon: 'bx bxs-circle',
        url: SUPPLEMENT_TRANSFER_LIST,
        permission: ACCESS_SUPPLEMENT_TRANSFER,
        parentKey: 'supplement-module',
      },
      {
        key: 'supplement-mixings',
        label: 'Mixing',
        isTitle: false,
        icon: 'bx bxs-circle',
        url: SUPPLEMENT_MIXING_LIST,
        permission: ACCESS_SUPPLEMENT_MIXING,
        parentKey: 'supplement-module',
      },
      {
        key: 'supplement-refills',
        label: 'Delivery',
        isTitle: false,
        icon: 'bx bxs-circle',
        url: SUPPLEMENT_REFILL_LIST,
        permission: ACCESS_SUPPLEMENT_REFILL,
        parentKey: 'supplement-module',
      },
      {
        key: 'supplement-sales',
        label: 'Sales PAYG',
        isTitle: false,
        icon: 'bx bxs-circle',
        url: SUPPLEMENT_SALE_LIST,
        permission: ACCESS_SUPPLEMENT_SALE,
        parentKey: 'supplement-module',
      },
    ],
  },
  {
    key: 'operations',
    label: 'Operations',
    isTitle: false,
    icon: 'bx bx-sitemap',
    permission: [
      ACCESS_SITE_MAINTENANCE,
      ACCESS_PRODUCTION_REQUEST,
      ACCESS_TECH_INVENTORY,
      ACCESS_SALES_ORDER,
      ACCESS_TASK,
      ACCESS_TEMPLATE,
      ACCESS_LAB_SAMPLE,
    ],
    children: [
      {
        key: 'site-maintainenace',
        label: 'Site Maintenance',
        isTitle: false,
        icon: 'bx bxs-circle',
        url: SITE_MAINTENANCE_LIST,
        permission: ACCESS_SITE_MAINTENANCE,
        parentKey: 'operations',
      },
      {
        key: 'production-request',
        label: 'Production Request',
        isTitle: false,
        icon: 'bx bxs-circle',
        url: PRODUCTION_REQUEST_LIST,
        permission: ACCESS_PRODUCTION_REQUEST,
        parentKey: 'operations',
      },
      {
        key: 'tech-inventory',
        label: 'Tech Inventory',
        isTitle: false,
        icon: 'bx bxs-circle',
        url: TECH_INVENTORY_LIST,
        permission: ACCESS_TECH_INVENTORY,
        parentKey: 'operations',
      },
      {
        key: 'sales-order',
        label: 'Sales Order',
        isTitle: false,
        icon: 'bx bxs-circle',
        url: SALES_ORDER_LIST,
        permission: ACCESS_SALES_ORDER,
        parentKey: 'operations',
      },
      {
        key: 'task',
        label: 'Task',
        isTitle: false,
        icon: 'bx bxs-circle',
        url: TASK_LIST,
        permission: ACCESS_TASK,
        parentKey: 'operations',
      },
      {
        key: 'lab-sample',
        label: 'Lab Sample',
        isTitle: false,
        icon: 'bx bxs-circle',
        url: LAB_SAMPLE_LIST,
        permission: ACCESS_LAB_SAMPLE,
        parentKey: 'operations',
      },
      {
        key: 'template',
        label: 'Template',
        isTitle: false,
        icon: 'bx bxs-circle',
        url: TEMPLATE_LIST,
        permission: ACCESS_TEMPLATE,
        parentKey: 'operations',
      },
    ],
  },
  {
    key: 'utilities',
    label: 'Utilities',
    isTitle: false,
    icon: 'bx bx-cog',
    permission: [
      ACCESS_INVENTORY_LOCATION,
      ACCESS_ACTIVITY_LOG,
      ACCESS_POLICY,
      ACCESS_SUPPLIER,
      ACCESS_MESSAGE,
      ACCESS_RESPONSE_SET,
      ACCESS_RND_ACTIVITY,
    ],
    children: [
      {
        key: 'inventory-locations',
        label: 'Locations',
        isTitle: false,
        icon: 'bx bxs-circle',
        url: INVENTORY_LOCATION_LIST,
        permission: ACCESS_INVENTORY_LOCATION,
        parentKey: 'utilities',
      },
      {
        key: 'activity-log',
        label: 'Activity Log',
        isTitle: false,
        icon: 'bx bxs-circle',
        url: ACTIVITY_LOG_LIST,
        permission: ACCESS_ACTIVITY_LOG,
        parentKey: 'utilities',
      },
      {
        key: 'rnd-activity',
        label: 'R&D Activity',
        isTitle: false,
        icon: 'bx bxs-circle',
        url: RND_ACTIVITY_LIST,
        permission: ACCESS_RND_ACTIVITY,
        parentKey: 'utilities',
      },
      {
        key: 'supplier',
        label: 'Supplier',
        isTitle: false,
        icon: 'bx bxs-circle',
        url: SUPPLIER_LIST,
        permission: ACCESS_SUPPLIER,
        parentKey: 'utilities',
      },
      {
        key: 'documents',
        label: 'Documents',
        isTitle: false,
        icon: 'bx bxs-circle',
        url: FOLDER_LIST,
        permission: ACCESS_FOLDER,
        parentKey: 'utilities',
      },
      {
        key: 'messages',
        label: 'Messages',
        isTitle: false,
        icon: 'bx bxs-circle',
        url: MESSAGE_LIST,
        permission: ACCESS_MESSAGE,
        parentKey: 'utilities',
      },
      {
        key: 'policy',
        label: 'Policy',
        isTitle: false,
        icon: 'bx bxs-circle',
        url: POLICY_LIST,
        permission: ACCESS_POLICY,
        parentKey: 'utilities',
      },
      {
        key: 'response-set',
        label: 'Response Set',
        isTitle: false,
        icon: 'bx bxs-circle',
        url: RESPONSE_SET_LIST,
        permission: ACCESS_RESPONSE_SET,
        parentKey: 'utilities',
      },
    ],
  },
  {
    key: 'user-managements',
    label: 'User Management',
    isTitle: false,
    icon: 'bx bx-user-circle',
    permission: [ACCESS_CUSTOMER_CONTACT, ACCESS_STAFF, ACCESS_ROLE],
    children: [
      {
        key: 'customer-contacts',
        label: 'Customer Contacts',
        isTitle: false,
        icon: 'bx bxs-circle',
        url: CUSTOMER_CONTACT_LIST,
        permission: ACCESS_CUSTOMER_CONTACT,
        parentKey: 'user-managements',
      },
      {
        key: 'staff',
        label: 'Staff',
        isTitle: false,
        icon: 'bx bxs-circle',
        url: STAFF_LIST,
        permission: ACCESS_STAFF,
        parentKey: 'user-managements',
      },
      {
        key: 'role',
        label: 'Roles',
        isTitle: false,
        icon: 'bx bxs-circle',
        url: ROLE_LIST,
        permission: ACCESS_ROLE,
        parentKey: 'user-managements',
      },
    ],
  },
];
export default DIT_CONNECT_MENU_ITEMS;
