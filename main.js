const puppeteer = require('puppeteer');

async function scrapeProduct(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const[el] = await page.$x('//*[@id="bind-template1"]/a[4]/div/div[1]/img');
    const src = await el.getProperty('src');
    const srcTxt = await src.jsonValue();

    const[el2] = await page.$x('//*[@id="bind-template1"]/a[1]/div/div');
    const txt = await el2.getProperty('textContent');
    const rawTxt = await txt.jsonValue();
    
    // const[el2] = await page.$x('//*[@id="ContentSection_C017_Col00"]/div[4]');
    // const pageLinks = await el2.getProperty('href');
    // const rawTxt = await pageLinks.jsonValue();



    console.log({srcTxt, rawTxt});

    browser.close();

}

scrapeProduct('https://www.iams.com/pet-health/puppy-care');

