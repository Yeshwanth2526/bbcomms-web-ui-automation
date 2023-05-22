/* *************************** FileName : sendEmergencyMessage.ts ***************************************

Description
    Test case file for posting messages with emergency notifications for all delivery methods.

History
    [2022-03-01]: Poornima S <poornima.sridharan@blackboard.com> :  Added School Info (Bayside High School) for Alert/WCM

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
import CommonFunction from '../../pages/CommonFunctions';
import SendMessageFunctions from '../../pages/SendMessageFunctions';
import SendFacebookFunctions from '../../pages/SendFacebookFunctions';
import SendTwitterFunctions from '../../pages/SendTwitterFunctions';
import OutBoxFunctions from '../../pages/OutBoxFunctions';
const data = require('../../../data/env.json');
import LoginToBBcoms from '../../pages/LoginToBBcoms';
import WaitForExist from '../../helpers/action/waitForExist';
import selectOption from '../../helpers/action/selectOption';
import clickElement from '../../helpers/action/clickElement';
const SendPageObjects = require('../../pageobjects/SendPageObjects.json');
const GlobalSettingsPageObjects = require('../../pageobjects/GlobalSettingsPageObjects.json');
import { testData } from '../../../data/SendTestCaseData';
import lighthouse from '../../helpers/action/lighthouse';
const { url, user, password } = require('../../../data/env_data')

// Actual test scenarios
describe('Login to the Application as Support User and send Emergency message to All applicable delivery methods', () => {
    let startTimeHour = '11', startTimeMinute = '30', startTimeMeridian = 'PM', endTimeHour = '12',
    endTimeMinute = '00', endTimeMeridian = 'AM';

    async function NavigateToGlobalSettingsMenu(){
        await LoginToBBcoms.navigateToPages('Settings', 'Global Settings');
        await WaitForExist(GlobalSettingsPageObjects.globalSettingsForm);
    }
    before('Login to the Application as Support User and Navigate to Settings > Global Settings Menu', async () => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
        await NavigateToGlobalSettingsMenu();
    })

    it('Set Blackout Time in Global Settings and Navigate to messagesMenu', async () => {
        startTimeHour = await $(GlobalSettingsPageObjects.blackoutStartTimeHours).getValue();
        startTimeMinute = await $(GlobalSettingsPageObjects.blackoutStartTimeMinutes).getValue();
        startTimeMeridian =await $(GlobalSettingsPageObjects.blackoutStartTimeMeridian).getText();
        endTimeHour =await $(GlobalSettingsPageObjects.blackoutEndTimeHours).getValue();
        endTimeMinute = await $(GlobalSettingsPageObjects.blackoutEndTimeMinutes).getValue();
        endTimeMeridian = await $(GlobalSettingsPageObjects.blackoutEndTimeMeridian).getText();
        let globalSettingValues = {
            startHour: '12',
            startMinute: '00',
            startMeridian: 'AM',
            endHour: '12',
            endMinute: '00',
            endMeridian: 'AM'
        };
        await CommonFunction.updateGlobalSettings(globalSettingValues);
        await browser.pause(5000);
        await LoginToBBcoms.navigateToPages('Messages');
    })

    it('Send Emergency Message in All applicable delivery methods',async () => {
        await SendMessageFunctions.selectSavedMessageCategory('Emergency');
        await browser.pause(4000);
        await SendMessageFunctions.selectDeliveryMode('All');
        await browser.pause(4000);
        await SendFacebookFunctions.searchSelectFbAccount();
        await SendTwitterFunctions.searchSelectTwitterAccount();
        await SendMessageFunctions.selectHeadlinesRecipient('High Schools','Automation Org - Do Not Delete');
        await SendMessageFunctions.selectAlertRecipient('High Schools','Automation Org - Do Not Delete');
        await SendMessageFunctions.selectDeliveryMode('App');
        await WaitForExist(SendPageObjects.recipientOnlyCheckbox);
        await clickElement("click", "selector",SendPageObjects.recipientOnlyCheckbox);
        await SendMessageFunctions.selectDeliveryMode('Phone');
        if(await $(SendPageObjects.audioDropDown).isDisplayed()){
            await selectOption('text', 'Text to speech', SendPageObjects.audioDropDown);
        }
        await SendMessageFunctions.ChooseRecipient();
        await SendMessageFunctions.SendMessage();
        await browser.pause(2000);
        await clickElement("click", "selector",SendPageObjects.PhoneOkButton);
        await SendMessageFunctions.SendMessage();
    })

    it('Verify all delivery Methods', async () => {
        await CommonFunction.WaitForBackendPost('all');
        await OutBoxFunctions.selectLatestMessage();
        await OutBoxFunctions.verifyAllDeliveryMethodMessages(testData.DeliveryMethods);
    })

    it('Reset Blackout Time in Global Settings',async  () => {
        await NavigateToGlobalSettingsMenu();
        const globalSettingValues = {
            startHour: startTimeHour,
            startMinute: startTimeMinute,
            startMeridian: startTimeMeridian,
            endHour: endTimeHour,
            endMinute: endTimeMinute,
            endMeridian: endTimeMeridian
        };
        await CommonFunction.updateGlobalSettings(globalSettingValues);
    })


    after('Logout from the application and close the browser', async() => {
       await browser.closeWindow();
    });
})