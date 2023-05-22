/* *************************** FileName : sendEmailWithMergeTag.ts ***************************************

Description
    Test case file for sending email with merge tags to particular recipient.

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
import WaitForExist from '../../helpers/action/waitForExist';
import clickElement from '../../helpers/action/clickElement';
const SendPageObjects = require('../../pageobjects/SendPageObjects.json');
import { testData } from '../../../data/SendTestCaseData';
import lighthouse from '../../helpers/action/lighthouse';
const { url, user, password } = require('../../../data/env_data')

// Actual test scenarios
describe('Login to the Application as Support User and send Message using Email with Merge Tag', () => {
    let subjectAndTextValue: string[];

    before('Login to the Application as Support User and Navigate to Message Menu', async () => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
        await LoginToBBcoms.navigateToPages('Messages');
    })

    it('Set subject and move to Email Delivery method',async () => {
        subjectAndTextValue = await SendMessageFunctions.enterContentInTextAndSubject(testData.EmailMessageSubject.concat('with MergeTag'), testData.EmailMessageContent.concat('with mergeTag'));
        await SendMessageFunctions.selectDeliveryMode('Email');
    })

    it('Insert Merge tags',async () => {
        await WaitForExist(SendPageObjects.selectMore);
        await clickElement("click", "selector",SendPageObjects.selectMore);
        await WaitForExist(SendPageObjects.clickInsertMergeTag);
        await clickElement("click", "selector",SendPageObjects.clickInsertMergeTag);
        await WaitForExist(SendPageObjects.insertMergeTag);
        await CommonFunction.MoveAndClick(SendPageObjects.insertMergeTag);
    })

    it('Choose Recipient and Send email',async () => {
        await SendMessageFunctions.ChooseRecipient();
        await SendMessageFunctions.SendMessage();
    })

    it('Verify the Email batch created successfully',async () => {
        await CommonFunction.WaitForBackendPost('email');
        await OutBoxFunctions.selectMessage(subjectAndTextValue);
        await OutBoxFunctions.verifyUhuraJobCreation('email', 0);
    });

    after('Logout from the application and close the browser',async () => {
        await browser.closeWindow();
    });
})
