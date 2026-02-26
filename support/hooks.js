const { Before, After, Status } = require('@cucumber/cucumber');
const fs = require('fs-extra');
const path = require('path');

Before(async function () {
    if (this.browserType === 'playwright') {
        await this.initPlaywright();
    } else {
        await this.initSelenium();
    }
});

After(async function (scenario) {
    if (scenario.result.status === Status.FAILED) {
        const screenshotPath = path.join(__dirname, '../reports/screenshots', `${scenario.pickle.name.replace(/ /g, '_')}.png`);
        await fs.ensureDir(path.dirname(screenshotPath));

        if (this.browserType === 'playwright' && this.page) {
            await this.page.screenshot({ path: screenshotPath });
        } else if (this.driver) {
            const screenshot = await this.driver.takeScreenshot();
            await fs.writeFile(screenshotPath, screenshot, 'base64');
        }
        if (this.page || this.driver) {
            console.log(`Screenshot saved to: ${screenshotPath}`);
        }
    }

    if (this.browserType === 'playwright' && this.browser) {
        await this.browser.close();
    } else if (this.driver) {
        await this.driver.quit();
    }
});
