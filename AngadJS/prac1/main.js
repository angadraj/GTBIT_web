const puppeteer = require("puppeteer");
const credentials = require("./main.json");
let postsToLike = 5;
credentials["target_href"] = `/${credentials["pageToGo"]}/`;
(async function () {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto(credentials.url, {
        waitUntil: 'networkidle2'
    });
    await page.type('input[name="username"]', credentials.email, {
        delay: 300
    });
    await page.type('input[name="password"]', credentials.pswd, {
        delay: 300
    });
    await Promise.all([
        page.click('button[type="submit"]'),
        page.waitForNavigation({
            waitUntil: 'networkidle0'
        })
    ]);
    console.log("clicked submitted");
    //lets search the page
    await page.type('input[type="text"]', credentials.pageToGo, {
        delay: 300
    });
    await page.waitForSelector('.drKGC .fuqBx a');
    console.log("all anchors appeared");
    await Promise.all([
        // page.click('.drKGC .fuqBx a[href="/hindustantimes/"]'),
        page.click(`.drKGC .fuqBx a[href="${credentials.href}"]`),
        page.waitForNavigation({
            waitUntil: "networkidle2"
        })
    ]);
    console.log("desired page entered");

    //image clicks
    await page.waitForSelector('._9AhH0', {
        visible: true
    });
    await Promise.all([
        page.click('._9AhH0'),
        page.waitForNavigation({
            waitUntil: "networkidle2"
        })
    ]);
    do {
        await page.waitForSelector('.fr66n > button', {
            visible: true
        });
        await page.click('.fr66n > button');
        console.log("image liked");
        await page.click('.coreSpriteRightPaginationArrow');
        console.log("arrow clicked");

    } while (postsToLike-- > 1)

    console.log(credentials);
    await browser.close();

}());