import React from 'react';

import {
  // CREATE_LAB_SAMPLE,
  CREATE_LAB_TEST_RESULT,
  CREATE_NEWS,
  CREATE_UDOSE,
  READ_CUSTOMER_PROPERTY,
  READ_DEVICE,
  READ_LAB_SAMPLE,
  READ_NEWS,
  READ_UDOSE,
  READ_USER,
  RESET_USER_PASSWORD,
  UPDATE_LAB_SAMPLE,
  UPDATE_LAB_TEST_RESULT,
  UPDATE_NEWS,
  UPDATE_UDOSE,
  ACCESS_HEALTH_CHECK_SETTING,
  ACCESS_USER,
  ACCESS_DEVICE,
  ACCESS_CUSTOMER,
  ACCESS_CUSTOMER_PROPERTY,
  ACCESS_LOG,
  ACCESS_TRANSPORT_EMISSION,
  ACCESS_HEALTH_CHECK,
  ACCESS_UDOSE,
  ACCESS_UDOSE_MINI,
  ACCESS_NEWS,
  ACCESS_ROLE,
  ACCESS_REPORT,
  ACCESS_WATER_PRESSURE,
  ACCESS_LAB_SAMPLE,
  CREATE_DEVICE,
  UPDATE_DEVICE,
  ACCESS_TAG,
  ACCESS_UDOSE_AG,
  UPDATE_CUSTOMER_PROPERTY,
  ACCESS_REFERRER,
  CREATE_REFERRER,
  UPDATE_REFERRER,
  READ_REFERRER,
  CREATE_CUSTOMER,
  UPDATE_CUSTOMER,
  ACCESS_SALE,
  CREATE_SALE,
  ACCESS_PAYMENT,
  CREATE_PAYMENT,
  UPDATE_SALE,
  UPDATE_PAYMENT,
  ACCESS_SUPPLEMENT,
  ACCESS_UBOT,
  CREATE_SUPPLEMENT,
  CREATE_UBOT,
  UPDATE_UBOT,
  READ_UBOT,
  ACCESS_SUPPLEMENT_NUTRIENT,
  UPDATE_SUPPLEMENT,
  ACCESS_LAB_REPORT,
  CREATE_LAB_REPORT,
  READ_LAB_REPORT,
  UPDATE_LAB_REPORT,
  READ_PUBLISHED_LAB_REPORT,
  ACCESS_PADDOCK,
  CREATE_PADDOCK,
  UPDATE_PADDOCK,
  READ_PADDOCK,
  ACCESS_CERES_TAG,
  READ_CERES_TAG,
  CREATE_UDOSE_AG,
  READ_UDOSE_AG,
  UPDATE_UDOSE_AG,
  ACCESS_UDOSE_AG_MESSAGE,
  ACCESS_CROP,
  CREATE_CROP,
  UPDATE_CROP,
  ACCESS_CROP_LIFE_CYCLE,
  CREATE_CROP_LIFE_CYCLE,
  UPDATE_CROP_LIFE_CYCLE,
  READ_FERTILIZER,
  CREATE_FERTILIZER,
  UPDATE_FERTILIZER,
  ACCESS_EMAIL_LOGS,
  READ_NOTE_DEVICE_MAINTENANCE,
  READ_NOTE_SUPPLEMENT_DELIVERIES,
  ACCESS_ALARM,
  READ_ALARM,
  CREATE_ALARM,
  UPDATE_ALARM,
  ACCESS_CARBON_ACCOUNTING,
  ACCESS_SETTINGS,
} from '../constants/permissions';

import RouteWithPermission from '../routes/RouteWithPermission';

// users
const ListUser = React.lazy(() => import('../pages/users/ListUsers'));
const ViewUser = React.lazy(() => import('../pages/users/detail/ViewUser'));
const AdminPasswordReset = React.lazy(
  () => import('../pages/account/PasswordReset')
);

const ListActivityLogs = React.lazy(() => import('../pages/logs/List'));

// devices
const ListDevice = React.lazy(() => import('../pages/devices/list/List'));
const ViewDevice = React.lazy(
  () => import('../pages/devices/detail/DeviceDetail')
);
const AddDevice = React.lazy(() => import('../pages/devices/AddDevice'));
const EditDevice = React.lazy(() => import('../pages/devices/EditDevice'));
const EditStockTypeDevice = React.lazy(
  () => import('../pages/devices/EditStockTypeDevice')
);

