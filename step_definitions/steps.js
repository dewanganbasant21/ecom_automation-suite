const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';

Given('I navigate to the e-commerce website', { timeout: 30000 }, async function () {
    await this.navigate(BASE_URL);
});

When('I add {string} to the cart', { timeout: 30000 }, async function (productName) {
    // We use the product ID in the selector as defined in App.jsx
    // In a real scenario, we might search for the product by text
    // For this demo, we'll map product names to IDs
    const productMap = {
        'Quantum Watch': '1',
        'Nebula Sounds': '2',
        'Nova Camera': '3',
        'Lumina Lamp': '4'
    };
    const productId = productMap[productName];
    await this.click(`#add-to-cart-${productId}`);
});

Then('the cart should contain {int} item', { timeout: 30000 }, async function (count) {
    const text = await this.getText('#nav-cart');
    expect(text).to.contain(`Cart (${count})`);
});

Then('the cart should contain {int} items', { timeout: 30000 }, async function (count) {
    const text = await this.getText('#nav-cart');
    expect(text).to.contain(`Cart (${count})`);
});

When('I navigate to the cart page', { timeout: 30000 }, async function () {
    await this.click('#nav-cart');
});

Then('I should see {string} in the cart', { timeout: 30000 }, async function (productName) {
    const text = await this.getText('#cart-list');
    expect(text).to.contain(productName);
});

When('I navigate to the components page', { timeout: 30000 }, async function () {
    await this.click('#nav-components');
});

When('I expand the first accordion', { timeout: 30000 }, async function () {
    await this.click('#accordion-header-1');
});

Then('I should see the accordion content', { timeout: 30000 }, async function () {
    const isVisible = await this.isVisible('#accordion-content-1');
    expect(isVisible).to.be.true;
});

When('I open the system configuration modal', { timeout: 30000 }, async function () {
    await this.click('#open-modal-btn');
});

Then('I should see the modal content', { timeout: 30000 }, async function () {
    const isVisible = await this.isVisible('#modal-content');
    expect(isVisible).to.be.true;
});

When('I close the modal', { timeout: 30000 }, async function () {
    await this.click('#modal-close-btn');
});

Then('the modal should be closed', { timeout: 30000 }, async function () {
    const isVisible = await this.isVisible('#modal-content');
    expect(isVisible).to.be.false;
});

// New Authentication Steps
When('I navigate to the login page', { timeout: 30000 }, async function () {
    await this.click('#header-login-btn');
});

When('I click on "Register"', { timeout: 30000 }, async function () {
    // We'll use a more specific selector or click by text
    if (this.browserType === 'playwright') {
        await this.page.click('text=Register');
    } else {
        const link = await this.driver.findElement({ linkText: 'Register' });
        await link.click();
    }
});

// Added missing navigation steps
When('I navigate to the home page', { timeout: 30000 }, async function () {
    await this.click('#nav-home');
});

When('I navigate back to the components page', { timeout: 30000 }, async function () {
    await this.click('#nav-components');
});

When('I register with name {string}, email {string}, and password {string}', { timeout: 30000 }, async function (name, email, password) {
    if (this.browserType === 'playwright') {
        await this.page.fill('#register-name', name);
        await this.page.fill('#register-email', email);
        await this.page.fill('#register-password', password);
    } else {
        await this.driver.findElement({ css: '#register-name' }).sendKeys(name);
        await this.driver.findElement({ css: '#register-email' }).sendKeys(email);
        await this.driver.findElement({ css: '#register-password' }).sendKeys(password);
    }
    await this.click('#register-submit');
});

Then('I should be logged in as {string}', { timeout: 30000 }, async function (expectedName) {
    const text = await this.getText('#user-display');
    expect(text.toLowerCase()).to.contain(expectedName.toLowerCase());
});

When('I logout', { timeout: 30000 }, async function () {
    await this.click('#logout-btn');
});

Then('I should see the login button', { timeout: 30000 }, async function () {
    const isVisible = await this.isVisible('#header-login-btn');
    expect(isVisible).to.be.true;
});

When('I login with email {string} and password {string}', { timeout: 30000 }, async function (email, password) {
    if (this.browserType === 'playwright') {
        await this.page.fill('#login-email', email);
        await this.page.fill('#login-password', password);
    } else {
        await this.driver.findElement({ css: '#login-email' }).sendKeys(email);
        await this.driver.findElement({ css: '#login-password' }).sendKeys(password);
    }
    await this.click('#login-submit');
});

// New UX Steps
Then('I should see the {string} confirmation', { timeout: 30000 }, async function (text) {
    let content;
    if (this.browserType === 'playwright') {
        content = await this.page.textContent('#post-add-to-cart-overlay');
    } else {
        content = await this.driver.findElement({ css: '#post-add-to-cart-overlay' }).getText();
    }
    expect(content).to.contain(text);
});

When('I click on text {string}', { timeout: 30000 }, async function (btnText) {
    if (this.browserType === 'playwright') {
        await this.page.click(`text=${btnText}`);
    } else {
        // Basic text search for Selenium
        const btns = await this.driver.findElements({ tagName: 'button' });
        for (const btn of btns) {
            const t = await btn.getText();
            if (t.includes(btnText)) {
                await btn.click();
                return;
            }
        }
        const links = await this.driver.findElements({ tagName: 'a' });
        for (const link of links) {
            const t = await link.getText();
            if (t.includes(btnText)) {
                await link.click();
                return;
            }
        }
    }
});

Then('the accordion content should still be visible', { timeout: 30000 }, async function () {
    const isVisible = await this.isVisible('#accordion-content-1');
    expect(isVisible).to.be.true;
});

Then('I should see {string} items in the cart', { timeout: 30000 }, async function (count) {
    const text = await this.getText('#nav-cart');
    expect(text).to.contain(`Cart (${count})`);
});
