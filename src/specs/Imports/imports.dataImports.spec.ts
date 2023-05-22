import ImportsCommonFunctions from '../../pages/ImportsFunctions';
const HomePageObjects = require('../../pageobjects/HomePageObject.json');
const ImportsPageObjects = require('../../pageobjects/ImportsPageObjects.json');
import { ImportsTestData } from '../../../data/ImportsTestCaseData';
const data = require('../../../data/env.json');
import WaitForExist from '../../helpers/action/waitForExist';
import LoginToBBcoms from '../../pages/LoginToBBcoms';
import lighthouse from '../../helpers/action/lighthouse';
const { url, user, password } = require('../../../data/env_data')

describe('Login to the Application as Support User and Add Data Source', () => {
    before('Login to the application as Support User and Navigate to Import Menu', async () => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
        await browser.pause(5000);
        await browser.refresh();
        if (!$(HomePageObjects.Menus.ImportsMenu.xpath).isClickable()) {
            await WaitForExist(HomePageObjects.WarningHeader);
            await ImportsCommonFunctions.MoveAndClick(HomePageObjects.warningClose);
        }
        await LoginToBBcoms.navigateToPages('Imports');
    })

    it('DataSource Creation', async () => {
        await WaitForExist(ImportsPageObjects.DataSourceForm);
        await ImportsCommonFunctions.CreateDataSource(ImportsTestData.SmokeDataSourceType);
    })

    it('Data Imports Creation and Running the Data Import', async () => {
        await LoginToBBcoms.navigateToPages('Imports');
        await WaitForExist(ImportsPageObjects.ImportsForm);
        await ImportsCommonFunctions.CreateDataImports(ImportsTestData.SmokeDataSourceType)
        await ImportsCommonFunctions.RunImports(ImportsTestData.SmokeDataSourceType, 'Imports');
    })

})

