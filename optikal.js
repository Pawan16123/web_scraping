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
        console.log("Ignore:"+newTopic.length);

        const dusraTopic = await page.$$('.result-grid-row');
        console.log("final length is:"+dusraTopic.length);

        const openPages = await page.$$('#bind-template1');
        console.log(openPages.length);

        for (const section of openPages){
            const button = await section.$('a.item');
            button.click();

            await page.waitForSelector('.articles-wrapper');
            const divs = await page.$$('.about-iams-content');

            if(divs){console.log("found all:"+divs);}
            
            const newdivs = await page.evaluate(()=> 
                Array.from(document.querySelectorAll(".about-iams-content")).map(p => p.innerText.trim())
            )
            console.log("This is a new div"+newdivs);
            // loop over each P on the inner page
            for (const pp of divs){
                // const pp = await divs[i].getProperty('textcontent');
                // const value = await content.jsonValue();
                // const data1 = await (await pp.getProperty('value')).jsonValue();

                // const linkProperty = await linkSelector.getProperty('href');
                for(i=0; i<=pp.length; i++){
                    console.log("pls tell me the length: " + pp.evaluate());

                }
                const name = await pp.$eval('p', p => p.innerText );
                console.log('name:',name);
 
                const href = await pp.jsonValue();
                console.log("time keeps changing: "+href);
            }

        }

    }catch (e){
        console.log('our error',e);
    }
})();