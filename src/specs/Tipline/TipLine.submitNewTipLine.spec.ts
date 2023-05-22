import CommonFunction from '../../pages/CommonFunctions';
const OrganizationObjects = require('../../pageobjects/OrganizationPageObjects.json');
import OrganizationConfigFunctions from '../../pages/OrganizationConfigFunctions';
import setValue from '../../helpers/action/setInputField';
import WaitForExist from '../../helpers/action/waitForExist';
import LoginToBBcoms from '../../pages/LoginToBBcoms';
import clickElement from '../../helpers/action/clickElement';
import selectOption from '../../helpers/action/selectOption';
import { OrganizationTestData } from '../../../data/OrganizationTestCaseData';
const data = require('../../../data/env.json');
// import lighthouse from '../../helpers/action/lighthouse';
const { url, user, password } = require('../../../data/env_data')

describe('Login to the Application as Support User and Submit a New Tipline', () => {
    let subjectAndTextValue: string[];

    before('Login to bbcomms applications as Support User and Navigate to Settings page',async () => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
        await LoginToBBcoms.navigateToPages('Settings');
    });

    it('Choose a District under Organization Config and Move to Tipline Page', async() => {
        const districtName = await $(OrganizationObjects.districtOrganizationName).getText();
        await OrganizationConfigFunctions.selectOrganization(districtName);
        await OrganizationConfigFunctions.selectTipline();
    });

    it('Create category if necessary and submit a new tip', async () => {
        await WaitForExist(OrganizationObjects.toggleWidget);
        await clickElement("click", "selector",OrganizationObjects.toggleWidget);
        await $(OrganizationObjects.widgetPreview).waitForDisplayed({timeout: 5000, timeoutMsg: 'Widget tip Widget not displayed!!'});
        await setValue("set",'This is an Automation Tip', OrganizationObjects.tipBody);
        // await selectOption("value", OrganizationTestData.TipCategory, OrganizationObjects.tipCategory);
        await selectOption('value', data.qa.orgID, OrganizationObjects.tipOrganization);
        await clickElement("click", "selector",OrganizationObjects.submitTip);
        await WaitForExist(OrganizationObjects.tipSuccessMessage);
    });

    it('Verify the submitted Tipline',async () => {
        const successText = await $(OrganizationObjects.tipSuccessMessage).getText();
        const tipID = (await successText).split(': ')[1];
        await LoginToBBcoms.navigateToPages('Reports', 'Tip Manager');
        await WaitForExist(OrganizationObjects.tipManagerTable, '20000');
        const submittedTip = await OrganizationObjects.selectTipByID.replace('{tipID}', tipID)
        await WaitForExist(submittedTip);
        await clickElement("click", "selector",submittedTip);
    })

    after('Logout from the application and close the browser', async () => {
//         CommonFunction.logOutFromApplication();
           await browser.closeWindow();
    });
});