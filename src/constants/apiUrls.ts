export const CUSTOMERS = 'customers';

export const CUSTOMER_DASHBOARD_COUNTS = '/customer/dashboard/counts';

export const CUSTOMER_COST_NUTRIENT_ANALYTICS =
  '/customer/dashboard/cost-nutrient-analytics';

export const CUSTOMER_PROPERTIES = 'customer-properties';

export const REGIONS = 'regions';

export const USERS = 'users';
export const USERS_DROPDOWN = '/dropdown/users';

export const CHANGE_PASSWORD = 'change-password';

export const RESET_PASSWORD = 'users/:id/password/reset';

export const ROLES = 'roles';

export const PERMISSIONS_BY_ROLE = 'roles/:id/permissions';

export const DASHBOARD_KPIS_COUNT = 'kpis/dashboard/counts';

export const DASHBOARD_KPIS_UDOSE_SITE = 'kpis/dashboard/udose-sites';

export const DASHBOARD = 'dashboard';

export const REFERRERS = 'referrers';

export const REFERRER_KPI_CUSTOMER_COUNT = 'kpi/referrers/:id/customer-counts';

export const SALES = 'sales';

export const CUSTOMERS_BY_REFERRER_ID = 'referrers/:id/customers';

export const GET_SALES_BY_REFERRER_ID = 'referrers/:id/sales';

export const GET_PAYMENTS_BY_REFERRER_ID = 'referrers/:id/payments';

export const PAYMENTS = 'payments';

export const LAB_SAMPLES = 'lab-samples';

export const UPDATE_LAB_SAMPLE = 'lab-samples/:id';

export const LAB_SAMPLE_TYPES = 'lab-sample-types';

export const LAB_TEST_RESULTS = 'lab-test-results';

export const LAB_TEST_PARAMS = 'lab-test-params';

export const CREDIT_TYPES = 'credit-types';

export const EXPORT_UDOSE_REPORT = 'reports/udose';

export const EXPORT_UDOSE_REPORT_CHECK_PROGRESS = 'batches/:id/progresses';

export const SUPPLEMENTS = 'supplements';

export const EXPORT_DEVICE_NEW_INSTALLED_REPORT =
  'export/devices/fresh-installations';

export const EXPORT_DEVICE_SWAPPED_REPORT = 'export/devices/swap-overs';

export const PERMISSIONS = 'permissions';

export const USER_EXPLICIT_PERMISSIONS = 'permissions/users/explicit';

export const EXPORT_LAB_TEST_REPORT = 'export/lab-test-results';

export const EXPORT_UDOSE_LIST = 'export/udose-lists';

export const DEVICES = 'devices';

export const DEVICE_COUNTS_BY_STOCKTYPE = 'device-counts';

export const DEVICE_CONFIGURATIONS = 'device-configurations';

export const STOCK_TYPES = 'stock-types';

export const TAGS = 'tags';

export const UPDATE_DEVICE_STOCK_TYPE = 'devices/:id/stock-types';

export const UPDATE_DOSER_USAGES = 'doser-usages/:id';

export const EXPORT_DEVICE_REPORT = 'export/devices';

export const CONFIGURATION_SETTINGS = 'configuration-sets';

export const UDOSE_SITES = 'udose-sites';

export const UDOSE_SITES_FOLLOWUP = 'udose-sites/:id/site-follow-ups';

export const SITES_FOLLOWUP = '/site-follow-ups';

export const UPDATE_DEVICE_SETTINGS = 'sites/:id/update-device-settings';

export const READ_HEALTH_CHECK = 'udose-sites/:id/health-checks';

export const LOGS = 'logs';

export const SUPPLEMENTS_USAGE_SUMMARY =
  'udose-sites/:id/supplement-usage-summary';

export const NUTRIENT_CALCULATOR = '/nutrient-calculators';

export const UDOSE_RECORD_SUMMARY = '/udose-sites/:id/udose-record-summary';

export const UDOSE_RECORD_SETTINGS = '/udose-sites/:id/udose-record-settings';

export const UDOSE_SITE_SUPPLEMENTS = '/udose-sites/:id/supplements';

export const CARBON_CREDITS = '/sites/:id/carbon-credits';

