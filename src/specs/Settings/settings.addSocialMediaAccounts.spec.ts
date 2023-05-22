/* *************************** FileName : addSocialMediaAccounts.ts ***********************************

Description
    Test case file for adding social media accounts in the system (facebook & twitter)

History
    [2022-03-01]: Poornima S <poornima.sridharan@blackboard.com> :  Verification step is now included in
                                                                    Allure report. Previously in after hook.

Notes
    - Facebook account added -> QA Page100
    - Twitter account added -> Karthick
    - Both accounts belong to Organization: High Schools -> "Automation Org - Do not delete"

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
describe('Login to the Application as Support User and Add Social Media account', () => {
    const TwitterAccountElement = `[contains(.,${SocialMediaTestData.TwitterAccountName})]`;
    const FbAccountElement = `[contains(.,${SocialMediaTestData.FbPageNme})]`;
    before('Login to the Application as Support user and Navigate to Settings > SocialMedia Menu', async() => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
        await LoginToBBcoms.navigateToPages('Settings', 'Social Media');
    });

    it('Add Twitter Account in SocialMedia Settings', async () => {
        const selectOrg = await SocialMediaPageObjects.SelectOrganization.replace('{orgID}', data.qa.orgID)
        await WaitForExist(selectOrg);
        await clickElement("click", "selector",selectOrg);
        // await CommonFunction.RemoveSocialAccount((SocialMediaPageObjects.SelectExistingAccount).concat(TwitterAccountElement))
        // await clickElement("click", "selector",SocialMediaPageObjects.SelectAddTwitterIcontOrg);
        // const handles =await browser.getWindowHandles()
        // await  browser.switchToWindow(handles[1])
        // await setValue("set", SocialMediaTestData.TwitterUserName, SocialMediaPageObjects.SelectTwitterUserName);
        // await setValue("set", SocialMediaTestData.TwitterPassword, SocialMediaPageObjects.SelectTwitterPassword);
        // await clickElement("click", "selector",SocialMediaPageObjects.SelectTwitterSAuthorize);
        // await browser.switchToWindow(handles[0])
    });

    it('Add Facebook Account in SocialMedia Settings', async () => {
        await CommonFunction.RemoveSocialAccount((SocialMediaPageObjects.SelectExistingAccount).concat(FbAccountElement))
        await clickElement("click", "selector",SocialMediaPageObjects.SelectAddFacebookIcon);
        const handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[1])
        await setValue("set",SocialMediaTestData.FbUserNmae, SocialMediaPageObjects.SelectFbUsername);
        await setValue("set",SocialMediaTestData.FbPassword, SocialMediaPageObjects.SelectFbPassword);
        await clickElement("click", "selector",SocialMediaPageObjects.SelectFbLoginButton);
        await WaitForExist(SocialMediaPageObjects.SelectContinueButton);
        await browser.maximizeWindow();
        if(await $(SocialMediaPageObjects.FBEditSettingsButton).isExisting())
        {
           await clickElement("click", "selector",SocialMediaPageObjects.FBEditSettingsButton);
        }
        else
        {
             await clickElement("click", "selector",SocialMediaPageObjects.SelectContinueButton);
        
        }
        await browser.pause(2000);

        if(!($(SocialMediaPageObjects.IsSelectPage).isExisting()))
        {
            await CommonFunction.MoveAndClick(SocialMediaPageObjects.SelectPage);
        }
        await clickElement("click", "selector",SocialMediaPageObjects.SelectNextButton);
        await clickElement("click", "selector",SocialMediaPageObjects.SelectDoneButton);
        await clickElement("click", "selector",SocialMediaPageObjects.SelectOkButton);
        await browser.switchToWindow(handles[0])
        await CommonFunction.MoveAndClick(SocialMediaPageObjects.SelectFbAccount)
        await CommonFunction.MoveAndClick(SocialMediaPageObjects.SelectAddFbButton)
    });

    it('Verify the Accounts has been added in Facebook', async () => {
        await LoginToBBcoms.navigateToPages('Settings', 'Social Media');
        const selectOrg = await SocialMediaPageObjects.SelectOrganization.replace('{orgID}', data.qa.orgID)
        await WaitForExist(selectOrg);
        await clickElement("click", "selector",selectOrg);
        await WaitForExist((SocialMediaPageObjects.SelectExistingAccount).concat(TwitterAccountElement))
        await WaitForExist((SocialMediaPageObjects.SelectExistingAccount).concat(FbAccountElement))
    });

    after('Logout from the application and close the browser', async () => {
        await browser.closeWindow();
    });
})