// sites
const HealthCheckSites = React.lazy(
  () => import('../pages/healths/SiteHealthCheck')
);
const UdoseDailySummary = React.lazy(
  () => import('../pages/sites/udose/detail/dailySummary/UdoseDailySummary')
);

const UdoseSiteHealthCheckSettings = React.lazy(
  () => import('../pages/sites/udose/healthSettings/SiteHealthCheckSettings')
);
const SiteMapView = React.lazy(
  () => import('../pages/sites/siteMaps/SiteMapView')
);

// ubot routes
const ListUbotSites = React.lazy(
  () => import('../pages/sites/ubot/list/UbotList')
);
const AddUbotSite = React.lazy(() => import('../pages/sites/ubot/AddUbotSite'));
const EditUbotSite = React.lazy(
  () => import('../pages/sites/ubot/EditUbotSite')
);
const ViewUbotSite = React.lazy(
  () => import('../pages/sites/ubot/detail/ViewUbotSite')
);

// udose routes
const AddUdoseSite = React.lazy(
  () => import('../pages/sites/udose/AddUdoseSite')
);

const EditUdoseSite = React.lazy(
  () => import('../pages/sites/udose/EditUdoseSite')
);

const ViewUdoseSite = React.lazy(
  () => import('../pages/sites/udose/detail/UdoseSiteDetail')
);

const ListUdose = React.lazy(
  () => import('../pages/sites/udose/list/UdoseList')
);

const ListUdoseMini = React.lazy(() => import('../pages/sites/udoseMini/List'));

// udose site's full graph
const Voltage = React.lazy(
  () => import('../pages/sites/udose/detail/monitoring/fullGraphs/Voltage')
);
const Conductivity = React.lazy(
  () => import('../pages/sites/udose/detail/monitoring/fullGraphs/Conductivity')
);
const NutrientUsage = React.lazy(
  () =>
    import('../pages/sites/udose/detail/monitoring/fullGraphs/NutrientUsage')
);
const WaterNutrient = React.lazy(
  () =>
    import(
      '../pages/sites/udose/detail/monitoring/fullGraphs/HourlyWaterNutrientFlow'
    )
);

// Test Sites (Sandbox)
const TestSite = React.lazy(
  () => import('../pages/sites/testSites/ListTestSites')
);

const ListCeresTags = React.lazy(
  () => import('../pages/ceresTag/list/ListCeresTags')
);

const ViewCeresTag = React.lazy(
  () => import('../pages/ceresTag/detail/ViewCeresTag')
);

const AlertNotificationsSetting = React.lazy(
  () =>
    import(
      '../pages/ceresTag/alertNotificationsSetting/AlertNotificationsSetting'
    )
);

// dashboard
const Dashboard = React.lazy(
  () => import('../pages/dashboard/DefaultDashboard')
);

const DashboardMapView = React.lazy(
  () => import('../pages/dashboardMapView/MapContent')
);

const DashboardNew = React.lazy(() => import('../pages/dashboard1/index'));

// Customer Routes
const ListCustomer = React.lazy(
  () => import('../pages/customer/list/CustomerList')
);
const CustomerOnboarding = React.lazy(
  () => import('../pages/customer/onboarding/CustomerOnboarding')
);

const AddCustomer = React.lazy(() => import('../pages/customer/AddCustomer'));

const EditCustomer = React.lazy(() => import('../pages/customer/EditCustomer'));

const PropertyList = React.lazy(
  () => import('../pages/property/list/PropertyList')
);

const ViewProperty = React.lazy(
  () => import('../pages/property/detail/ViewPropertyAnalytics')
);

const PropertySettings = React.lazy(
  () => import('../pages/property/detail/settings/PropertySettings')
);

// Water Pressure Routes
const ListWaterPressure = React.lazy(
  () => import('../pages/water-pressure/ListWaterPressure')
);

// Export Report Routes
const ExportReport = React.lazy(() => import('../pages/report/ExportReport'));

// Role Routes
const ListRole = React.lazy(() => import('../pages/roles/ListRole'));

// Lab sample Routes
const ListLabSample = React.lazy(
  () => import('../pages/laboratory/lab_samples/list/LabSampleList')
);
// const AddLabSample = React.lazy(
//   () => import('../pages/laboratory/lab_samples/AddLabSample')
// );
const EditLabSample = React.lazy(
  () => import('../pages/laboratory/lab_samples/EditLabSample')
);

const ViewLabSample = React.lazy(
  () => import('../pages/laboratory/lab_samples/ViewLabSample')
);

