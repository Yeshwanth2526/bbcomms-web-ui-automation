import CommonFunction from '../../pages/CommonFunctions';
import SendMessageFunctions from '../../pages/SendMessageFunctions';
import SendTwitterFunctions from '../../pages/SendTwitterFunctions';
import OutBoxFunctions from '../../pages/OutBoxFunctions';
const data = require('../../../data/env.json');
import LoginToBBcoms from '../../pages/LoginToBBcoms';
import { testData } from '../../../data/SendTestCaseData';
import lighthouse from '../../helpers/action/lighthouse';
const { url, user, password } = require('../../../data/env_data')
// Actual test scenarios
describe('Login to the Application as Support User and send message using Twitter', () => {
    let subjectAndTextValue: string[];

    before ('Login to the Application as Support User and Navigate to Message Menu', async () => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
        await LoginToBBcoms.navigateToPages('Messages');
    })

    it('Entering content and selecting Twitter Delivery Method And Send Message', async () => {
        subjectAndTextValue =await SendMessageFunctions.enterContentInTextAndSubject(testData.TwitterMessageSubject, testData.TwitterMessageContent)
        await SendTwitterFunctions.searchSelectTwitterAccount();
        await SendMessageFunctions.SendMessage(5000);
        await browser.pause(3000);
    })

    it('Verify the Twitter batch created successfully',async () => {
        //await CommonFunction.WaitForBackendPost('twitter');
        await OutBoxFunctions.selectMessage(subjectAndTextValue);
        await  OutBoxFunctions.verifySocialAndWebsiteCounts('Twitter');
    });

    after('Logout from the application and close the browser',async () => {
        await browser.closeWindow();
    });

})