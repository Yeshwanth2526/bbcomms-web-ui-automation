// Files to import
const data = require('../../../data/env.json');
import CommonFunction from '../../pages/CommonFunctions';
import LoginToBBcoms from '../../pages/LoginToBBcoms';
import SendMessageFunctions from '../../pages/SendMessageFunctions';
import OutBoxFunctions from '../../pages/OutBoxFunctions';
const SendPageObjects = require('../../pageobjects/SendPageObjects.json');
import { testData } from '../../../data/SendTestCaseData';
import lighthouse from '../../helpers/action/lighthouse';
const { url, user, password } = require('../../../data/env_data')

// Actual test scenarios
describe('Login to the Application as Support User and send Message using Email with Attachments', () => {
    let subjectAndTextValue: string[];

    before('Login to the Application as Support User and Navigate to Message Menu', async () => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
        await LoginToBBcoms.navigateToPages('Messages');
    })

    it('Email with Attachment Application', async () => {
        subjectAndTextValue =await SendMessageFunctions.enterContentInTextAndSubject(testData.EmailMessageSubject.concat('with attachment'), testData.EmailMessageContent.concat('with attachment'));
        await SendMessageFunctions.selectDeliveryMode('Email');
        await CommonFunction.UploadFilesFromDirectory('./src/Attachments/Email/', SendPageObjects.addAttachments);
        await SendMessageFunctions.ChooseRecipient();
        await SendMessageFunctions.SendMessage();
    })

    it('Verify the Email batch created successfully', async () => {
       await CommonFunction.WaitForBackendPost('email');
       await OutBoxFunctions.selectMessage(subjectAndTextValue);
       await OutBoxFunctions.verifyUhuraJobCreation('email', 0);
    });

    after('Logout from the application and close the browser', async () => {
       await browser.closeWindow();
    });
})
