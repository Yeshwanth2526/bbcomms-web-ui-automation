const data = require('../../../data/env.json');
import LoginToBBcoms from '../../pages/LoginToBBcoms';
import CommonFunction from '../../pages/CommonFunctions';
import SendMessageFunctions from '../../pages/SendMessageFunctions';
import OutBoxFunctions from '../../pages/OutBoxFunctions';
import { testData } from '../../../data/SendTestCaseData';
const SendPageObjects = require('../../pageobjects/SendPageObjects.json');
import clickElement from '../../helpers/action/clickElement';
import lighthouse from '../../helpers/action/lighthouse';
const { url, user, password } = require('../../../data/env_data')

describe('Login to the Application as Support User and send App Message with Attachments', () => {
    let subjectAndTextValue: string[];

    before('Login to the Application as Support User and Navigate to Message Menu',async () => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
        await LoginToBBcoms.navigateToPages('Messages');
    })

    it('Send App message with Attachments', async () => {
        subjectAndTextValue = await SendMessageFunctions.enterContentInTextAndSubject(testData.AppMessageSubject.concat('with Attachments'), testData.AppMessageContent.concat('with Attachments'));
        await SendMessageFunctions.selectDeliveryMode('App');
        await CommonFunction.UploadFilesFromDirectory('./src/Attachments/Email/', SendPageObjects.addAppAttachments);
        await SendMessageFunctions.ChooseRecipient();
        await clickElement("click", "selector",SendPageObjects.recipientOnlyCheckbox);
        await SendMessageFunctions.SendMessage();
    })

    it('Verify the Push Notification batch created successfully', async () => {
        await OutBoxFunctions.selectMessage(subjectAndTextValue);
    });

    after('Logout from the application and close the browser', async () => {
//         CommonFunction.logOutFromApplication();
        await browser.closeWindow();
    });
})
