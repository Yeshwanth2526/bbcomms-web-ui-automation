/* *************************** FileName : sendHeadlines.ts ***************************************

Description
    Test case file for posting activity streams in BB Website

History
    [2022-03-01]: Poornima S <poornima.sridharan@blackboard.com> : Added School Info (Bayside High School) for Alert/WCM

Notes
    - Alerts/ Headlines & Announcements can be tested only for the following schools
        * High Schools          -> Bayside high School & Sunnydale High school
        * Middle/Junior schools -> Tom Landry middle school
        * Elementary Schools    -> Springfield Elementary

    - Now, the script is being tested for High Schools -> Bayside High School

*****************************************************************************************************/
// Files to import
const data = require('../../../data/env.json');
import LoginToBBcoms from '../../pages/LoginToBBcoms';
import SendMessageFunctions from '../../pages/SendMessageFunctions';
import SendFacebookFunctions from '../../pages/SendFacebookFunctions';
import CommonFunction from '../../pages/CommonFunctions';
import OutBoxFunctions from '../../pages/OutBoxFunctions';
import { testData } from '../../../data/SendTestCaseData';
import randomInt from '../../helpers/action/randomInt';
import lighthouse from '../../helpers/action/lighthouse';
const { url, user, password } = require('../../../data/env_data')

// Actual test scenarios
describe('Login to the Application as Support User and Post Headlines and Announcement in WCM', () => {
    let subjectAndTextValue: string[];

    before('Login to bbcomms applications with valid credentials', async() => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
        await LoginToBBcoms.navigateToPages('Messages');
    });

    it('Verify user is able to post headline and announcement by selecting a school', async () => {
        var WebsiteMessageSubject1 = "Automation_testing"+ randomInt(100,1000);
        subjectAndTextValue = await SendMessageFunctions.enterContentInTextAndSubject(WebsiteMessageSubject1, testData.WebsiteMessageContent);
        await SendMessageFunctions.selectHeadlinesRecipient('High Schools', 'Automation Org - Do Not Delete');
        await  SendMessageFunctions.SendMessage();
    });

    it('Verify the sent heading and announcement got posted successfully', async () => {
        //await CommonFunction.WaitForBackendPost('all');
        await OutBoxFunctions.selectMessage(subjectAndTextValue);
        //await OutBoxFunctions.verifySocialAndWebsiteCounts('Website');
    });

    after('Logout from the application and close the browser', async () => {
        await browser.closeWindow();
    });
})