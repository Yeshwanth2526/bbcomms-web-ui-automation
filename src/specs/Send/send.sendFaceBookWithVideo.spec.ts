const data = require('../../../data/env.json');
import LoginToBBcoms from '../../pages/LoginToBBcoms';
import SendMessageFunctions from '../../pages/SendMessageFunctions';
import SendFacebookFunctions from '../../pages/SendFacebookFunctions';
import CommonFunction from '../../pages/CommonFunctions';
import OutBoxFunctions from '../../pages/OutBoxFunctions';
import { testData } from '../../../data/SendTestCaseData';
import lighthouse from '../../helpers/action/lighthouse';
const { url, user, password } = require('../../../data/env_data')

describe('Login to the Application as Support User and send Message using FACEBOOK with Video', () => {
    let subjectAndTextValue: string[];

    before ('Login to the Application as Support User and Navigate to Message Menu', async () => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
        await LoginToBBcoms.navigateToPages('Messages');
    })

    it('Route to Message Send page Attach video and send Fb message',async () => {
        subjectAndTextValue =await SendMessageFunctions.enterContentInTextAndSubject(testData.FbMessageSubject.concat(' with video Attachment'), testData.FbMessageContent.concat(' with video Attachment'));
        const filePath = './src/Attachments/Video.mp4';
        await SendFacebookFunctions.FacebookFileUpload(filePath);
        await SendMessageFunctions.SendMessage(10000);
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

