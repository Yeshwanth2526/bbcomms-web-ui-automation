import { expect } from 'chai';
import ImportsCommonFunctions from '../../pages/ImportsFunctions';
const HomePageObjects = require('../../pageobjects/HomePageObject.json');
const ImportsPageObjects = require('../../pageobjects/ImportsPageObjects.json');
import { ImportsTestData } from '../../../data/ImportsTestCaseData';
const data = require('../../../data/env.json');
import WaitForExist from '../../helpers/action/waitForExist';
import LoginToBBcoms from '../../pages/LoginToBBcoms';
import lighthouse from '../../helpers/action/lighthouse';
const { url, user, password } = require('../../../data/env_data')

let createdImportName: string;

describe('Verify able to create a lunch balance automated message', () => {
    before('Login to the application as Support User and Navigate to Import Menu',async () => {
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
    });

    it('Verify able to Create a data source and a lunch balance automated message', async() => {
        await WaitForExist(ImportsPageObjects.DataSourceForm);
        await ImportsCommonFunctions.CreateDataSource(ImportsTestData.DataSourceType[8]);
        let ImportName = `Auto_${ImportsTestData.MessageTypeValue.LunchBalance}_Message`;
        await ImportsCommonFunctions.RemoveImportsData(ImportName);
        await LoginToBBcoms.navigateToPages('Messages');
        createdImportName = await ImportsCommonFunctions.CreateMessageImports(ImportsTestData.DataSourceType[8],
            ImportsTestData.MessageTypeValue.LunchBalance);
         await ImportsCommonFunctions.enterBalance('5');
         await ImportsCommonFunctions.saveMessageImports();
    });

    it('Verify able to Schedule the automated message import', async() => {
        await ImportsCommonFunctions.scheduleImport(createdImportName);
        expect(await(ImportsCommonFunctions.getImportScheduleTime(createdImportName))).to.equal(ImportsTestData.scheduledTimeAndDays1);
    });

    it('Verify able to Run the automated message import',async () => {
        let messageDisplayed = await ImportsCommonFunctions.RunImports(ImportsTestData.MessageTypeValue.LunchBalance, 'Message');
        // expect(await messageDisplayed).to.be.true;
    });

    it('Verify able to enter notes for the created automated message', async () => {
        let notesContent = await ImportsCommonFunctions.selctNotesAndEnterContent(createdImportName);
        expect(await(ImportsCommonFunctions.verifyEnteredNotes(createdImportName))).to.include(notesContent);
    });

    it('Verify able to view the run logs', async () => {
        await ImportsCommonFunctions.selectLog(createdImportName);
        expect(await(ImportsCommonFunctions.getImportStatus())).to.equal(ImportsTestData.importStatus);
    });

    after('Close the browser', async () => {
       await browser.closeWindow();
    });
});