// Lab test result Routes
const AddLabTestResult = React.lazy(
  () => import('../pages/laboratory/lab_test_results/AddLabTestResult')
);
const EditLabTestResult = React.lazy(
  () => import('../pages/laboratory/lab_test_results/EditLabTestResult')
);

// Lab sample Routes
const ListLabReport = React.lazy(
  () => import('../pages/laboratory/lab_reports/list/LabReportList')
);
const AddLabReport = React.lazy(
  () => import('../pages/laboratory/lab_reports/AddLabReport')
);

const ViewLabReport = React.lazy(
  () => import('../pages/laboratory/lab_reports/detail/ViewLabReport')
);

const EditLabReport = React.lazy(
  () => import('../pages/laboratory/lab_reports/EditLabReport')
);

// Transport Emissions Routes
const ListTransportEmission = React.lazy(
  () => import('../pages/transport-emissions/ListTransportEmissions')
);

// News Routes
const ListNews = React.lazy(() => import('../pages/news/ListNews'));
const AddNews = React.lazy(() => import('../pages/news/AddNews'));
const ViewNews = React.lazy(() => import('../pages/news/ViewNews'));
const EditNews = React.lazy(() => import('../pages/news/EditNews'));

// udose Ags routes
const UdoseAgs = React.lazy(
  () => import('../pages/udoseAgs/list/ListUdoseAgs')
);
const AddUdoseAg = React.lazy(() => import('../pages/udoseAgs/AddUdoseAg'));
const ViewUdoseAg = React.lazy(
  () => import('../pages/udoseAgs/detail/ViewUdoseAg')
);
const EditUdoseAg = React.lazy(() => import('../pages/udoseAgs/EditUdoseAg'));

const ListUdoseAgMessage = React.lazy(
  () =>
    import(
      '../pages/udoseAgs/detail/dailyMessages/list/ListUdoseAgDailyMessage'
    )
);

const ViewSessionDetail = React.lazy(
  () => import('../pages/udoseAgSessions/ViewSessionDetail')
);

// Tag Routes
const ListTag = React.lazy(() => import('../pages/tags/ListTag'));

// Referrer Routes
const ListReferrer = React.lazy(
  () => import('../pages/referral-portal/referrers/list/ReferrerList')
);
const AddReferrer = React.lazy(
  () => import('../pages/referral-portal/referrers/AddReferrer')
);

const ViewReferrer = React.lazy(
  () => import('../pages/referral-portal/referrers/detail/ViewReferrer')
);

const EditReferrer = React.lazy(
  () => import('../pages/referral-portal/referrers/EditReferrer')
);

// Sales Routes
const ListSale = React.lazy(
  () => import('../pages/referral-portal/sales/list/SaleList')
);

const AddSale = React.lazy(
  () => import('../pages/referral-portal/sales/AddSale')
);

const EditSale = React.lazy(
  () => import('../pages/referral-portal/sales/EditSale')
);

// Payment Routes
const ListPayment = React.lazy(
  () => import('../pages/referral-portal/payments/list/PaymentList')
);

const AddPayment = React.lazy(
  () => import('../pages/referral-portal/payments/AddPayment')
);

const EditPayment = React.lazy(
  () => import('../pages/referral-portal/payments/EditPayment')
);

// Supplements Routes
const ListSupplement = React.lazy(
  () => import('../pages/supplements/list/SupplementList')
);
const AddSupplement = React.lazy(
  () => import('../pages/supplements/AddSupplement')
);
const EditSupplement = React.lazy(
  () => import('../pages/supplements/EditSupplement')
);

// Nutrients Routes
const SupplementNutrientList = React.lazy(
  () => import('../pages/nutrients/SupplementNutrientList')
);

// Lab Result Routes
const PublishedLabResultList = React.lazy(
  () => import('../pages/lab-result/list/PublishedLabResultList')
);

const LabResultDetail = React.lazy(
  () => import('../pages/lab-result/detail/LabResultDetail')
);

// Paddokcs Routes
const ListPaddock = React.lazy(
  () => import('../pages/paddocks/list/ListPaddocks')
);

const AddPaddock = React.lazy(() => import('../pages/paddocks/AddPaddock'));

const EditPaddock = React.lazy(() => import('../pages/paddocks/EditPaddock'));

const ViewPaddock = React.lazy(
  () => import('../pages/paddocks/detail/ViewPaddock')
);

const ListCrop = React.lazy(
  () => import('../pages/horticulture/crops/ListCrops')
);

const AddCrop = React.lazy(() => import('../pages/horticulture/crops/AddCrop'));

