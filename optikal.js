const puppeteer = require('puppeteer');

(async function main(){
    try{
        const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();
        page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36');

        await page.goto('https://www.iams.com/pet-health/puppy-care');
        await page.waitForSelector(".loadmore-outer");
        console.log("Turning up rocking");

        const loadmoreBut = await page.$('.loadmore-outer');
        loadmoreBut.click();
        console.log(loadmoreBut);

        const guideTopic = await page.$$('.result-grid-row');
        console.log("new length is:"+guideTopic.length);
        
        const newTopic = await page.$x('//*[@id="bind-template1"]/a[23]/div/div');
        console.log("new topic is:"+newTopic.length);

        const dusraTopic = await page.$$('.result-grid-row');
        console.log("final length is:"+dusraTopic.length);

    }catch (e){
        console.log('our error',e);
    }
})();