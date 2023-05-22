/* *************************** FileName : sendAppWithExistingSmore.ts ***************************************

Description
  Test case file for sending App notifications after reusing already created smore template.

History
    [2022-03-01]: Poornima S <poornima.sridharan@blackboard.com> : Added headline modifications.

Notes

*****************************************************************************************************/
// Files to import
const data = require('../../../data/env.json');
import LoginToBBcoms from '../../pages/LoginToBBcoms';
import SmoreFunctions from '../../pages/SmoreFunctions';
import SendMessageFunctions from '../../pages/SendMessageFunctions';
import OutBoxFunctions from '../../pages/OutBoxFunctions';
import setValue from '../../helpers/action/setInputField';
const SendPageObjects = require('../../pageobjects/SendPageObjects.json');
import clickElement from '../../helpers/action/clickElement';
import { testData } from '../../../data/SendTestCaseData';
import lighthouse from '../../helpers/action/lighthouse';
const { url, user, password } = require('../../../data/env_data')

// Actual test scenarios
describe('Login to the Application as Support User and send Message using Existing Smore Template ', () => {
    let date: string = (new Date()).toString().split(' ').splice(1, 4).join(' ');
    let subject = testData.AppMessageSubject.concat(`with Existing Smore ${date}`);

    before('Login to the Application as Support User', async () => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
    })

    it('Navigate to Emil and Select Existing Smore', async () => {
        await SmoreFunctions.SelectExistingSmore('App');
    })

    it('Use Existing News Letter',async () => {
         await clickElement("click", "selector",SendPageObjects.SmoreUseButton);
    
    })

    it('Preview Smore and send email', async () => {
         await SmoreFunctions.previewAndClose();
         await setValue("set",subject, SendPageObjects.subjectField);
         //await  SendMessageFunctions.ChooseRecipient();
         //await clickElement("click", "selector",SendPageObjects.recipientOnlyCheckbox);
        await SendMessageFunctions.SendMessage();
    })

    it('Verify the Push Notification batch created successfully', async () => {
        
        await OutBoxFunctions.selectMessage([subject]);
    });

    after('Logout from the application and close the browser', async () => {
        await browser.closeWindow();
    });
})
