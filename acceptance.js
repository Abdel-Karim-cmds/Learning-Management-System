const puppeteer = require('puppeteer');
const assert = require('assert');

var id = "665464";

//Create User Acceptance Test'

try {
    (async () => {
        //Get the browser and page details first and make it run in headless mode
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto('https://learning-manangement.onrender.com/');//This is for the login page

        const loginEmailInput = await page.$('#loginEmail');
        await loginEmailInput.type('admin@gmail.com');

        const loginPasswordInput = await page.$('#loginPassword');
        await loginPasswordInput.type('admin123');

        const loginSubmitBtn = await page.$('#loginSubmitBtn');
        await loginSubmitBtn.click();

        //Set Timeout for the page to 2000ms
        await page.waitForTimeout(2000);

        const pageTitle = await page.title();

        assert(pageTitle === 'Welcome back Admin');
        console.log('Admin Tab Successfully Opened');

        //Get button to add new user
        const addUserBtn = await page.$('#adding');
        await addUserBtn.click();

        //Set the modal to open state
        const addStudentModal = await page.$('#addStudent');
        await addStudentModal.evaluate((el) => el.style.display = 'block');

        // Get StudentID Input
        const studentIDInput = await page.$('#studID');
        await studentIDInput.type(id.toString());

        //Get Student Name Input
        const studentNameInput = await page.$('#studName');
        await studentNameInput.type('Noah Doe John');

        await page.$eval('#mailStud', el => el.value = 'someguy@usiu.ac.ke');

        const studentPasswordInput = await page.$('#studPass');
        await studentPasswordInput.type('john123');

        const courseListChecker = await page.waitForSelector('.courseCheckList');
        await courseListChecker.click();

        const studentRadio = await page.waitForSelector('.studentRadioButton');
        await studentRadio.click();

        const submitUserDetails = await page.$('#addUserDetailsBtn')
        await submitUserDetails.click();
        var message;

        //Set the modal to closed state
        page.on('dialog', async (dialog) => {
            message = dialog.message();
        
            await dialog.accept();
        })

        const closeBtn = await page.$('#closebtn')
        await closeBtn.click()

        await page.reload()

        


        const users = await page.waitForSelector('.userID');

        const userID = await page.evaluate(() => Array.from(document.getElementsByClassName('userID'), element => element.textContent));
        

    
        if (message == 'User Inserted Successfully' && userID.includes(id)) {
            assert(message==='User Inserted Successfully')
            console.log("User Inserted Successfully");
        }
        else{
            assert(message==='This user already exists')
            console.log("This user already exists");
        }


        await browser.close();
    })();
} catch (err) {
    console.error(err);
}
