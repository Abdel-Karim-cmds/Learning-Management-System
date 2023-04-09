const puppeteer = require('puppeteer');
const assert = require('assert');

try{

    (async () => {
    const browser = await puppeteer.launch({headless:true});
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/');

    const email_input = await page.$('#email_placeholder');
    await email_input.type('sasha@usiu.ac.ke');

    const password_input = await page.$('#password_placeholder');
    await password_input.type('123');

    const submit_btn = await page.$('#submit_btn');
    await submit_btn.click();

    await page.waitForTimeout(2000);

    const pageTitle = await page.title();

    assert(pageTitle === 'Welcome back, Sasha');
    console.log("Title matched successfully");

    console.log("Congratualations! The USER LOGIN was successful")

    await browser.close();

})();
} catch (err) {
    console.log("Unfortunately, the USER LOGIN was not successful")
    console.error(err);
}