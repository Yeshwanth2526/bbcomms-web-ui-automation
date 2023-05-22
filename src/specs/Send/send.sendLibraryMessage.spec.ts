/* *************************** FileName : sendLibraryMessage.ts ***************************************

Description
    Test case file for posting messages on the category available in the library for all delivery methods.

History
    [2022-03-01]: Poornima S <poornima.sridharan@blackboard.com> : Added School Info (Bayside High School) for Alert/WCM

Notes
    - Categories in the library : Assignment, Attendance, Balance, Emergency, Grades, etc.,
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
describe('Login to the Application as Support User and send Library Message using All Delivery methods', () => {
    let category = 'Library';
    before('Login to the Application as Support User and Navigate to Message Menu', async () => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
        await LoginToBBcoms.navigateToPages('Messages');
    })

    // it('Get Library Message Category and Navigate to Message > Send Menu', async () => {
    //     category = await SendMessageFunctions.getLibraryMessageCategory()
    //     await LoginToBBcoms.navigateToPages('Messages');
    // })

    it('Send Library Message in All delivery methods', async() => {
        await SendMessageFunctions.selectSavedMessageCategory(category);
        await SendMessageFunctions.selectDeliveryMode('All');
        await SendFacebookFunctions.searchSelectFbAccount();
        await SendTwitterFunctions.searchSelectTwitterAccount();
        await SendMessageFunctions.selectHeadlinesRecipient('High Schools','Automation Org - Do Not Delete');
        await SendMessageFunctions.selectAlertRecipient('High Schools','Automation Org - Do Not Delete');
        await  SendMessageFunctions.selectDeliveryMode('App');
        await WaitForExist(SendPageObjects.recipientOnlyCheckbox);
        await clickElement("click", "selector",SendPageObjects.recipientOnlyCheckbox);
        await SendMessageFunctions.selectDeliveryMode('Phone');
        if( await $(SendPageObjects.audioDropDown).isDisplayed()){
            await selectOption('text', 'Text to speech', SendPageObjects.audioDropDown);
        }
        await SendMessageFunctions.ChooseRecipient();
        await SendMessageFunctions.SendMessage();
    })

    it('Verify all delivery Methods', async () => {
        await CommonFunction.WaitForBackendPost('all');
        await OutBoxFunctions.selectLatestMessage();
        await OutBoxFunctions.verifyAllDeliveryMethodMessages(testData.DeliveryMethods);
    })

    after('Logout from the application and close the browser', async () => {
        await browser.closeWindow();
    });
})