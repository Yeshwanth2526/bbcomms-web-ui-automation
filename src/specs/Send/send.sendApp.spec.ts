const data = require('../../../data/env.json');
import LoginToBBcoms from '../../pages/LoginToBBcoms';
import SendMessageFunctions from '../../pages/SendMessageFunctions';
import OutBoxFunctions from '../../pages/OutBoxFunctions';
import { testData } from '../../../data/SendTestCaseData';
import lighthouse from '../../helpers/action/lighthouse';
const { url, user, password } = require('../../../data/env_data')

describe('Login to the Application as Support User and send App Message without Recipients', () => {
    let subjectAndTextValue: string[];

    before('Login to the Application as Support User and Navigate to Message Menu', async () => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
        await LoginToBBcoms.navigateToPages('Messages');
    })

    it('Navigate to App Delivery Method and send message without recipients', async () => {
        subjectAndTextValue =await SendMessageFunctions.enterContentInTextAndSubject(testData.AppMessageSubject, testData.AppMessageContent);
        await SendMessageFunctions.selectDeliveryMode('App');
        await SendMessageFunctions.SendMessage();
    })

    it('Verify the Push Notification batch created successfully', async() => {
        await OutBoxFunctions.selectMessage(subjectAndTextValue);
    });

    after('Logout from the application and close the browser',async () => {
//         CommonFunction.logOutFromApplication();
        await browser.closeWindow();
    });
})