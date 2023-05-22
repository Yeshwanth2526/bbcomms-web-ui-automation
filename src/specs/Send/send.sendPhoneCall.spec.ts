/* *************************** FileName : sendPhoneCall.ts ***************************************

Description
    Test case file for sending phone call to particular recipient.

History
    [2022-03-01]: Poornima S <poornima.sridharan@blackboard.com> : Added pausingMs for UhuraJobVerification.

Notes

*****************************************************************************************************/
// Files to import
import CommonFunction from '../../pages/CommonFunctions';
import SendMessageFunctions from '../../pages/SendMessageFunctions';
import OutBoxFunctions from '../../pages/OutBoxFunctions';
const data = require('../../../data/env.json');
import LoginToBBcoms from '../../pages/LoginToBBcoms';
import selectOption from '../../helpers/action/selectOption';
const SendPageObjects = require('../../pageobjects/SendPageObjects.json');
import { testData } from '../../../data/SendTestCaseData';
import lighthouse from '../../helpers/action/lighthouse';
const { url, user, password } = require('../../../data/env_data')

// Actual test scenarios
describe('Login to the Application as Support User and send Message using Phonecall', () => {
    let subjectAndTextValue: string[];

    before ('Login to the Application as Support User and Navigate to Message Menu', async () => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
        await LoginToBBcoms.navigateToPages('Messages');
    })

    it('Send Phonecall with "Text to Speech" option',async () => {
        const content = await testData.PhoneMessageContent.replace('{MergeBreakPoint}', '')
        subjectAndTextValue = await SendMessageFunctions.enterContentInTextAndSubject(testData.PhoneMessageSubject, content);
        await SendMessageFunctions.selectDeliveryMode('Phone');
        await selectOption('text', 'Text to speech', SendPageObjects.audioDropDown);
        await SendMessageFunctions.ChooseRecipient();
        await SendMessageFunctions.SendMessage();
    })

    it('Verify the Phonecall batch created successfully', async () => {
        await CommonFunction.WaitForBackendPost('phone');
        await OutBoxFunctions.selectMessage(subjectAndTextValue);
        await OutBoxFunctions.verifyUhuraJobCreation('phone', 0);
    });

    after('Logout from the application and close the browser', async () => {
        await browser.closeWindow();
    });

})