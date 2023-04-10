const puppeteer = require('puppeteer');
const assert = require('assert')

const email = "admin@gmail.com";
const password = "admin123";


const cId = 'APT3010';
const cName = 'Introduction to Artificial Intelligence';
const cDesc = 'The purpose of this course is to provide the most fundamental knowledge to the students so that they can understand what the AI is';


(async ()=>{
    const browser = await puppeteer.launch({headless:true});
    const page = await browser.newPage();
    await page.goto('https://learning-manangement.onrender.com/');

    const email_input = await page.$('#loginEmail');
    await email_input.type(email);

    const password_input = await page.$('#loginPassword');
    await password_input.type(password);

    const submit_btn = await page.$('#loginSubmitBtn');
    await submit_btn.click();

    await page.waitForTimeout(2000);

    const pageTitle = await page.title();
    console.log(pageTitle)

    const courseBtn = await page.$('#switchCourse')
    await courseBtn.click()

    await page.waitForTimeout(2000);

    const pageTitle2 = await page.title();
    console.log(pageTitle2)
    await page.waitForTimeout(2000);

    const abtn = await page.$('#addingCourseModal')
    await abtn.click()
    await page.waitForTimeout(2000);
   
    const courseID = await page.$("#idCourse")
    await courseID.type(cId)

    const courseName = await page.$("#nameCourse")
    await courseName.type(cName)

    const courseDesc = await page.$("#passCourse")
    await courseDesc.type(cDesc)

    const cbtn = await page.$('#submitCourse')
    await cbtn.click()

    var message;

    //Set the modal to closed state
    // page.on('dialog', async (dialog) => {
    //     message = dialog.message();
    
    //     console.log(dialog.message())
    //     await dialog.accept();
    // })
    // await page.waitForTimeout(1000);

    
    //Set the modal to closed state
    page.on('dialog', async (dialog) => {
        message = dialog.message();
    
        await dialog.accept();
    })
    
    const closeBtn = await page.$('#closeCourse')
    await closeBtn.click()

    await page.reload()



    // const closeBtn = await page.$('#closebtn')
    // await closeBtn.click()

    console.log("*********")
    console.log(message)
    console.log("*********")

    // await page.reload()

    const users = await page.waitForSelector('.courseID');

    const courses = await page.evaluate(() => Array.from(document.getElementsByClassName('courseID'), element => element.textContent));
    
    console.log(courses)

    if (message == 'Course Inserted Successfully' && courses.includes(cId)) {
        assert(message==='Course Inserted Successfully')
        console.log("Course Inserted Successfully");
    }
    else{
        assert(message==='This course already exists')
        console.log("This course already exists");
    }

    await browser.close()


})()
.catch(err =>{
    console.log(err)
})