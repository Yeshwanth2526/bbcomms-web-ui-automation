/* *************************** FileName : sendScheduledMessage.ts ***************************************

Description
    Test case file for posting messages on the scheduled time for all delivery methods.

History
    [2022-03-01]: Poornima S <poornima.sridharan@blackboard.com> : Added School Info (Bayside High School) for Alert/WCM

Notes
    - Facebook Account - QA Page100 (Automation Org - Do not Delete)
    - Twitter Account - Karthick (Automation Org - Do not Delete)
    - Alerts/ Headlines & Announcements can be tested only for the following schools
        * High Schools          -> Bayside high School & Sunnydale High school
        * Middle/Junior schools -> Tom Landry middle school
        * Elementary Schools    -> Springfield Elementary

    - Now, the script is being tested for High Schools -> Bayside High School

*****************************************************************************************************/
// Files to import
import SendMessageFunctions from '../../pages/SendMessageFunctions';
import SendFacebookFunctions from '../../pages/SendFacebookFunctions';
import SendTwitterFunctions from '../../pages/SendTwitterFunctions';
import OutBoxFunctions from '../../pages/OutBoxFunctions';
const data = require('../../../data/env.json');
import LoginToBBcoms from '../../pages/LoginToBBcoms';
import WaitForExist from '../../helpers/action/waitForExist';
import clickElement from '../../helpers/action/clickElement';
import selectOption from '../../helpers/action/selectOption';
const SendPageObjects = require('../../pageobjects/SendPageObjects.json');
import { testData } from '../../../data/SendTestCaseData';
import lighthouse from '../../helpers/action/lighthouse';
const { url, user, password } = require('../../../data/env_data')

// Actual test scenarios
describe('Login to the Application as Support User and send Scheduled Message using All Delivery methods', () => {
    let category = 'Library';
    let subjectAndTextValue: string[];

    before('Login to the Application as Support User and Navigate to Message Menu',async () => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
        await LoginToBBcoms.navigateToPages('Messages');
    })

    it('Send Scheduled Message in All delivery methods', async () => {
        subjectAndTextValue =await SendMessageFunctions.enterContentInTextAndSubject(testData.AllMessageSubject, testData.AllMessageContent);
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
        await SendMessageFunctions.ChooseRecipient();
        await SendMessageFunctions.scheduleMessage();
        await SendMessageFunctions.SendMessage();
    })


    it('Verify the Schedule Message Batch created successfully',async () => {
        await  OutBoxFunctions.selectMessage(subjectAndTextValue, false);
    })

    after('Logout from the application and close the browser', async() => {
        await browser.closeWindow();
    });
})