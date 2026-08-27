import {test,expect} from '@playwright/test'

let appReady = false;

test.describe('02-navigation-system', () => {
  test.beforeEach(async ({ page }) => {
    const navTimeout = appReady ? 30_000 : 120_000;

    await page.goto('/', {
      waitUntil: 'domcontentloaded',
      timeout: navTimeout,
    });

    await page
      .getByTestId('home-screen')
      .waitFor({
        state: 'visible',
        timeout: navTimeout,
      });

    appReady = true;
  });

  test('renders home screen', async ({ page }) => {
    await expect(
      page.getByTestId('home-screen')
    ).toBeVisible();
  });

  test('navigates to profile details with username', async ({ page }) => {
    await page
      .getByTestId('view-profile-button')
      .click();

    await expect(
      page.getByText("Rayden's Profile")
    ).toBeVisible();

    await expect(
      page.getByText('@Rayden')
    ).toBeVisible();
  });

  test('renders bottom navigation tabs', async ({ page }) => {
    await expect(
      page.getByText('Home')
    ).toBeVisible();

    await expect(
      page.getByText('Search')
    ).toBeVisible();

    await expect(
      page.getByText('Profile')
    ).toBeVisible();
  });

  test('can switch between tabs', async ({ page }) => {
    await page.getByText('Search').click();

    await expect(
      page.getByText('Search')
    ).toBeVisible();

    await page.getByText('Profile').click();

    await expect(
      page.getByText('Profile')
    ).toBeVisible();

    await page.getByText('Home').click();

    await expect(
      page.getByTestId('home-screen')
    ).toBeVisible();
  });
});