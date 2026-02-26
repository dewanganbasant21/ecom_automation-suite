const { setWorldConstructor, World } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

class CustomWorld extends World {
    constructor(options) {
        super(options);
        this.browserType = process.env.BROWSER_TYPE || 'playwright';
        this.driver = null;
        this.context = null;
        this.page = null;
    }

    async initPlaywright() {
        this.browser = await chromium.launch({ headless: true });
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();
    }

    async initSelenium() {
        let options = new chrome.Options();
        options.addArguments('--headless');
        this.driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
    }

    // Unified helper methods
    async navigate(url) {
        if (this.browserType === 'playwright') {
            await this.page.goto(url);
        } else {
            await this.driver.get(url);
        }
    }

    async click(selector) {
        if (this.browserType === 'playwright') {
            await this.page.click(selector);
        } else {
            const element = await this.driver.wait(until.elementLocated(By.css(selector)), 5000);
            await element.click();
        }
    }

    async getText(selector) {
        if (this.browserType === 'playwright') {
            return await this.page.textContent(selector);
        } else {
            const element = await this.driver.wait(until.elementLocated(By.css(selector)), 5000);
            return await element.getText();
        }
    }

    async isVisible(selector) {
        if (this.browserType === 'playwright') {
            return await this.page.isVisible(selector);
        } else {
            try {
                const element = await this.driver.wait(until.elementLocated(By.css(selector)), 2000);
                return await element.isDisplayed();
            } catch (e) {
                return false;
            }
        }
    }
}

setWorldConstructor(CustomWorld);