const EditCrop = React.lazy(
  () => import('../pages/horticulture/crops/EditCrop')
);

const ViewCropCycle = React.lazy(
  () => import('../pages/horticulture/cropCycles/ListCropCycle')
);

const AddCropCycle = React.lazy(
  () => import('../pages/horticulture/cropCycles/AddCropCycle')
);

const EditCropCycle = React.lazy(
  () => import('../pages/horticulture/cropCycles/EditCropCycle')
);

// Fertilizers routes
const ListFertilizer = React.lazy(
  () => import('../pages/horticulture/fertilizers/list/ListFertilizer')
);

const AddFertilizer = React.lazy(
  () => import('../pages/horticulture/fertilizers/AddFertilizer')
);

const EditFertilizer = React.lazy(
  () => import('../pages/horticulture/fertilizers/EditFertilizer')
);

const ListDeviceLogs = React.lazy(
  () => import('../pages/deviceLogs/ListDeviceLogs')
);

const ListSiteLogs = React.lazy(
  () => import('../pages/deviceLogs/ListSiteLogs')
);

const ListEmailLogs = React.lazy(
  () => import('../pages/email-logs/ListEmailLogs')
);

const Notes = React.lazy(() => import('../pages/notes/Notes'));

const ViewMaintenanceNote = React.lazy(
  () => import('../pages/notes/maintenance/ViewMaintenanceNote')
);

const ViewSupplementDeliveryNote = React.lazy(
  () => import('../pages/notes/supplement-delivery/ViewSupplementDeliveryNote')
);

const ListAlarm = React.lazy(() => import('../pages/alarm/ListAlarm'));
const ViewAlarm = React.lazy(() => import('../pages/alarm/ViewAlarm'));
const CreateAlarm = React.lazy(() => import('../pages/alarm/CreateAlarm'));
const UpdateAlarm = React.lazy(() => import('../pages/alarm/EditAlarm'));

// carbon accounting
const CarbonAccounting = React.lazy(
  () => import('../pages/carbon-accounting/CarbonAccounting')
);

// settings
const Settings = React.lazy(() => import('../pages/users/settings/Settings'));

