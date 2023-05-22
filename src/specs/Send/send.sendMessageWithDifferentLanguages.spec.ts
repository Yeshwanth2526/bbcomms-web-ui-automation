/* *************************** FileName : sendMessageWithDifferentLanguages.ts ***************************************

Description
    Test case file for posting messages in different languages for the person in different roles.

History
    [2022-03-01]: Poornima S <poornima.sridharan@blackboard.com> : Added School Info (Bayside High School) for Alert/WCM

Notes
    - Languages for different roles:
        Teacher                 -> Spanish,
        Parent                  -> French,
        Principal               -> Portuguese,
        Attendance Secretary    -> Korean
    - Facebook Account - QA Page100 (Automation Org - Do not Delete)
    - Twitter Account - Karthick (Automation Org - Do not Delete)
    - Alerts/ Headlines & Announcements can be tested only for the following schools
        * High Schools          -> Bayside high School & Sunnydale High school
        * Middle/Junior schools -> Tom Landry middle school
        * Elementary Schools    -> Springfield Elementary

    - Now, the script is being tested for High Schools -> Bayside High School

*****************************************************************************************************/
// Files to import
import CommonFunction from '../../pages/CommonFunctions';
import SendMessageFunctions from '../../pages/SendMessageFunctions';
import SendFacebookFunctions from '../../pages/SendFacebookFunctions';
import AccountsFunctions from '../../pages/AccountsFunctions';
import SendTwitterFunctions from '../../pages/SendTwitterFunctions';
import OutBoxFunctions from '../../pages/OutBoxFunctions';
const data = require('../../../data/env.json');
import LoginToBBcoms from '../../pages/LoginToBBcoms';
import WaitForExist from '../../helpers/action/waitForExist';
import clickElement from '../../helpers/action/clickElement';
import selectOption from '../../helpers/action/selectOption';
const SendPageObjects = require('../../pageobjects/SendPageObjects.json');
import { testData } from '../../../data/SendTestCaseData';
const HomePageObjects = require('../../pageobjects/HomePageObject.json');
import lighthouse from '../../helpers/action/lighthouse';
const { url, user, password } = require('../../../data/env_data')

// Actual test scenarios
describe('Login to the Application as Support User and send Message with different languages using All Delivery methods', () => {
    const users = ['teacher', 'parent', 'principal', 'attendanceSeceratory'];
    let subjectAndTextValue: string[];

    before('Login to the Application as Support User and Navigate to Message Menu', async () => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
        await LoginToBBcoms.navigateToPages('Messages');
    })

    it('Set Different Languages to the config users', async() => {
        await AccountsFunctions.updatePreferredLanguageOfAccounts(users, Object.keys(testData.Languages));
    })

    it('Choose Required Recipients of All delivery methods',async () => {
        subjectAndTextValue = await SendMessageFunctions.enterContentInTextAndSubject(testData.AllMessageSubject, testData.AllMessageContent);
        await SendMessageFunctions.selectDeliveryMode('All');
        await SendFacebookFunctions.searchSelectFbAccount();
        await SendTwitterFunctions.searchSelectTwitterAccount();
        await SendMessageFunctions.selectHeadlinesRecipient('High Schools','Automation Org - Do Not Delete');
        await SendMessageFunctions.selectAlertRecipient('High Schools','Automation Org - Do Not Delete');
        await SendMessageFunctions.selectDeliveryMode('App');
        await WaitForExist(SendPageObjects.recipientOnlyCheckbox);
        await clickElement("click", "selector",SendPageObjects.recipientOnlyCheckbox);
        await SendMessageFunctions.selectDeliveryMode('Phone');
        await selectOption('text', 'Text to speech', SendPageObjects.audioDropDown);
        await SendMessageFunctions.selectDeliveryMode('Template');
        await SendMessageFunctions.ChooseRecipient(users);
    })

    it('Choose User Languages and Send Message', async () => {
        await clickElement("click", "selector",SendPageObjects.languageDropDown);
        // await WaitForExist(SendPageObjects.languageList);
        const languageNames = await Object.values(testData.Languages);
        await browser.pause(3000);
        await SendMessageFunctions.selectDeliveryMode('Template');
        for(let i=0; i <= languageNames.length-1; i++){
            const language = languageNames[i];
            const element = await SendPageObjects.languageSelect.replace('{language}', language);
        await clickElement("click", "selector",element);
        await $(HomePageObjects.SuccessHeader).waitForDisplayed({timeout: 10000, timeoutMsg:'Language Convertion Failed'});
        await browser.waitUntil(
                async() => (await $(element.concat('//following::i')).getAttribute('class')).indexOf('fa-check-circle') > 0,
                {
                    timeout: 5000,
                    timeoutMsg: 'Language Selection was Failed!!!'
                }
            );
            // No possible wait statement was there to update the languages
            await  browser.pause(3000);
        }
        await  SendMessageFunctions.SendMessage();
    })

    it('Reset the user languages to English', async() => {
        await AccountsFunctions.updatePreferredLanguageOfAccounts(users, ['en-US', 'en-US', 'en-US', 'en-US']);
    })

    it('Verify all delivery Methods', async () => {
        await CommonFunction.WaitForBackendPost('all');
        await LoginToBBcoms.navigateToPages('Messages', 'Outbox');
        await OutBoxFunctions.selectMessage(subjectAndTextValue, false);
        // await OutBoxFunctions.verifyAllDeliveryMethodMessages(testData.DeliveryMethods);
    })

    after('Logout from the application and close the browser', async () => {
        await browser.closeWindow();
    });
})