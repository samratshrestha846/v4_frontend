const config = {
  API_URL: import.meta.env.VITE_APP_API_URL,
  GEOSERVER_URL: import.meta.env.VITE_APP_GEOSERVER_URL,
  BING_MAPS_KEY: import.meta.env.VITE_APP_BING_MAPS_KEY,
  CIBOLAB_URL: import.meta.env.VITE_APP_CIBOLAB_API_URL,
  GA_TRACKING_ID: import.meta.env.VITE_APP_GOOGLE_ANALYTICS_TRACKING_ID,
  APP_ENV: import.meta.env.VITE_APP_ENV,
  DIT_CONNECT_API_URL: import.meta.env.VITE_APP_DIT_CONNECT_API_URL,
  NEVILLE_BASE_DOMAIN: import.meta.env.VITE_APP_NEVILLE_BASE_DOMAIN,
  NEVILLE_URL: import.meta.env.VITE_APP_NEVILLE_URL,
};

export default config;
