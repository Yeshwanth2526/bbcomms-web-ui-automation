import CommonFunction from '../../pages/CommonFunctions';
import SendMessageFunctions from '../../pages/SendMessageFunctions';
import OutBoxFunctions from '../../pages/OutBoxFunctions';
const data = require('../../../data/env.json');
import LoginToBBcoms from '../../pages/LoginToBBcoms';
import { testData } from '../../../data/SendTestCaseData';
const SendPageObjects = require('../../pageobjects/SendPageObjects.json');
import WaitForExist from '../../helpers/action/waitForExist';
import setValue from '../../helpers/action/setInputField';
import lighthouse from '../../helpers/action/lighthouse';
const { url, user, password } = require('../../../data/env_data')

// Actual test scenarios
describe('Login to the Application as Support User and send Message using SMS 280', () => {
    let subjectAndTextValue: string[];
    let subjectAndTextValueURL: string[];

    before('Login to the Application as Support user and Navigate to Message Menu',async () => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
        await LoginToBBcoms.navigateToPages('Messages');
    });

    it ('Send SMS with 280 Characters',async () => {
        subjectAndTextValue =await  SendMessageFunctions.enterContentInTextAndSubject(testData.SMSMessageSubject, testData.SMSMessageContent);
        await SendMessageFunctions.selectDeliveryMode('Sms');
        let maxtext=await $(SendPageObjects.maxMessageContent).getText();
        let msg_content = maxtext === '0 / 280' ? testData.SMSMessageContent280:testData.SMSMessageContent;
        // await WaitForExist(SendPageObjects.smstextField);
        await setValue("set", msg_content, SendPageObjects.smstextField);
        await SendMessageFunctions.ChooseRecipient();
        await SendMessageFunctions.SendMessage();
    });

    it('Verify the SMS batch created successfully', async() => {
        await CommonFunction.WaitForBackendPost('sms');
        await  OutBoxFunctions.selectMessage(subjectAndTextValue);
        await  OutBoxFunctions.verifyUhuraJobCreation('sms', 0);
    });

    it ('Send SMS with URL link', async() => {
        await LoginToBBcoms.navigateToPages('Messages');
        subjectAndTextValueURL = await SendMessageFunctions.enterContentInTextAndSubject(testData.SMSMessageSubjectWithURL, testData.SMSMessageContentWithURL);
        await SendMessageFunctions.selectDeliveryMode('Sms');
        await SendMessageFunctions.ChooseRecipient();
        await SendMessageFunctions.SendMessage();
    });

    it('Verify the SMS batch created successfully for URL message', async() => {
        await CommonFunction.WaitForBackendPost('sms');
        await OutBoxFunctions.selectMessage(subjectAndTextValueURL);
        await OutBoxFunctions.verifyUhuraJobCreation('sms', 0);
    });

    after('Logout from the application and close the browser',async () => {
        await browser.closeWindow();
    });
})
