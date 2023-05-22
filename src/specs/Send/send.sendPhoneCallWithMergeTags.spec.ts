/* *************************** FileName : sendPhoneCallWithMergeTags.ts ***************************************

Description
    Test case file for sending phone call with merge tags option to particular recipient.

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
import acceptAlert from '../../helpers/action/acceptAlert';
const SendPageObjects = require('../../pageobjects/SendPageObjects.json');
import { testData } from '../../../data/SendTestCaseData';
import lighthouse from '../../helpers/action/lighthouse';
const { url, user, password } = require('../../../data/env_data')

// Actual test scenarios
describe('Login to the Application as Support User and send PhoneCall with both Acceptable and UnAcceptable TTS content a', () => {
    let subjectAndTextValue: string[];

    before('Login to the Application as Support user and Navigate to Message Menu',async () => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
        await LoginToBBcoms.navigateToPages('Messages');
    });

    it('Send PhoneCall with TTS content which produce less than 180 sec Audio', async () => {
        const content = await testData.PhoneMessageContent.replace('{MergeBreakPoint}', testData.TTSMergeTags);
        subjectAndTextValue = await SendMessageFunctions.enterContentInTextAndSubject(testData.PhoneMessageSubject, content);
        await SendMessageFunctions.selectDeliveryMode('Phone');
        await selectOption('text', 'Text to speech', SendPageObjects.audioDropDown);
        await SendMessageFunctions.ChooseRecipient();
        await SendMessageFunctions.SendMessage();
    })

    it('Verify the Phonecall with Valid TTS content batch created successfully',async () => {
        await  CommonFunction.WaitForBackendPost('phone');
        await  OutBoxFunctions.selectMessage(subjectAndTextValue);
        await OutBoxFunctions.verifyUhuraJobCreation('phone', 0);
    });

    it('Send PhoneCall with Acceptable TTS content which produce more than 180 sec Audio', async() => {
        await LoginToBBcoms.navigateToPages('Messages');
        let content = testData.PhoneMessageContent.replace('{MergeBreakPoint}', '')
        content = content.repeat(20);
        subjectAndTextValue = await SendMessageFunctions.enterContentInTextAndSubject(testData.PhoneMessageSubject, content);
        await SendMessageFunctions.selectDeliveryMode('Phone');
        await selectOption('text', 'Text to speech', SendPageObjects.audioDropDown);
        await SendMessageFunctions.ChooseRecipient();
        await SendMessageFunctions.checkBlackedOutTime();
        const sendButton = await $(SendPageObjects.sendButton);
        await sendButton.waitForClickable({ timeout: 2000, timeoutMsg: 'Send Button is not clickable!!!' })
        await sendButton.click();
        await acceptAlert();
    })

    after('Logout from the application and close the browser', () => {
        browser.closeWindow();
    });



})
