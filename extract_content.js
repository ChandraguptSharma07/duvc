const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({
        channel: 'msedge'  // Use Microsoft Edge
    });
    const page = await browser.newPage();
    await page.goto('https://mathscifound.org/', {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    });

    // Wait for content to load
    await page.waitForTimeout(3000);

    // Extract all text content
    const content = await page.evaluate(() => {
        return document.body.innerText;
    });

    console.log(content);
    await browser.close();
})();
