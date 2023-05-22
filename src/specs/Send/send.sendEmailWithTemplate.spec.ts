/* *************************** FileName : sendEmailWithTemplate.ts ***************************************

Description
    Test case file for sending email with template to particular recipient.

History
    [2022-03-01]: Poornima S <poornima.sridharan@blackboard.com> : Added pausingMs for UhuraJobVerification.
    [2022-03-21]: Poornima S : Following enhancements done to the script
        - Addition of Language translation in Smore template
        - Warning message when > 5000 characters to be translated (added both passing & failing scenarios) - SBBCOM-1003

Notes

*****************************************************************************************************/
// Files to import
import CommonFunction from '../../pages/CommonFunctions';
import AccountsFunctions from '../../pages/AccountsFunctions';
import SendMessageFunctions from '../../pages/SendMessageFunctions';
import OutBoxFunctions from '../../pages/OutBoxFunctions';
const data = require('../../../data/env.json');
import LoginToBBcoms from '../../pages/LoginToBBcoms';
import WaitForExist from '../../helpers/action/waitForExist';
import clickElement from '../../helpers/action/clickElement';
import setValue from '../../helpers/action/setInputField';
const SendPageObjects = require('../../pageobjects/SendPageObjects.json');
const HomePageObjects = require('../../pageobjects/HomePageObject.json');
import { testData } from '../../../data/SendTestCaseData';
import lighthouse from '../../helpers/action/lighthouse';
const { url, user, password } = require('../../../data/env_data')

