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

describe('Login to the Application as Support User and send Message using FACEBOOK with JPEG File', () => {
    let subjectAndTextValue: string[];

    before ('Login to the Application as Support User and Navigate to Message Menu', async () => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
        await LoginToBBcoms.navigateToPages('Messages');
    })

    it('Route to Message Send page Attach JPEG image and send Fb message',async () => {
         subjectAndTextValue = await SendMessageFunctions.enterContentInTextAndSubject(testData.FbMessageSubject.concat(' with JPEG Attachment'), testData.FbMessageContent.concat(' with JPEG Attachment'));
        const filePath = './src/Attachments/Image.jpeg';
        await  SendFacebookFunctions.FacebookFileUpload(filePath);
        await SendMessageFunctions.SendMessage(5000);
        await browser.pause(3000);
    })

    it('Verify the Facebook batch created successfully',async () => {
        await CommonFunction.WaitForBackendPost('facebook');
        await OutBoxFunctions.selectMessage(subjectAndTextValue);
        await OutBoxFunctions.verifySocialAndWebsiteCounts('Facebook');
    });

    after('Logout from the application and close the browser', async() => {
//         CommonFunction.logOutFromApplication();
        await browser.closeWindow();
    });
})