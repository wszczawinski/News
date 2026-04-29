/// <reference types="vite-plus/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_MEDIA_URL: string;
  readonly VITE_SENTRY_DSN: string;
  readonly VITE_ANALYTICS_URL: string;
  readonly VITE_ANALYTICS_WEBSITE_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
