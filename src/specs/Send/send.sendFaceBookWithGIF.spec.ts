/* *************************** FileName : sendFacebookWithGIF.ts ***************************************

Description
    Test case file for posting GIF images in Facebook.

History
    [2022-03-21]: Poornima S <poornima.sridharan@blackboard.com> : Modified arguments for validating Facebook posts

Notes

*****************************************************************************************************/
// Files to import
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

// Actual test scenarios
describe('Login to the Application as Support User and send Message using FACEBOOK with GIF File', () => {
    let subjectAndTextValue: string[];

    before ('Login to the Application as Support User and Navigate to Message Menu', async () => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
        await LoginToBBcoms.navigateToPages('Messages');
    });

    it('Route to Message Send page Attach Gif image and send Fb message', async () => {
        subjectAndTextValue =await  SendMessageFunctions.enterContentInTextAndSubject(testData.FbMessageSubject.concat(' with GIF Attachment'), testData.FbMessageContent.concat(' with GIF Attachment'));
        const filePath =  './src/Attachments/Gif.gif';
        await SendFacebookFunctions.FacebookFileUpload(filePath);
        await SendMessageFunctions.SendMessage(5000);
        await browser.pause(3000);
    });

    it('Verify the Facebook batch created successfully', async () => {
        await CommonFunction.WaitForBackendPost('facebook');
        await OutBoxFunctions.selectMessage(subjectAndTextValue);
        await OutBoxFunctions.verifySocialAndWebsiteCounts('Facebook');
    });

    after('Logout from the application and close the browser',async () => {
        await browser.closeWindow();
    });
})
