// http://books.toscrape.com/
const puppeteer=require("puppeteer");
const xlsx=require("xlsx");
const link="http://books.toscrape.com/";

async function getPageData(url,page){
    await page.goto(url);

    const h1=await page.$eval(".product_main h1",h1=>h1.textContent);
    const price=await page.$eval(".price_color",price=>price.textContent);
    const instock=await page.$eval(".instock.availability",instock=>instock.innerText);

    return {
        title:h1,
        price:price,
        instock:instock
    }
};

async function getLinks(){
    let browser=await puppeteer.launch({
        headless:null,
        defaultViewport:null,
        args:["--start maximized","--disable-notifications"]
    });
    let numberOFpages=await browser.pages();
    let page=numberOFpages[0];
    await page.goto(link,{waituntil:"networkidle2"});

    const links=await page.$$eval('.product_pod .image_container a',allAs=>allAs.map(a=>a.href));
    return links;

};

async function main(){
    const allLinks=await getLinks();
    let browser=await puppeteer.launch({
        headless:null,
        defaultViewport:null,
        args:["--start maximized","--disable-notifications"]
    });
    let numberOFpages=await browser.pages();
    let page=numberOFpages[0];

    const scrappedData=[];

    for(let link of allLinks){
        const data=await getPageData(link,page);
        page.waitFor(4000);
        scrappedData.push(data);
    }

    const workBook=xlsx.utils.book_new();
    const workSheet=xlsx.utils.json_to_sheet(scrappedData);
    xlsx.utils.book_append_sheet(workBook,workSheet);
    xlsx.writeFile(workBook,"MyBooks.xlsx");
    console.log(scrappedData);

}
main();