// Actual test scenarios
describe('Login to the Application as Support User and send Message using Smore Template Email', () => {
    const date: string = (new Date()).toString().split(' ').splice(1, 4).join(' ');
    const subject = testData.EmailMessageSubject.concat(`with Template ${date}`);
    const languageArabic = ['ar'];
    const users = ['parent'];

    before('Login to the Application as Support user and Navigate to Message Menu', async () => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
        await LoginToBBcoms.navigateToPages('Messages');
    })

    it('Scenario 1: Send Email with Templates (Any Templates) in Default Language (English)', async () => {
        await SendMessageFunctions.selectDeliveryMode('Email');
        await clickElement("click", "selector",SendPageObjects.insertTemplate);
        // const rint= await CommonFunction.getRandomInt(1,11);
        await clickElement("click", "selector",SendPageObjects.selectTemplate);
        await WaitForExist(SendPageObjects.clickUseButton);
        await clickElement("click", "selector",SendPageObjects.clickUseButton);
        await WaitForExist(SendPageObjects.subjectField);
        await setValue("set", subject, SendPageObjects.subjectField);
        await SendMessageFunctions.ChooseRecipient();
        await SendMessageFunctions.SendMessage();
        await CommonFunction.WaitForBackendPost('email');
        await OutBoxFunctions.selectMessage([subject], false);
        await OutBoxFunctions.verifyUhuraJobCreation('email', 0);
    })

    it('Scenario 2: Send Email with Templates in Arabic languages (INVITATION Template alone)' , async () => {
        await AccountsFunctions.updatePreferredLanguageOfAccounts(users, languageArabic);
        await LoginToBBcoms.navigateToPages('Messages');
        await SendMessageFunctions.selectDeliveryMode('Email');
        await clickElement("click", "selector",SendPageObjects.insertTemplate);
        await clickElement("click", "selector",SendPageObjects.selectTemplate);
        await WaitForExist(SendPageObjects.clickUseButton);
        await clickElement("click", "selector",SendPageObjects.clickUseButton);
        await WaitForExist(SendPageObjects.subjectField);
        await setValue("set", subject, SendPageObjects.subjectField);
        await SendMessageFunctions.ChooseRecipient(users);
        await clickElement("click", "selector",SendPageObjects.languageDropDown);
        await WaitForExist(SendPageObjects.languageList);
        await SendMessageFunctions.selectDeliveryMode('Template');
        const element =await SendPageObjects.languageSelect.replace('{language}', 'Arabic');
        await clickElement("click", "selector",element);
        await $(HomePageObjects.SuccessHeader).waitForDisplayed({timeout: 10000, timeoutMsg:'Language Convertion Failed'});
        await browser.waitUntil(
            async () => (await $(element.concat('//following::i')).getAttribute('class')).indexOf('fa-check-circle') > 0,
            {
                timeout: 5000,
                timeoutMsg: 'Language Selection was Failed!!!'
            })
            // No possible wait statement was there to update the languages
            browser.pause(3000);

            await SendMessageFunctions.SendMessage();
            await CommonFunction.WaitForBackendPost('email');
            await OutBoxFunctions.selectMessage([subject], false);
            await OutBoxFunctions.verifyUhuraJobCreation('email', 0);
    })

    it('Scenario 3: Send Email with Templates in Arabic languages (Other templates which has > 5000 chars -FAILING)' , async() => {
        await AccountsFunctions.updatePreferredLanguageOfAccounts(users, languageArabic);
        await LoginToBBcoms.navigateToPages('Messages');
        await SendMessageFunctions.selectDeliveryMode('Email');
        await clickElement("click", "selector",SendPageObjects.insertTemplate);
        // const rint= await CommonFunction.getRandomInt(1,11);
        await clickElement("click", "selector",SendPageObjects.selectTemplate);
        await WaitForExist(SendPageObjects.clickUseButton);
        await clickElement("click", "selector",SendPageObjects.clickUseButton);
        await WaitForExist(SendPageObjects.subjectField);
        await setValue("set", subject, SendPageObjects.subjectField);
        await SendMessageFunctions.ChooseRecipient(users);
        await clickElement("click", "selector",SendPageObjects.languageDropDown);
        await WaitForExist(SendPageObjects.languageList);
        await SendMessageFunctions.selectDeliveryMode('Template');
        const element = await SendPageObjects.languageSelect.replace('{language}', 'Arabic');
        await clickElement("click", "selector",element);
        await $(HomePageObjects.SuccessHeader).waitForDisplayed({timeout: 10000, timeoutMsg:'Language Convertion Failed'});
        await browser.waitUntil(
           async () => (await $(element.concat('//following::i')).getAttribute('class')).indexOf('fa-check-circle') > 0,
            {
                timeout: 5000,
                timeoutMsg: 'Language Selection was Failed!!!'
            })
            // No possible wait statement was there to update the languages
            await browser.pause(3000);

       await SendMessageFunctions.SendMessage();
       await CommonFunction.WaitForBackendPost('email');
       await OutBoxFunctions.selectMessage([subject], false);
       await OutBoxFunctions.verifyUhuraJobCreation('email', 0);
    })


    it('Scenario 4: Send Email with Templates in Arabic languages (WARNING Scenario)' , async () => {
        await AccountsFunctions.updatePreferredLanguageOfAccounts(users, languageArabic);
        await LoginToBBcoms.navigateToPages('Messages');
        await SendMessageFunctions.selectDeliveryMode('Email');
        await clickElement("click", "selector",SendPageObjects.insertTemplate);
        // const rint=await CommonFunction.getRandomInt(1,11);
        await clickElement("click", "selector",SendPageObjects.selectTemplate);
        await WaitForExist(SendPageObjects.clickUseButton);
        await clickElement("click", "selector",SendPageObjects.clickUseButton);
        await WaitForExist(SendPageObjects.subjectField);
        await setValue("set", subject, SendPageObjects.subjectField);
        await SendMessageFunctions.ChooseRecipient(users);
        await clickElement("click", "selector",SendPageObjects.languageDropDown);
        await WaitForExist(SendPageObjects.languageList);
        await SendMessageFunctions.selectDeliveryMode('Template');
        const element = await SendPageObjects.languageSelect.replace('{language}', 'Arabic');
        await clickElement("click", "selector",element);
        await $(HomePageObjects.WarningHeader).waitForDisplayed({timeout: 10000, timeoutMsg:' Translation is not supported for text greater than 5000 characters. Could not translate: Email.        '});
        await browser.waitUntil(
           async () =>await (await $(element.concat('//following::i')).getAttribute('class')).indexOf('fa-check-circle') > 0,
            {
                timeout: 5000,
                timeoutMsg: 'Language Selection was Failed!!!'
            })
            // No possible wait statement was there to update the languages
            await browser.pause(3000);
            await AccountsFunctions.updatePreferredLanguageOfAccounts(users, ['en-US']);
    })

    after('Logout from the application and close the browser', async() => {
        await browser.closeWindow();
    });
})
