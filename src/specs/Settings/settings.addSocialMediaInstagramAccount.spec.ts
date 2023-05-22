/* *************************** FileName : addSocialMediaInstagramAccounts.ts ***********************************

Description
    Test case file for adding social media accounts in the system (Instagram)

History
    [2022-03-01]: Poornima S <poornima.sridharan@blackboard.com> :  Verification step is now included in
                                                                    Allure report. Previously in after hook.

Notes
    - Instagram account added -> bbcommschennai
    - Account belongs to Organization: High Schools -> "Automation Org - Do not delete"

******************************************************************************************************/
// Files to be imported
const SocialMediaPageObjects = require('../../pageobjects/SocialMediaPageObjects.json');
import setValue from '../../helpers/action/setInputField';
import WaitForExist from '../../helpers/action/waitForExist';
import LoginToBBcoms from '../../pages/LoginToBBcoms';
import CommonFunction from '../../pages/CommonFunctions';
import clickElement from '../../helpers/action/clickElement';
import { SocialMediaTestData } from '../../../data/SocialMediaTestCaseData';
const data = require('../../../data/env.json');
import getWindowSize from 'webdriverio/build/commands/browser/getWindowSize';
import lighthouse from '../../helpers/action/lighthouse';
const { url, user, password } = require('../../../data/env_data')

// Actual test scenarios
describe('Login to the Application as Support User and Add Social Media Instagram account', () => {
    const InstagramAccountElement = `[contains(.,${SocialMediaTestData.InstagramAccountName})]`;
    before('Login to the Application as Support user and Navigate to Settings > SocialMedia Menu', async () => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
        await LoginToBBcoms.navigateToPages('Settings', 'Social Media');
    });

    it('Add Instagram Account in SocialMedia Settings',async () => {
        const selectOrg = SocialMediaPageObjects.SelectScoialMediaOrganization
        // await WaitForExist(selectOrg);
        await clickElement("click", "selector",selectOrg);
        await CommonFunction.RemoveSocialAccount((SocialMediaPageObjects.SelectExistingAccount).concat(InstagramAccountElement))
        await clickElement("click", "selector",SocialMediaPageObjects.SelectAddInstagramIcon);
        const handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[1])
        await setValue("set", SocialMediaTestData.InstagramUserName, SocialMediaPageObjects.SelectInstagramUserName);
        await setValue("set", SocialMediaTestData.InstagramPassword, SocialMediaPageObjects.SelectInstageamPassword);
        await browser.pause(5000);
        await clickElement("click", "selector",SocialMediaPageObjects.SelectInstagramLoginButton);
        await browser.pause(5000);
        await clickElement("click", "selector",SocialMediaPageObjects.SelectInstagramSaveInfoButton);
        await browser.pause(5000);
        await clickElement("click", "selector",SocialMediaPageObjects.SelectInstagramAllowButton);
        await browser.pause(5000);
        await browser.switchToWindow(handles[0])
    });

    it('Verify the Accounts has been added in Instagram', async () => {
        await LoginToBBcoms.navigateToPages('Settings', 'Social Media');
        const selectOrg =await SocialMediaPageObjects.SelectScoialMediaOrganization
        await WaitForExist(selectOrg);
        await clickElement("click", "selector",selectOrg);
        await WaitForExist((SocialMediaPageObjects.SelectExistingAccount).concat(InstagramAccountElement))
    });

    after('Logout from the application and close the browser', async () => {
        await browser.closeWindow();
    });
})
