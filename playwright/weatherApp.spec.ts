/* import { test, expect } from '@playwright/test';

// 1. Kontrollib, kas otsing töötab ja tulemused kuvatakse
test('Search component should display results when searching', async ({ page }) => {
  await page.goto('http://localhost:5173');

  const searchInput = page.getByTestId('weather-search');
  const searchButton = page.getByTestId('search-button');
  
  await searchInput.fill('Tallinn');
  await searchButton.click();

  const resultItem = page.locator('[data-testid="city-item"]:first-child'); // Selects the first element
  await expect(resultItem).toBeVisible();
});

// 2. Kontrollib, kas linnale klikkimine valib selle õigesti
test('Selecting a city from search results triggers selection', async ({ page }) => {
  await page.goto('http://localhost:5173');

  await page.getByTestId('weather-search').fill('Tallinn');
  await page.getByTestId('search-button').click();

  const cityItem = page.locator('[data-testid="city-item"]:first-child'); // Selects the first element
  await cityItem.click();

  // Kontrollime, kas `WeatherCard` sai õige linna andmed
  const weatherContainer = page.getByTestId('wethr-cont');
  await expect(weatherContainer).toBeVisible();
});

// 3. Kontrollib, kas ilmaprognoosi andmed kuvatakse õigesti
test('WeatherCard displays correct weather data', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // Simuleerime valitud linna, eeldades, et API tagastab andmed
  await page.getByTestId('weather-search').fill('Tallinn');
  await page.getByTestId('search-button').click();
  const cityItem = page.locator('[data-testid="city-item"]:first-child'); // Selects the first element
  await cityItem.click();

  // Kontrollime, kas temperatuur ja ilma tüüp kuvatakse
  await expect(page.getByTestId('temperature')).toBeVisible();
  await expect(page.getByTestId('weather-type')).toBeVisible();
});
 */