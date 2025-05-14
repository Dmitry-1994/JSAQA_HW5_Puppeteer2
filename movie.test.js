const { openStartPage, clickElement, getText } = require("./lib/commands.js");
let page;

//Data
const dashBoardPage = "https://qamid.tmweb.ru/client/index.php";
const locatorChoiceOfDay = "a:nth-child(2)";
const locatorChoiceHall = "[data-seance-id='217']";
const locatorFirstFreeSeat =
    ".buying-scheme__chair.buying-scheme__chair_standart:not(.buying-scheme__chair_taken)";

const locatorButtonOfRezrv = ".acceptin-button";
const locatorTextOfRezerv = ".ticket__check-title";

beforeEach(async () => {
    page = await browser.newPage();
    //await page.setDefaultTimeout(30000);
    await openStartPage(page, dashBoardPage);
});

afterEach(() => {
    page.close();
});

describe("Happy path movie test", () => {
    test("Rezerv standard seat", async () => {
        await clickElement(page, locatorChoiceOfDay);

        await clickElement(page, locatorChoiceHall);

        await clickElement(page, locatorFirstFreeSeat);

        await clickElement(page, locatorButtonOfRezrv);

        const actual = await getText(page, locatorTextOfRezerv);
        const expected = "Вы выбрали билеты:";

        //Без кастомных команд (открытие)
        // await page.waitForSelector(locatorChoiceOfDay, { visible: true });
        // await page.click(locatorChoiceOfDay);

        // await page.waitForSelector(locatorChoiceHall, { visible: true });
        // await page.click(locatorChoiceHall);

        // await page.waitForSelector(locatorFirstFreeSeat, { visible: true });
        // await page.click(locatorFirstFreeSeat);

        // await page.waitForSelector(locatorButtonOfRezrv, { visible: true });
        // await page.click(locatorButtonOfRezrv);

        // await page.waitForSelector(locatorTextOfRezerv, { visible: true });

        // const actual = await page.$eval(
        //     locatorTextOfRezerv,
        //     link => link.textContent
        // );
        // const expected = "Вы выбрали билеты:";
        //Без кастомных команд (закрытие)

        expect(actual).toContain(expected);
    }, 60000);

    //test("Rezerv VIP seat", async () => {}, 1000);
});
