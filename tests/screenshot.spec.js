const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

test('capture and save screenshot', async ({ page }) => {
  // Create screenshots directory if it doesn't exist
  const screenshotDir = path.join(__dirname, '../screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  // Navigate to a test page
  await page.goto('https://playwright.dev');
  
  // Take a screenshot and save it with timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const screenshotPath = path.join(screenshotDir, `test-screenshot-${timestamp}.png`);
  
  await page.screenshot({
    path: screenshotPath,
    fullPage: true
  });

  // Verify the screenshot was saved
  expect(fs.existsSync(screenshotPath)).toBeTruthy();
});