/* *************************** FileName : sendEmail.ts ***************************************

Description
    Test case file for sending email to particular recipient.

History
    [2022-03-01]: Poornima S <poornima.sridharan@blackboard.com> : Added pausingMs for UhuraJobVerification.

Notes

*****************************************************************************************************/
// Files to import
const data = require('../../../data/env.json');
import CommonFunction from '../../pages/CommonFunctions';
import LoginToBBcoms from '../../pages/LoginToBBcoms';
import SendMessageFunctions from '../../pages/SendMessageFunctions';
import OutBoxFunctions from '../../pages/OutBoxFunctions';
import { testData } from '../../../data/SendTestCaseData';
import lighthouse from '../../helpers/action/lighthouse';
const { url, user, password } = require('../../../data/env_data')

// Actual test scenarios
describe('Login to the Application as Support User and send Message using Email', () => {
    let subjectAndTextValue: string[];

    before('Login to the Application as Support User and Navigate to Message Menu', async () => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
        await LoginToBBcoms.navigateToPages('Messages');
    })

    it('Navigate to Email application',async () => {
        subjectAndTextValue =await SendMessageFunctions.enterContentInTextAndSubject(testData.EmailMessageSubject, testData.EmailMessageContent);
        await SendMessageFunctions.selectDeliveryMode('Email');
        await SendMessageFunctions.ChooseRecipient();
        await SendMessageFunctions.SendMessage();
    })

    it('Verify the Email batch created successfully',async () => {
        await CommonFunction.WaitForBackendPost('email');
        await OutBoxFunctions.selectMessage(subjectAndTextValue);
        await OutBoxFunctions.verifyUhuraJobCreation('email', 0);
    });

    after('Logout from the application and close the browser', async () => {
        await browser.closeWindow();
    });
})