export const SUPPLEMENT_FEED_ANALYSIS = '/supplement-feed-analysis';

export const SITE_ACTIVITIES = '/site-activities';

export const SITE_ALARMS = '/sites/:id/alarms';

export const SITE_RAINFALL = 'sites/:id/rainfall';

export const SITE_TWENTY_FOUR_HOUR_USAGE = '/sites/:id/twenty-four-hour-usage';

export const SITE_HEALTH_CHECK_SETTINGS =
  'udose-sites/:id/health-check-settings';

export const UDOSE_STOP_REASONS = 'udose-stop-reasons';

export const EXPORT_UDOSE_STOP_REASONS = '/export/udose-stop-reasons';

export const UBOT_SITES = 'ubot-sites';

export const UBOT_RECORD_SUMMARY = 'ubot-sites/:id/ubot-record-summary';

export const UBOT_CUMULATIVE_RAINFALL = 'ubot-sites/:id/cumulative-rainfalls';

export const UBOT_HOURLY_RAINFALL = 'ubot-sites/:id/hourly-rainfalls';

export const SITES = 'sites/dashboard';

export const GET_METHANE_REDUCERS_NUTRIENTS =
  'supplement-nutrients/methane-reducers';

export const GET_NON_METHANE_REDUCERS_NUTRIENTS =
  'supplement-nutrients/non-methane-reducers';
export const SUPPLEMENT_NUTRIENTS = 'supplement-nutrients';

export const UDOSE_DAILY_SUMMARY = 'udose-sites/:id/daily-summary';

// full graphs api routes

export const UDOSE_RECORD_HOURS = 'udose-sites/:id/udose-record-hours';

export const UDOSE_NUTRIENT_USAGE = 'udose-sites/:id/nutrient-usage';

export const UDOSE_BATTERY_SOLAR_VOLTAGE =
  'udose-sites/:id/battery-solar-voltage';

export const UDOSE_CONDUCTIVITY = 'udose-sites/:id/conductivity';

export const PUBLISHED_LAB_SAMPLES = 'published-lab-samples';

export const CERESTAG_LOGIN = 'cerestag/login';

export const SITE_HEALTH_CHECK_SUMMARY = 'health-checks/summary';

export const UDOSE_AGS = 'udose-ags';

export const CERESTAG_OBSERVATIONS = 'ceres-tag-observations';

export const CERESTAGS_BY_CUSTOMER_PROPERT_ID =
  'customer-properties/:id/ceres-tags';

export const OBSERVATIONS_BY_CERES_TAG = 'ceres-tags/:id/observations';

export const OBSERVATIONS_HISTORY_BY_CERES_TAG =
  'ceres-tags/:id/observation-histories';

export const CERES_TAG_ALERTS = 'ceres-tags/:id/alerts';

export const CERES_TAGS = 'ceres-tags';

export const CERES_TAG_OBSERVATIONS = 'ceres-tag-observations';

export const CERES_TAG_PFI_DAILY_SUMMARY =
  'ceres-tags/:id/pfi-daily-summary-histograms';

export const CERES_TAG_HERD_PFI_DAILY_SUMMARY =
  'ceres-tags/:id/herd-pfi-daily-summaries';

export const CERES_TAG_REQUEST_HISTORICAL_DATA =
  'ceres-tags/:id/history-retrievals';

export const CERES_TAG_UPDATE_ANIMAL = 'ceres-tags/:id/animal-updates';

export const CERES_TAG_UPDATE_SETTING =
  'customer-properties/:id/ceres-tag-settings';

export const DOWNLOAD_LAB_REPORT = 'lab-reports/:id/downloads';

export const PUBLISHED_LAB_REPORTS = 'lab-reports/published';

export const PUBLISHED_LAB_REPORT_DETAIL = 'lab-reports/:id/published';

export const UNREAD_LAB_REPORT_NOTIFICATION =
  '/lab-reports/unread-notification';

export const PADDOCKS = 'paddocks';

export const BLOCKS_BY_PADDOCK = 'paddocks/:id/blocks';

export const SUB_BLOCKS_BY_BLOCK = 'blocks/:id/sub-blocks';

export const BLOCKS = 'blocks';

export const SUB_BLOCKS = 'sub-blocks';

