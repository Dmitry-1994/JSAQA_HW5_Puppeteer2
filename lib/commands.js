module.exports = {
    openStartPage: async function (page, URL) {
        try {
            await page.goto(URL);
        } catch (error) {
            throw new Error(`Invalid page URL ${URL}`);
        }
    },

    clickElement: async function (page, seleector) {
        try {
            await page.waitForSelector(seleector, {
                timeout: 2000,
                visible: true
            });
            await page.click(seleector);
        } catch (error) {
            throw new Error(`Invalid selector for click ${seleector}`);
        }
    },

    getText: async function (page, seleector) {
        try {
            await page.waitForSelector(seleector, {
                timeout: 2000,
                visible: true
            });
            return await page.$eval(seleector, link => link.textContent);
        } catch (error) {
            throw new Error(`Text by ${seleector} does not exist`);
        }
    }
};
