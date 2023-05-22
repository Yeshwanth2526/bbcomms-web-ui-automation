const data = require('../../../data/env.json');
import LoginToBBcoms from '../../pages/LoginToBBcoms';
import SendMessageFunctions from '../../pages/SendMessageFunctions';
import SendFacebookFunctions from '../../pages/SendFacebookFunctions';
import CommonFunction from '../../pages/CommonFunctions';
import OutBoxFunctions from '../../pages/OutBoxFunctions';
const SendPageObjects = require('../../pageobjects/SendPageObjects.json');
import { testData } from '../../../data/SendTestCaseData';
import lighthouse from '../../helpers/action/lighthouse';
const { url, user, password } = require('../../../data/env_data')

describe('Login to the Application as Support User and send Message using FACEBOOK', () => {
    let subjectAndTextValue: string[];

    before ('Login to the Application as Support User and Navigate to Message Menu', async() => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
        await LoginToBBcoms.navigateToPages('Messages');
    })

    it('Entering content and selecting Facebook Delivery Method And Send Message', async () => {
        subjectAndTextValue = await SendMessageFunctions.enterContentInTextAndSubject(testData.FbMessageSubject, testData.FbMessageContent);
        await SendFacebookFunctions.searchSelectFbAccount();
        await SendMessageFunctions.SendMessage(5000);
        await browser.pause(3000);
    })

    it('Verify the Facebook batch created successfully', async () => {
        await CommonFunction.WaitForBackendPost('facebook');
        await OutBoxFunctions.selectMessage(subjectAndTextValue);
        await OutBoxFunctions.verifySocialAndWebsiteCounts('Facebook');
    });

    after('Logout from the application and close the browser', async () => {
//         CommonFunction.logOutFromApplication();
       await browser.closeWindow();
    });
})