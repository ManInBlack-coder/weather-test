import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'http://localhost:5173', // Muuda vastavalt oma arenduskeskkonnale
    browserName: 'chromium',
    headless: false, // Muuda true, kui tahad vaikimisi peidetud režiimi
  },
});