export const CROPABLES_BY_BLOCK = 'blocks/:id/crops';

export const CROPABLES_BY_SUB_BLOCK = 'sub-blocks/:id/crops';

export const CROPABLES = 'cropables';

export const SITE_LOCATIONS = 'customer/site-locations';

export const FILEPATH = '/file-paths';

export const LAB_REPORTS = 'lab-reports';

export const EXPORT_CERES_TAG_OBSERVATIONS =
  'ceres-tags/:id/observations/export';

export const UDOSE_AG_SESSION_SUMMARIES =
  'udose-ags/:id/udose-ag-session-summaries';

export const UDOSE_AG_MESSAGE = 'udose-ags/:id/daily-messages';

export const READ_UDOSE_AG_SESSION_SUMMARY = 'udose-ag-session-summaries/:id';

export const CROPS = '/crops';

export const CROPS_BY_CROP_ID = '/crops/:id';

export const UDOSE_SITE_SERVICE_LOGS = 'udose-sites/:id/service-logs';

export const SERVICE_LOGS = 'service-logs';

export const CROP_LIFE_CYCLES = '/crop-life-cycles';

export const CROP_LIFE_CYCLE_BY_ID = '/crop-life-cycles/:id';

export const EXPORT_ASSET_USAGE_REPORT: string = '/export/asset-usage-reports';

export const FERTILIZERS = 'fertilizers';

export const CALCULATE_FEED_ANALYSIS = 'calculate-feed-analysis';

export const DEVICE_LOGS = 'device-logs';

export const ASSIGN_AREA_AND_FERTILIZER_TO_SESSION_RUN =
  '/udose-ag-session-summaries/:id';

export const FERTILIZER_ANALYSIS_BY_SESSION_RUN =
  '/udose-ag-session-summaries/:id/fertilizer-analysis';

export const CUSTOMER_SUBSCRIPTIONS = 'customer-subscriptions';

export const EMAIL_LOGS = '/email-logs';

export const DEVICE_MAINTENANCE_NOTES = '/device-maintenances';

export const SUPPLEMENT_DELIVERIES_NOTE = '/supplement-deliveries';

export const SUPPLEMENT_DELIVERIES_NOTE_BY_ID = '/supplement-deliveries/:id';

export const DIT_USERS = '/dit-users';

export const ALARM_TYPES = '/alarm-types';

export const ALARM_TYPES_BY_ID = '/alarm-types/:id';

// API endpoints - Carbon Accounting

export const CARBON_TOP_PERFORMERS_SITES =
  '/kpis/carbon-credits/top-performers/sites';

export const CARBON_TOP_PERFORMERS_PROPERTIES =
  '/kpis/carbon-credits/top-performers/customer-properties';

export const CARBON_TOP_PERFORMERS_CUSTOMERS =
  '/kpis/carbon-credits/top-performers/customers';

export const CARBON_EMISSION_REDUCTIONS = '/kpis/carbon-emission-reductions';

export const CARBON_EMISSION_REDUCTIONS_SUMMARY = '/kpis/carbon-credits';

export const NOTIFICATION_SETTINGS = '/notification-settings';

export const USER_PREFERENCE_SETTINGS = 'users/:id/user-preferences';

export const NEWS = 'news';

export const WATER_PRESSURE = 'water-pressure';

export const TRANSPORT_EMISSIONS = 'transport-emissions';

// Dropdown endpoints

export const DROPDOWN_PRODUCTS = 'dropdown/products';

export const DROPDOWN_CUSTOMERS = 'dropdown/customers';

export const DROPDOWN_DEVICES = 'dropdown/devices';

export const DROPDOWN_LAB_SAMPLES = 'dropdown/lab-samples';

export const DROPDOWN_LAB_SAMPLE_TYPES = 'dropdown/lab-sample-types';

export const DROPDOWN_REFERRERS = 'dropdown/referrers';

export const DROPDOWN_PROPERTIES = 'dropdown/customer-properties';

export const DROPDOWN_UDOSE_SITES = 'dropdown/udose-sites';

export const DROPDOWN_SUPPLEMENTS = 'dropdown/supplements';

export const DROPDOWN_TAG_TYPES = 'tags/tag-types';
