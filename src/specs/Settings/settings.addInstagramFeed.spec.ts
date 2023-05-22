/* *************************** FileName : addInstagramFeed.ts *************************

Description
    Test case file for adding Instagram feeds to the system.

History
    [2022-03-01]: Poornima S <poornima.sridharan@blackboard.com> :  Verification of feed update is now included in the actual test
                                                                    rather than after hook.

Notes

****************************************************************************************/
// Files to be imported
const FeedPageObjects = require('../../pageobjects/FeedPageObjects.json');
import { FeedTestData } from '../../../data/FeedTestData';
const data = require('../../../data/env.json');
import LoginToBBcoms from '../../pages/LoginToBBcoms';
import FeedsCommonFunctions from '../../pages/FeedsFunctions';
import WaitForExist from '../../helpers/action/waitForExist';
import lighthouse from '../../helpers/action/lighthouse';
const { url, user, password } = require('../../../data/env_data')

// Actual test scenarios
describe('Login to the Application as Support User and Add Instagram Feeds', () => {

    before('Login to the Application as Support user and Navigate to Settings', async () => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
        await LoginToBBcoms.navigateToPages('Settings');
    });

    it('Navigate to Feed Page and Add Instagram Feed', async () => {
        await  FeedsCommonFunctions.LoadFeedPage();
        await  WaitForExist(FeedPageObjects.FacebookIconImg);
        await browser.pause(3000);
        let InstagramAccountElement = `//span[contains(.,'${FeedTestData.DisplayedInstagramName}')]`;
        await FeedsCommonFunctions.RemoveFeeds(InstagramAccountElement)
        // await $(FeedPageObjects.FeedSavedSuccess).waitForDisplayed({ timeout: 10000, timeoutMsg: 'Taking more time to remove', reverse: true, interval: 1000 });
        let AccountElement = `//tr[contains(.,'${FeedTestData.DefaultInstagramName}')]`;
        let AccountElementLink = AccountElement.concat(FeedPageObjects.FeedNameLink)
        await FeedsCommonFunctions.AddSocialFeed('Instagram', AccountElement);
        await console.log(AccountElementLink)
        await FeedsCommonFunctions.ModifySocialFeed(AccountElementLink, FeedTestData.InstagramPageName, 'true')
        await  FeedsCommonFunctions.WaitForFeedAddition('Instagram');
    });

    it('Verify the Feeds has been added', async () => {
        let AccountElement = `//tr[contains(.,'${FeedTestData.DisplayedInstagramName}')]`;
        await FeedsCommonFunctions.CheckFeedCount(AccountElement, 'instagram');
        await FeedsCommonFunctions.VerifyFeedEntries(FeedTestData.InstagramAccountName);
    });

    after('Logout from the application and close the browser',async () => {
        await  browser.closeWindow();
    });

})
