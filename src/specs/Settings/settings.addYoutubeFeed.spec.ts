/* *************************** FileName : addYoutubeFeed.ts ***********************************

Description
    Test case file for adding youtube feeds in the system.

History
    [2022-03-01]: Poornima S <poornima.sridharan@blackboard.com> :  Verification step is now included in
                                                                    Allure report. Previously in after hook.

Notes

******************************************************************************************************/
// Files to be imported
import FeedsCommonFunctions from '../../pages/FeedsFunctions';
const FeedPageObjects = require('../../pageobjects/FeedPageObjects.json');
import { FeedTestData } from '../../../data/FeedTestData';
const data = require('../../../data/env.json');
import WaitForExist from '../../helpers/action/waitForExist';
import LoginToBBcoms from '../../pages/LoginToBBcoms';
import lighthouse from '../../helpers/action/lighthouse';
const { url, user, password } = require('../../../data/env_data')

// Actual test scenarios
describe('Login to the Application as Support User and Add Youtube Feeds', () => {

    before('Login to the Application as Support user and Navigate to Settings', async () => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
        await LoginToBBcoms.navigateToPages('Settings');


    });

    it('Navigate to Feed Page and Add Twitter Feed', async () => {
        await FeedsCommonFunctions.LoadFeedPage();
        await WaitForExist(FeedPageObjects.FacebookIconImg);
        let YoutubeAccountElement = `//span[contains(.,'${FeedTestData.DefaultYoutubeName}')]`;
        await FeedsCommonFunctions.RemoveFeeds(YoutubeAccountElement)
        // await $(FeedPageObjects.FeedSavedSuccess).waitForDisplayed({ timeout: 10000, timeoutMsg: 'Taking more time to remove', reverse: true, interval: 1000 });
        let AccountElement = `//tr[contains(.,'${FeedTestData.DefaultYoutubeName}')]`;
        let AccountElementLink =  AccountElement.concat(FeedPageObjects.FeedNameLink)
        await FeedsCommonFunctions.AddSocialFeed('Youtube', AccountElement);
        await FeedsCommonFunctions.ModifySocialFeed(AccountElementLink, FeedTestData.YoutubePageName,'true')
        await FeedsCommonFunctions.WaitForFeedAddition('Youtube');
    });

    it('Verify the Feeds has been added', async () => {
        let AccountElement = `//tr[contains(.,'${FeedTestData.DefaultYoutubeName}')]`;
        await FeedsCommonFunctions.CheckFeedCount(AccountElement, 'Youtube');
        await FeedsCommonFunctions.VerifyFeedEntries(FeedTestData.YoutubePageName);
    });

    after('Logout from the application and close the browser', async () => {
        await browser.closeWindow();
    });


})