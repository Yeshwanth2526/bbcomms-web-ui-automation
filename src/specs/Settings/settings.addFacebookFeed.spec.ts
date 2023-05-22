/* *************************** FileName : addFacebookFeed.ts *************************

Description
    Test case file for adding Facebook feeds to the system.

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
describe('Login to the Application as Support User and Add Facebook Feeds', () => {

    before('Login to the Application as Support user and Navigate to Settings', async () => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
        await LoginToBBcoms.navigateToPages('Settings');
    });

    it('Navigate to Feed Page and Add Facebook Feed', async () => {
        await FeedsCommonFunctions.LoadFeedPage();
        await WaitForExist(FeedPageObjects.FacebookIconImg);
        let FbAccountElement = `//span[contains(.,'${FeedTestData.DisplayedFbname}')]`; 
        await FeedsCommonFunctions.RemoveFeeds(FbAccountElement)
        // await $(FeedPageObjects.FeedSavedSuccess).waitForDisplayed({ timeout: 10000, timeoutMsg: 'Facebook takes more time to remove', reverse: true, interval: 1000 });
        let AccountElement = `//tr[contains(.,'${FeedTestData.DefaultFbName}')]`;
        let AccountElementLink = AccountElement.concat(FeedPageObjects.FeedNameLink)
        await FeedsCommonFunctions.AddSocialFeed('Facebook', AccountElement);
        await FeedsCommonFunctions.ModifySocialFeed(AccountElementLink, FeedTestData.FbPageName, 'true')
        await FeedsCommonFunctions.WaitForFeedAddition('Facebook');
    });

    it('Verify the Feeds has been added', async () => {
        let AccountElement = `//tr[contains(.,'${FeedTestData.DisplayedFbname}')]`;
        await FeedsCommonFunctions.CheckFeedCount(AccountElement, 'Facebook');
        await FeedsCommonFunctions.VerifyFeedEntries(FeedTestData.FbPageName);
    });

    after('Logout from the application and close the browser', async () => {
        await browser.closeWindow();
    });
})