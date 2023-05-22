/* *************************** FileName : sendRss.ts ***************************************

Description
    Test case file for sending SMS with 280 characters to particular recipient.

History
    [2022-03-21]: Poornima S <poornima.sridharan@blackboard.com> :  Added URL as RSS feed message. (SBBCOM-1292)

Notes

*****************************************************************************************************/
// Files to be imported
import SendMessageFunctions from '../../pages/SendMessageFunctions';
import OutBoxFunctions from '../../pages/OutBoxFunctions';
const data = require('../../../data/env.json');
import LoginToBBcoms from '../../pages/LoginToBBcoms';
import { testData } from '../../../data/SendTestCaseData';
import lighthouse from '../../helpers/action/lighthouse';
const { url, user, password } = require('../../../data/env_data')
// Actual test scenarios
describe('Login to the Application as Support User and Post an Rss', () => {
    let subjectAndTextValue: string[];

    before('Login to bbcomms applications with valid credentials',async () => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
        await LoginToBBcoms.navigateToPages('Messages');
    });

   it("Verify user is able to post rss feed", async () => {
        subjectAndTextValue =await  SendMessageFunctions.enterContentInTextAndSubject(testData.RSSMessageSubject, testData.RSSMessageContent);
        await SendMessageFunctions.selectDeliveryMode('Web');
        await SendMessageFunctions.SendMessage();
        
    });

    it('Verify the rss feed sent got posted successfully and able to view the post in outbox', async () => {
        await  OutBoxFunctions.selectMessage(subjectAndTextValue);
    });

    it('verify the rss feed sent got posted successfully in delivery options',async () => {
        await  OutBoxFunctions.verifyRSSMessageInSettings(subjectAndTextValue[0]);
    });

    it('Verify user is able to post URL link in rss feed', async () => {
        await LoginToBBcoms.navigateToPages('Messages');
        subjectAndTextValue =await SendMessageFunctions.enterContentInTextAndSubject(testData.RSSMessageSubject, testData.RSSMessageContentNew);
        await SendMessageFunctions.selectDeliveryMode('Web');
        await SendMessageFunctions.SendMessage();
        subjectAndTextValue[1] = await subjectAndTextValue[1].replace('">','" ' + `target="_blank"` + '>');
        await OutBoxFunctions.selectMessage(subjectAndTextValue);
        await browser.pause(10000);
        await OutBoxFunctions.verifyRSSMessageInSettings(subjectAndTextValue[0]);
    });

    after('Logout from the application and close the browser', async () => {
        await browser.closeWindow();
    });
});