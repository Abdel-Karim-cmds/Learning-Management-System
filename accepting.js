const puppeteer = require('puppeteer');
const assert = require('assert');

try{

    (async () => {
    const browser = await puppeteer.launch({headless:true});
    const page = await browser.newPage();
    await page.goto('https://learning-manangement.onrender.com/'); 

    const email_input = await page.$('#loginEmail');
    await email_input.type('mashley@usiu.ac.ke');

    const password_input = await page.$('#loginPassword');
    await password_input.type('498');

    const submit_btn = await page.$('#loginSubmitBtn');
    await submit_btn.click();

    await page.waitForTimeout(2000);

    const cyd = await page.$eval("#err", element=>element.textContent)

    assert(cyd === 'Incorrect username or password')

    console.log("Congratualations! The USER LOGIN was unsuccessful")

    await browser.close();

})();
} catch (err) {
    console.log("Unfortunately, the USER LOGIN was successful")
    console.error(err);
}