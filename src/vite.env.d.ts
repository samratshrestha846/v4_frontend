/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_API_URL: string;
  readonly VITE_APP_GEOSERVER_URL: string;
  readonly VITE_APP_BING_MAPS_KEY: string;
  readonly VITE_APP_CIBOLAB_API_URL: string;
  readonly VITE_APP_GOOGLE_ANALYTICS_TRACKING_ID: string;
  readonly VITE_APP_ENV: string;
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
