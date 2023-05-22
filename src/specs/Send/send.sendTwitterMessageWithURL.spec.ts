/* *************************** FileName : sendTwitterMessagewithURL.ts ***************************************

Description
    Test case file for posting messages with URL in twitter.

History
    [2022-03-01]: Poornima S <poornima.sridharan@blackboard.com> :
        - Headline modifications in describe part
        - Modified 'string' literal to 'number' as per SendMessage proc definition.
        - Removed the extra argument passed for verifySocialAndWebsiteCounts

Notes
    - Twitter Account - Karthick (Automation Org - Do not Delete)

*****************************************************************************************************/
// Files to import
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
describe('Login to the Application as Support User and send message with URL using Twitter', () => {
    let subjectAndTextValue: string[];

    before ('Login to the Application as Support User and Navigate to Message Menu', async () => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
        await LoginToBBcoms.navigateToPages('Messages');
    })

    it('Entering content and selecting Twitter Delivery Method And Send Message', async () => {
        subjectAndTextValue = await SendMessageFunctions.enterContentInTextAndSubject(testData.TwitterUrlMessageSubject, testData.TwitterUrlMessageContent);
        await SendTwitterFunctions.searchSelectTwitterAccount();
        await  SendMessageFunctions.SendMessage();
        await browser.pause(5000);
    })

    it('Verify the Twitter batch created successfully', async () => {
        await CommonFunction.WaitForBackendPost('twitter');
        await OutBoxFunctions.selectMessage(subjectAndTextValue);
        await OutBoxFunctions.verifySocialAndWebsiteCounts('Twitter');
    });

    after('Logout from the application and close the browser', async () => {
        await  browser.closeWindow();
    });

})