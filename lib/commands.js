module.exports = {
    openStartPage: async function (page, URL) {
        try {
            await page.goto(URL);
        } catch (error) {
            throw new Error(`Invalid page URL ${URL}`);
        }
    },

    clickElement: async function (page, selector) {
        try {
            await page.waitForSelector(selector, {
                timeout: 7000,
                visible: true
            });
            await page.click(selector);
        } catch (error) {
            throw new Error(`Invalid selector for click ${selector}`);
        }
    },

    getText: async function (page, selector) {
        try {
            await page.waitForSelector(selector, {
                timeout: 5000,
                visible: true
            });
            return await page.$eval(selector, link => link.textContent);
        } catch (error) {
            throw new Error(`Text by ${selector} does not exist`);
        }
    }
};
