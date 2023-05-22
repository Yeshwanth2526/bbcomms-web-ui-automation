/* *************************** FileName : validateTwitterFeedUpdate.ts ***********************************

Description
    Test case file for verifying whether the posted twitter message is getting updated in BBComms feed page.

History
    [2022-03-01]: Poornima S <poornima.sridharan@blackboard.com> :  Verification step is now included in
                                                                    Allure report. Previously in after hook.

Notes

******************************************************************************************************/
// Files to be imported
import CommonFunction from '../../pages/CommonFunctions';
import FeedsCommonFunctions from '../../pages/FeedsFunctions';
const FeedPageObjects = require('../../pageobjects/FeedPageObjects.json');
import { FeedTestData } from '../../../data/FeedTestData';
import SendTwitterFunctions from '../../pages/SendTwitterFunctions';
import SendMessageFunctions from '../../pages/SendMessageFunctions';
import OutBoxFunctions from '../../pages/OutBoxFunctions';
import { testData } from '../../../data/SendTestCaseData';
import LoginToBBcoms from '../../pages/LoginToBBcoms';
const data = require('../../../data/env.json');
import WaitForExist from '../../helpers/action/waitForExist';
// import lighthouse from '../../helpers/action/lighthouse';
const { url, user, password } = require('../../../data/env_data')

// Actual test scenarios
describe('Login to the Application as Support User Validate Twitter Feed update', () => {
    let subjectAndTextValue: string[];
    before('Login to the Application as Support User and Navigate to Message Menu', async () => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
        await LoginToBBcoms.navigateToPages('Messages');
    });

    it('Route to Message Send page Attach Gif image and send Twitter message', async() => {
        subjectAndTextValue =await  SendMessageFunctions.enterContentInTextAndSubject(testData.TwitterMessageSubject.concat(' with JPG Attachment'), testData.TwitterMessageContent.concat(' with JPG Attachment'));
        const filePath = './src/Attachments/Twitter/';
        await SendTwitterFunctions.TwitterFileUpload(filePath, 'jpg');
        await SendMessageFunctions.SendMessage(5000);
        await CommonFunction.WaitForBackendPost('twitter');
        await OutBoxFunctions.selectMessage(subjectAndTextValue);
    });

    it('Navigate to Settings->App Congig->Feed Page and Add Twitter Feed', async () => {
        await LoginToBBcoms.navigateToPages('Settings');
        await FeedsCommonFunctions.LoadFeedPage();
        await WaitForExist(FeedPageObjects.FacebookIconImg);
        let AccountElement = `//span[contains(.,'${FeedTestData.DisplayedTwitterName}')]`;
        await FeedsCommonFunctions.ModifySocialFeed(AccountElement)
        await FeedsCommonFunctions.WaitForFeedAddition('Twitter');
    });

    it('Verify the Feeds has been added', async () => {
        let AccountElement = `//tr[contains(.,'${FeedTestData.DisplayedTwitterName}')]`;
        await FeedsCommonFunctions.CheckFeedCount(AccountElement, 'Twitter');
        await FeedsCommonFunctions.VerifyFeedEntries(FeedTestData.TwitterAccountName);
        //await FeedsCommonFunctions.VerifyFeedEntryContent(subjectAndTextValue[1]);
    });

    after('Logout from the application and close the browser', async () => {
        await browser.closeWindow();
    });
})