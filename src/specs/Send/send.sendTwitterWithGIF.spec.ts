/* *************************** FileName : sendTwitterMessagewithJPG.ts ***************************************

Description
    Test case file for posting messages with JPG in twitter.

History
    [2022-03-01]: Poornima S <poornima.sridharan@blackboard.com> :
        - Headline modifications in describe part
        - Modified 'string' literal to 'number' as per SendMessage proc definition.
        - Removed the extra argument passed for verifySocialAndWebsiteCounts

Notes
    - Twitter Account - Karthick (Automation Org - Do not Delete)
    - Maximum of 4* JPG images or [2 * JPG and 2 * PNG] can be uploaded at a time + 280 characters
    - One GIF or one video with 280 characters

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
describe('Login to the Application as Support User and send Message using Twitter with GIF File', () => {
    let subjectAndTextValue: string[];

    before ('Login to the Application as Support User and Navigate to Message Menu', async () => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
        await LoginToBBcoms.navigateToPages('Messages');
    })

    it('Route to Message Send page Attach Gif image and send Twitter message',async () => {
        subjectAndTextValue = await SendMessageFunctions.enterContentInTextAndSubject(testData.TwitterMessageSubject.concat(' with GIF Attachment'), testData.TwitterMessageContent.concat(' with GIF Attachment'));
        const filePath = './src/Attachments/Gif.gif';
        await SendTwitterFunctions.TwitterFileUpload(filePath,'gif');
        await SendMessageFunctions.SendMessage(5000);
        await browser.pause(3000);
    })

    it('Verify the Twitter batch created successfully',async () => {
        await CommonFunction.WaitForBackendPost('twitter');
        await OutBoxFunctions.selectMessage(subjectAndTextValue);
        await OutBoxFunctions.verifySocialAndWebsiteCounts('Twitter');
    });

    after('Logout from the application and close the browser',async () => {
        await browser.closeWindow();
    });
})
