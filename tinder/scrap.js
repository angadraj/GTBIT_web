// http://books.toscrape.com/
const puppeteer=require("puppeteer");
const xlsx=require("xlsx");
const link="http://books.toscrape.com/";

(async ()=>{
    let browser=await puppeteer.launch({
        headless:null,
        defaultViewport:null,
        args:["--start maximized","--disable-notifications"]
    });
    let numberOFpages=await browser.pages();
    let page=numberOFpages[0];
    await page.goto(link,{
        waituntil:"networkidle2"
    });

    const links=await page.$$eval('.product_pod .image_container a',
    allAs=>allAs.map(a=>a.href));
    console.log(links);
    const aoaLinks=links.map(link=>[link]);

    const workBook=xlsx.utils.book_new();
    const workSheets=xlsx.utils.aoa_to_sheet(aoaLinks);
    xlsx.utils.book_append_sheet(workBook,workSheets);
    xlsx.writeFile(workBook,"links.xlsx");

})();