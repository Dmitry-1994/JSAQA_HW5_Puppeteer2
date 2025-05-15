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
const locatorGetResrvCod = ".acceptin-button";
const locatorTextCheckTicket = ".ticket__check-title";
const locatorChoiceHallVip = "[data-seance-id='225']";
const locatorFirstFreeSeatVip =
    ".buying-scheme__chair.buying-scheme__chair_vip:not(.buying-scheme__chair_taken)";
const locatorFirstBusySeat = ".buying-scheme__chair_taken";

beforeEach(async () => {
    page = await browser.newPage();
    await openStartPage(page, dashBoardPage);
});

afterEach(() => {
    page.close();
});

describe("Happy path movie test", () => {
    const testCases = [
        {
            name: "Standard seat",
            hall: locatorChoiceHall,
            seat: locatorFirstFreeSeat
        },
        {
            name: "VIP seat",
            hall: locatorChoiceHallVip,
            seat: locatorFirstFreeSeatVip
        }
    ];

    test.each(testCases)(
        "Rezerv $name",
        async ({ hall, seat }) => {
            await clickElement(page, locatorChoiceOfDay);
            await clickElement(page, hall);
            await clickElement(page, seat);
            await clickElement(page, locatorButtonOfRezrv);

            const actualTextOfRezerv = await getText(page, locatorTextOfRezerv);
            const expectedTextOfRezerv = "Вы выбрали билеты:";

            await expect(actualTextOfRezerv).toContain(expectedTextOfRezerv);

            await clickElement(page, locatorGetResrvCod);

            const actualTextCheckTicket = await getText(
                page,
                locatorTextCheckTicket
            );
            const expectedTextCheckTicket = "Электронный билет";

            await expect(actualTextCheckTicket).toContain(
                expectedTextCheckTicket
            );
        },
        20000
    );
});

describe.only("Sad path movie test", () => {
    test("Reservation of a purchased seat", async () => {
        await clickElement(page, locatorChoiceOfDay);
        await clickElement(page, locatorChoiceHall);
        await clickElement(page, locatorFirstFreeSeat);
        await clickElement(page, locatorButtonOfRezrv);

        const actualTextOfRezerv = await getText(page, locatorTextOfRezerv);
        const expectedTextOfRezerv = "Вы выбрали билеты:";

        await expect(actualTextOfRezerv).toContain(expectedTextOfRezerv);

        await clickElement(page, locatorGetResrvCod);

        const actualTextCheckTicket = await getText(
            page,
            locatorTextCheckTicket
        );
        const expectedTextCheckTicket = "Электронный билет";

        await expect(actualTextCheckTicket).toContain(expectedTextCheckTicket);

        await openStartPage(page, dashBoardPage);
        await clickElement(page, locatorChoiceOfDay);
        await clickElement(page, locatorChoiceHall);
        await clickElement(page, locatorFirstBusySeat);

        const isDisabled = await page.$eval(locatorButtonOfRezrv, link =>
            link.getAttribute("disabled")
        );

        await expect(isDisabled).toBe("true");
    }, 20000);
});