const UHUB_ROUTES = [
  {
    path: 'dashboard/new',
    element: <RouteWithPermission component={DashboardNew} />,
  },

  {
    path: 'dashboard',
    element: <RouteWithPermission component={Dashboard} />,
  },
  {
    path: 'dashboard-map-view',
    element: <RouteWithPermission component={DashboardMapView} />,
  },

  {
    path: 'udose-sites',
    children: [
      {
        path: 'add',
        element: (
          <RouteWithPermission
            component={AddUdoseSite}
            permission={CREATE_UDOSE}
          />
        ),
      },
      {
        path: 'edit/:id',
        element: (
          <RouteWithPermission
            component={EditUdoseSite}
            permission={UPDATE_UDOSE}
          />
        ),
      },
      {
        path: ':id/device-logs',
        element: (
          <RouteWithPermission
            component={ListDeviceLogs}
            permission={READ_DEVICE}
          />
        ),
      },

      {
        path: ':id/water-pressure',
        element: (
          <RouteWithPermission
            component={ListWaterPressure}
            permission={ACCESS_WATER_PRESSURE}
          />
        ),
      },
      {
        path: ':id/daily-summary',
        element: (
          <RouteWithPermission
            component={UdoseDailySummary}
            permission={READ_UDOSE}
          />
        ),
      },
      {
        path: ':id/health-check-settings',
        element: (
          <RouteWithPermission
            component={UdoseSiteHealthCheckSettings}
            permission={ACCESS_HEALTH_CHECK_SETTING}
          />
        ),
      },
    ],
  },

  {
    path: 'sites/udose-mini/list',
    element: (
      <RouteWithPermission
        component={ListUdoseMini}
        permission={ACCESS_UDOSE_MINI}
      />
    ),
  },

  {
    path: 'test-sites',
    element: (
      <RouteWithPermission component={TestSite} permission={ACCESS_UDOSE} />
    ),
  },
  // devices routes
  {
    path: 'devices',
    children: [
      {
        path: 'list',
        element: (
          <RouteWithPermission
            component={ListDevice}
            permission={ACCESS_DEVICE}
          />
        ),
      },
      {
        path: 'add',
        element: (
          <RouteWithPermission
            component={AddDevice}
            permission={CREATE_DEVICE}
          />
        ),
      },
      {
        path: 'edit/:id',
        element: (
          <RouteWithPermission
            component={EditDevice}
            permission={UPDATE_DEVICE}
          />
        ),
      },
      {
        path: 'view/:id',
        element: (
          <RouteWithPermission
            component={ViewDevice}
            permission={READ_DEVICE}
          />
        ),
      },
      {
        path: 'edit-stock-type/:id',
        element: (
          <RouteWithPermission
            component={EditStockTypeDevice}
            permission={UPDATE_DEVICE}
          />
        ),
      },

      {
        path: ':id/site-logs',
        element: (
          <RouteWithPermission
            component={ListSiteLogs}
            permission={READ_DEVICE}
          />
        ),
      },
    ],
  },
  // customers routes
  {
    path: 'customers',
    children: [
      {
        path: 'list',
        element: (
          <RouteWithPermission
            component={ListCustomer}
            permission={ACCESS_CUSTOMER}
          />
        ),
      },

      {
        path: 'add',
        element: (
          <RouteWithPermission
            component={AddCustomer}
            permission={CREATE_CUSTOMER}
          />
        ),
      },
      {
        path: 'onboarding',
        element: (
          <RouteWithPermission
            component={CustomerOnboarding}
            permission={CREATE_CUSTOMER}
          />
        ),
      },

      {
        path: 'edit/:id',
        element: (
          <RouteWithPermission
            component={EditCustomer}
            permission={UPDATE_CUSTOMER}
          />
        ),
      },
    ],
  },
  // properties routes
  {
    path: 'properties',
    children: [
      {
        path: 'list',
        element: (
          <RouteWithPermission
            component={PropertyList}
            permission={ACCESS_CUSTOMER_PROPERTY}
          />
        ),
      },
      {
        path: 'view/:id',
        element: (
          <RouteWithPermission
            component={ViewProperty}
            permission={READ_CUSTOMER_PROPERTY}
          />
        ),
      },

      {
        path: 'settings/:id',
        element: (
          <RouteWithPermission
            component={PropertySettings}
            permission={UPDATE_CUSTOMER_PROPERTY}
          />
        ),
      },

      {
        path: ':id/alert-settings',
        element: (
          <RouteWithPermission
            component={AlertNotificationsSetting}
            permission={READ_CUSTOMER_PROPERTY}
          />
        ),
      },
    ],
  },
  // ceres tags routes
  {
    path: 'ceres-tags',
    children: [
      {
        path: 'list',
        element: (
          <RouteWithPermission
            component={ListCeresTags}
            permission={ACCESS_CERES_TAG}
          />
        ),
      },

      {
        path: 'view/:id',
        element: (
          <RouteWithPermission
            component={ViewCeresTag}
            permission={READ_CERES_TAG}
          />
        ),
      },
    ],
  },
  // paddock routes
  {
    path: 'paddocks',
    children: [
      {
        path: 'list',
        element: (
          <RouteWithPermission
            component={ListPaddock}
            permission={ACCESS_PADDOCK}
          />
        ),
      },

      {
        path: 'add',
        element: (
          <RouteWithPermission
            component={AddPaddock}
            permission={CREATE_PADDOCK}
          />
        ),
      },

      {
        path: 'edit/:id',
        element: (
          <RouteWithPermission
            component={EditPaddock}
            permission={UPDATE_PADDOCK}
          />
        ),
      },

      {
        path: 'view/:id',
        element: (
          <RouteWithPermission
            component={ViewPaddock}
            permission={READ_PADDOCK}
          />
        ),
      },
    ],
  },
  // referrers routes
  {
    path: 'referrers',
    children: [
      {
        path: 'list',
        element: (
          <RouteWithPermission
            component={ListReferrer}
            permission={ACCESS_REFERRER}
          />
        ),
      },
      {
        path: 'add',
        element: (
          <RouteWithPermission
            component={AddReferrer}
            permission={CREATE_REFERRER}
          />
        ),
      },

      {
        path: 'view/:id',
        element: (
          <RouteWithPermission
            component={ViewReferrer}
            permission={READ_REFERRER}
          />
        ),
      },

      {
        path: 'edit/:id',
        element: (
          <RouteWithPermission
            component={EditReferrer}
            permission={UPDATE_REFERRER}
          />
        ),
      },
    ],
  },
  // sales routes
  {
    path: 'sales',
    children: [
      {
        path: 'list',
        element: (
          <RouteWithPermission component={ListSale} permission={ACCESS_SALE} />
        ),
      },

      {
        path: 'add',
        element: (
          <RouteWithPermission component={AddSale} permission={CREATE_SALE} />
        ),
      },
      {
        path: 'edit/:id',
        element: (
          <RouteWithPermission component={EditSale} permission={UPDATE_SALE} />
        ),
      },
    ],
  },

  {
    path: 'payments',
    children: [
      {
        path: 'list',
        element: (
          <RouteWithPermission
            component={ListPayment}
            permission={ACCESS_PAYMENT}
          />
        ),
      },
      {
        path: 'add',
        element: (
          <RouteWithPermission
            component={AddPayment}
            permission={CREATE_PAYMENT}
          />
        ),
      },

      {
        path: 'edit/:id',
        element: (
          <RouteWithPermission
            component={EditPayment}
            permission={UPDATE_PAYMENT}
          />
        ),
      },
    ],
  },

  {
    path: 'logs',
    element: (
      <RouteWithPermission
        component={ListActivityLogs}
        permission={ACCESS_LOG}
      />
    ),
  },

  {
    path: 'transport-emissions/list',
    element: (
      <RouteWithPermission
        component={ListTransportEmission}
        permission={ACCESS_TRANSPORT_EMISSION}
      />
    ),
  },
  {
    path: 'roles/list',
    element: (
      <RouteWithPermission component={ListRole} permission={ACCESS_ROLE} />
    ),
  },
  {
    path: 'health-check/sites',
    element: (
      <RouteWithPermission
        component={HealthCheckSites}
        permission={ACCESS_HEALTH_CHECK}
      />
    ),
  },

  // users routes
  {
    path: 'users',
    children: [
      {
        path: 'list',
        element: (
          <RouteWithPermission component={ListUser} permission={ACCESS_USER} />
        ),
      },
      {
        path: 'view/:id',
        element: (
          <RouteWithPermission component={ViewUser} permission={READ_USER} />
        ),
      },
      {
        path: 'reset-password/:id',
        element: (
          <RouteWithPermission
            component={AdminPasswordReset}
            permission={RESET_USER_PASSWORD}
          />
        ),
      },
    ],
  },

  // udose sites routes
  {
    path: 'udose-sites',
    children: [
      {
        path: 'map',
        element: <RouteWithPermission component={SiteMapView} />,
      },
      {
        path: 'voltage-summary/:id',
        element: (
          <RouteWithPermission component={Voltage} permission={READ_UDOSE} />
        ),
      },
      {
        path: 'conductivity-summary/:id',
        element: (
          <RouteWithPermission
            component={Conductivity}
            permission={READ_UDOSE}
          />
        ),
      },
      {
        path: 'nutrient-usage-summary/:id',
        element: (
          <RouteWithPermission
            component={NutrientUsage}
            permission={READ_UDOSE}
          />
        ),
      },
      {
        path: 'water-nutrient-summary/:id',
        element: (
          <RouteWithPermission
            component={WaterNutrient}
            permission={READ_UDOSE}
          />
        ),
      },

      {
        path: 'list',
        element: (
          <RouteWithPermission
            component={ListUdose}
            permission={ACCESS_UDOSE}
          />
        ),
      },
      {
        path: 'view/:id',
        element: (
          <RouteWithPermission
            component={ViewUdoseSite}
            permission={READ_UDOSE}
          />
        ),
      },
    ],
  },
  // ubot sites routes
  {
    path: 'ubot-sites',
    children: [
      {
        path: 'list',
        element: (
          <RouteWithPermission
            component={ListUbotSites}
            permission={ACCESS_UBOT}
          />
        ),
      },
      {
        path: 'add',
        element: (
          <RouteWithPermission
            component={AddUbotSite}
            permission={CREATE_UBOT}
          />
        ),
      },
      {
        path: 'edit/:id',
        element: (
          <RouteWithPermission
            component={EditUbotSite}
            permission={UPDATE_UBOT}
          />
        ),
      },
      {
        path: 'view/:id',
        element: (
          <RouteWithPermission
            component={ViewUbotSite}
            permission={READ_UBOT}
          />
        ),
      },
    ],
  },
  // udose ags routes
  {
    path: 'udose-ags',
    children: [
      {
        path: 'list',
        element: (
          <RouteWithPermission
            component={UdoseAgs}
            permission={ACCESS_UDOSE_AG}
          />
        ),
      },
      {
        path: 'add',
        element: (
          <RouteWithPermission
            component={AddUdoseAg}
            permission={CREATE_UDOSE_AG}
          />
        ),
      },
      {
        path: 'view/:id',
        element: (
          <RouteWithPermission
            component={ViewUdoseAg}
            permission={READ_UDOSE_AG}
          />
        ),
      },
      {
        path: 'edit/:id',
        element: (
          <RouteWithPermission
            component={EditUdoseAg}
            permission={UPDATE_UDOSE_AG}
          />
        ),
      },
      {
        path: ':id/daily-messages',
        element: (
          <RouteWithPermission
            component={ListUdoseAgMessage}
            permission={ACCESS_UDOSE_AG_MESSAGE}
          />
        ),
      },
    ],
  },

  {
    path: '/udose-ag-session-summaries/:id',
    element: (
      <RouteWithPermission
        component={ViewSessionDetail}
        permission={READ_UDOSE_AG}
      />
    ),
  },

  {
    path: '/export-report',
    element: (
      <RouteWithPermission
        component={ExportReport}
        permission={ACCESS_REPORT}
      />
    ),
  },
  // lab samples routes
  {
    path: 'lab-samples',
    children: [
      {
        path: 'list',
        element: (
          <RouteWithPermission
            component={ListLabSample}
            permission={ACCESS_LAB_SAMPLE}
          />
        ),
      },
      // {
      //   path: 'add',
      //   element: (
      //     <RouteWithPermission
      //       component={AddLabSample}
      //       permission={CREATE_LAB_SAMPLE}
      //     />
      //   ),
      // },
      {
        path: 'edit/:id',
        element: (
          <RouteWithPermission
            component={EditLabSample}
            permission={UPDATE_LAB_SAMPLE}
          />
        ),
      },
      {
        path: 'view/:id',
        element: (
          <RouteWithPermission
            component={ViewLabSample}
            permission={READ_LAB_SAMPLE}
          />
        ),
      },
    ],
  },
  // lab test results routes
  {
    path: 'lab-test-results',
    children: [
      {
        path: 'add/:id',
        element: (
          <RouteWithPermission
            component={AddLabTestResult}
            permission={CREATE_LAB_TEST_RESULT}
          />
        ),
      },
      {
        path: 'edit/:id',
        element: (
          <RouteWithPermission
            component={EditLabTestResult}
            permission={UPDATE_LAB_TEST_RESULT}
          />
        ),
      },
    ],
  },
  // lab reports routes
  {
    path: 'lab-reports',
    children: [
      {
        path: 'add',
        element: (
          <RouteWithPermission
            component={AddLabReport}
            permission={CREATE_LAB_REPORT}
          />
        ),
      },
      {
        path: 'list',
        element: (
          <RouteWithPermission
            component={ListLabReport}
            permission={ACCESS_LAB_REPORT}
          />
        ),
      },
      {
        path: 'view/:id',
        element: (
          <RouteWithPermission
            component={ViewLabReport}
            permission={READ_LAB_REPORT}
          />
        ),
      },
      {
        path: 'edit/:id',
        element: (
          <RouteWithPermission
            component={EditLabReport}
            permission={UPDATE_LAB_REPORT}
          />
        ),
      },
    ],
  },
  // Lab results routes
  {
    path: 'lab-results',
    children: [
      {
        path: 'list',
        element: (
          <RouteWithPermission
            component={PublishedLabResultList}
            permission={READ_PUBLISHED_LAB_REPORT}
          />
        ),
      },
      {
        path: 'view/:id',
        element: (
          <RouteWithPermission
            component={LabResultDetail}
            permission={READ_PUBLISHED_LAB_REPORT}
          />
        ),
      },
    ],
  },
  // news routes
  {
    path: 'news',
    children: [
      {
        path: 'list',
        element: (
          <RouteWithPermission component={ListNews} permission={ACCESS_NEWS} />
        ),
      },
      {
        path: 'add',
        element: (
          <RouteWithPermission component={AddNews} permission={CREATE_NEWS} />
        ),
      },
      {
        path: 'view/:id',
        element: (
          <RouteWithPermission component={ViewNews} permission={READ_NEWS} />
        ),
      },
      {
        path: 'edit/:id',
        element: (
          <RouteWithPermission component={EditNews} permission={UPDATE_NEWS} />
        ),
      },
    ],
  },
  // tags route
  {
    path: '/tags/list',
    element: (
      <RouteWithPermission component={ListTag} permission={ACCESS_TAG} />
    ),
  },
  // supplements routes
  {
    path: 'supplements',
    children: [
      {
        path: 'list',
        element: (
          <RouteWithPermission
            component={ListSupplement}
            permission={ACCESS_SUPPLEMENT}
          />
        ),
      },
      {
        path: 'add',
        element: (
          <RouteWithPermission
            component={AddSupplement}
            permission={CREATE_SUPPLEMENT}
          />
        ),
      },
      {
        path: 'edit/:id',
        element: (
          <RouteWithPermission
            component={EditSupplement}
            permission={UPDATE_SUPPLEMENT}
          />
        ),
      },
    ],
  },
  // nutrients routes
  {
    path: '/supplement-nutrients/list',
    element: (
      <RouteWithPermission
        component={SupplementNutrientList}
        permission={ACCESS_SUPPLEMENT_NUTRIENT}
      />
    ),
  },
  // crops routes
  {
    path: 'crops',
    children: [
      {
        path: 'list',
        element: (
          <RouteWithPermission component={ListCrop} permission={ACCESS_CROP} />
        ),
      },
      {
        path: 'add',
        element: (
          <RouteWithPermission component={AddCrop} permission={CREATE_CROP} />
        ),
      },
      {
        path: 'edit/:id',
        element: (
          <RouteWithPermission component={EditCrop} permission={UPDATE_CROP} />
        ),
      },
    ],
  },
  // crop cycles routes
  {
    path: 'crop-cycles',
    children: [
      {
        path: 'list',
        element: (
          <RouteWithPermission
            component={ViewCropCycle}
            permission={ACCESS_CROP_LIFE_CYCLE}
          />
        ),
      },

      {
        path: 'add',
        element: (
          <RouteWithPermission
            component={AddCropCycle}
            permission={CREATE_CROP_LIFE_CYCLE}
          />
        ),
      },

      {
        path: 'edit/:id',
        element: (
          <RouteWithPermission
            component={EditCropCycle}
            permission={UPDATE_CROP_LIFE_CYCLE}
          />
        ),
      },
    ],
  },
  // fertilizers routes
  {
    path: 'fertilizers',
    children: [
      {
        path: 'list',
        element: (
          <RouteWithPermission
            component={ListFertilizer}
            permission={READ_FERTILIZER}
          />
        ),
      },
      {
        path: 'add',
        element: (
          <RouteWithPermission
            component={AddFertilizer}
            permission={CREATE_FERTILIZER}
          />
        ),
      },

      {
        path: 'edit/:id',
        element: (
          <RouteWithPermission
            component={EditFertilizer}
            permission={UPDATE_FERTILIZER}
          />
        ),
      },
    ],
  },
  // email logs route
  {
    path: '/email-logs',
    element: (
      <RouteWithPermission
        component={ListEmailLogs}
        permission={ACCESS_EMAIL_LOGS}
      />
    ),
  },
  // notes routes
  {
    path: '/notes/list',
    element: (
      <RouteWithPermission
        component={Notes}
        permission={[
          READ_NOTE_DEVICE_MAINTENANCE,
          READ_NOTE_SUPPLEMENT_DELIVERIES,
        ]}
      />
    ),
  },
  {
    path: '/maintenance-notes/view/:id',
    element: (
      <RouteWithPermission
        component={ViewMaintenanceNote}
        permission={READ_NOTE_DEVICE_MAINTENANCE}
      />
    ),
  },
  {
    path: '/supplement-delivery/view/:id',
    element: (
      <RouteWithPermission
        component={ViewSupplementDeliveryNote}
        permission={READ_NOTE_SUPPLEMENT_DELIVERIES}
      />
    ),
  },
  // alarm routes
  {
    path: 'alarm',
    children: [
      {
        path: 'list',
        element: (
          <RouteWithPermission
            component={ListAlarm}
            permission={ACCESS_ALARM}
          />
        ),
      },
      {
        path: 'view/:id',
        element: (
          <RouteWithPermission component={ViewAlarm} permission={READ_ALARM} />
        ),
      },
      {
        path: 'add',
        element: (
          <RouteWithPermission
            component={CreateAlarm}
            permission={CREATE_ALARM}
          />
        ),
      },
      {
        path: 'edit/:id',
        element: (
          <RouteWithPermission
            component={UpdateAlarm}
            permission={UPDATE_ALARM}
          />
        ),
      },
    ],
  },

  {
    path: 'carbon-accounting',
    element: (
      <RouteWithPermission
        component={CarbonAccounting}
        permission={ACCESS_CARBON_ACCOUNTING}
      />
    ),
  },

  {
    path: '/account/settings',
    element: (
      <RouteWithPermission component={Settings} permission={ACCESS_SETTINGS} />
    ),
  },
];

export default UHUB_ROUTES;
