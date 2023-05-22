import setValue from '../helpers/action/setInputField';
const data = require('../../data/env.json');
import clickElement from '../helpers/action/clickElement';
const ImportsPageObjects = require('../pageobjects/ImportsPageObjects.json');
const HomePageObjects = require('../pageobjects/HomePageObjects.json');
import selectOption from '../helpers/action/selectOption';
import { ImportsTestData } from '../../data/ImportsTestCaseData';
import WaitForExist from '../helpers/action/waitForExist';
import AcceptAlert from '../helpers/action/acceptAlert';
import LoginToBBcoms from './LoginToBBcoms';
var ImportName : string
class ImportsCommonFunctions {
    
   async RemoveImportsData(FileName: string) {
        var FileElement =  `//td[normalize-space()='${FileName}']`;
        if (await $(FileElement).isClickable()) {
            var RemoveElement = `(${FileElement}/..)//i[@title='Remove']`;
            //let RemoveElement = browser.findElementFromElement($(FileElement).parentElement().elementId, "xpath", "//i[@title='Remove']");
        await clickElement("click", "selector",RemoveElement);
        await browser.acceptAlert();
        }
    }

    async  MoveAndClick(element: string, exist: string = 'false') {
        if (exist == 'false') {
             await WaitForExist(element);
        }
        if (await $(element).isClickable()) {
            await $(element).moveTo();
            await clickElement("click", "selector", element);
        }
    }

    async CreateDataSource(DataSourceType:string) { //Attendance
        var DatasourceName =  "Auto_" + DataSourceType;
        var DataSourceFile =  `${ImportsTestData.DataSourceLocation}${data.qa.orgExternalID}_${DataSourceType}`;
        //await this.RemoveImportsData(DatasourceName)
        await this.MoveAndClick(ImportsPageObjects.SelectAddDataSources);
        await WaitForExist(ImportsPageObjects.dataSourceName);
        await setValue("set", DatasourceName, ImportsPageObjects.dataSourceName);
        await clickElement("click", "selector",ImportsPageObjects.DataSourceFileName);
        await setValue("set", DataSourceFile, ImportsPageObjects.DataSourceFileName);
        var DataSource = `//li[text()='${DataSourceFile}.txt']`;
        await clickElement("click", "selector",DataSource);
        await clickElement("click", "selector",ImportsPageObjects.DataSourceAddButton);
        await clickElement("click", "selector",ImportsPageObjects.SelectDataElementDropDown);
        var DataElementType =  await ImportsTestData.DataElementType['AttendanceHistory']  //change
        var dataElements = `//input[@name='dataElements'][@value='${DataElementType}']`
        await this.MoveAndClick(dataElements);
        await clickElement("click", "selector",ImportsPageObjects.selectDoneDropDown);
        await selectOption("value", ImportsTestData.ParseStyle, ImportsPageObjects.SelectParseStyle)
        await clickElement("click", "selector",ImportsPageObjects.selectSaveDataSource);
        // let failureMessage = 'Data source "' + DatasourceName + '" was not saved successfully.';
        // await $(HomePageObjects.SuccessHeader).waitForDisplayed({ timeout: 10000, timeoutMsg: failureMessage });
        await LoginToBBcoms.navigateToPages('Imports');
    }

    async CreateDataSourceForDemographic() {
        let self = this;
         ImportsTestData.DataSourceType.forEach(function (obj, index) {
         self.CreateDataSource(obj);
        });
    }

    async CreateDataImports(DataSourceType: string) {
        var ImportName = DataSourceType === 'Demographic' ? `Auto_${DataSourceType}` : `Auto_${DataSourceType}_Imports`;
        await this.RemoveImportsData(ImportName)
        await this.MoveAndClick(ImportsPageObjects.SelectAddDataImports);
        await WaitForExist(ImportsPageObjects.DataImportName);
        await setValue('set',ImportName, ImportsPageObjects.DataImportName);
        await clickElement("click", "selector",ImportsPageObjects.SelectDataSourcesDropDown);
        if (DataSourceType === 'Demographic') {
            let self = this;
            ImportsTestData.DemographicDataSources.forEach(self.DataSourceSelection);
        }
        else {
            this.DataSourceSelection(DataSourceType);
        }
        await clickElement("click", "selector",ImportsPageObjects.selectDoneDropDown);
        await clickElement("click", "selector",ImportsPageObjects.selectSaveDataSource);
        await browser.pause(6000);
        // let failureMessage = 'Import "' + ImportName + '" was not saved successfully.';
        // await browser.$(HomePageObjects.SuccessHeader).waitForDisplayed({ timeout: 10000, timeoutMsg: failureMessage });
    }

    async DataSourceSelection(DataSourceType: string) {
        var DatasourceName = 'Auto_' + DataSourceType;
        var SelectDataSource = `//label[normalize-space()='${DatasourceName}']`
        await this.MoveAndClick(SelectDataSource);
    }

    //Creating the message Imports
    async CreateMessageImports(DataSourceType: string, messageTypeValue: string) {
        // Example DatasourceName : "242_Attendance (Bindhu/242_Attendance.txt)"
        var DatasourceName = `Auto_${DataSourceType} (${ImportsTestData.DataSourceLocation}${data.qa.orgExternalID}_${DataSourceType}.txt)`;
        ImportName = `Auto_${messageTypeValue}_Message`;
        await this.RemoveImportsData(ImportName);
        await this.MoveAndClick(ImportsPageObjects.SelectAutomatedMessage);
        await WaitForExist(ImportsPageObjects.ImportMessageForm);
        await this.MoveAndClick(ImportsPageObjects.AddMessageImportsButton);
        await WaitForExist(ImportsPageObjects.MessageName);
        await setValue("set",ImportName, ImportsPageObjects.MessageName);
        await selectOption("value", messageTypeValue, ImportsPageObjects.SelectMessageTypeDropDown);
        var SelectDataSource = `//label[normalize-space()='${DatasourceName}']`;
        await clickElement("click", "selector",ImportsPageObjects.SelectDataSourcesDropDown);
        await this.MoveAndClick(SelectDataSource);
        await clickElement("click", "selector",ImportsPageObjects.selectDoneDropDown);
        await clickElement("click", "selector",ImportsPageObjects.ParentDeliveryOption + ImportsPageObjects.PhoneDeliveryOption);
        await clickElement("click", "selector",ImportsPageObjects.StudentDeliveryOption + ImportsPageObjects.EmailDeliveryOption);
        return ImportName;
    }

    async saveMessageImports() {
        await clickElement("click", "selector",ImportsPageObjects.selectSaveDataImports);
        // let failureMessage = 'Message Import "' + ImportName + '" was not saved successfully.';
        // await $(HomePageObjects.SuccessHeader).waitForDisplayed({ timeout: 10000, timeoutMsg: failureMessage });
    }

    //Perform Run operion on a imports
    async RunImports(DataSourceType: string, ImportsType: string) {
        await LoginToBBcoms.navigateToPages('Imports');
        await WaitForExist(ImportsPageObjects.ImportsForm);
        var ImportName = DataSourceType === 'Demographic' ? `Auto_${DataSourceType}` : `Auto_${DataSourceType}_${ImportsType}`;
        var ImportsRunElement = `(//td[normalize-space()='${ImportName}']/..)//i[@title='Run']`;
        await clickElement("click", "selector",ImportsRunElement);
        await AcceptAlert();
        await WaitForExist(ImportsPageObjects.SearchOrganization);
        await setValue("set",data.qa.organizationName, ImportsPageObjects.SearchOrganization);
        await clickElement("click", "selector",ImportsPageObjects.SelectSearchButton);
        var SelectOrganization = `//a[normalize-space()='${data.qa.organizationName} (${data.qa.orgExternalID})']`;
        await WaitForExist(SelectOrganization);
        await clickElement("click", "selector",ImportsPageObjects.SelectSearchButton);
        await clickElement("click", "selector",SelectOrganization);
        await clickElement("click", "selector",ImportsPageObjects.RunImportButton);
        // let failureMessage = 'Run Import "' + ImportName + '" was failed to run!!!.';
        // return await browser.$(HomePageObjects.SuccessHeader).waitForDisplayed({ timeout: 10000, timeoutMsg: failureMessage });
    }

    async selctNotesAndEnterContent(importName: string) {
        await clickElement("click", "selector",ImportsPageObjects.selectNotes.replace('{messageName}', importName));
        await browser.waitUntil(async () =>
        await $(ImportsPageObjects.notesTitle).isDisplayed()
            , {
                timeout: 5000,
                timeoutMsg: "Notes Page is not displayed"
            })
        await clickElement("click", "selector",ImportsPageObjects.notesArea);
        let notesMessage = new Date().getTime() + "Testing Notes";
        await setValue("set",notesMessage, ImportsPageObjects.notesArea);
        await clickElement("click", "selector",ImportsPageObjects.saveNotes);
        return notesMessage;
    }

    async selectLog(importName: string) {
        await clickElement("click", "selector",ImportsPageObjects.selectLog.replace('{messageName}', importName));
        await WaitForExist(ImportsPageObjects.SearchOrganization);
        await setValue("set",data.qa.organizationName, ImportsPageObjects.SearchOrganization);
        await clickElement("click", "selector",ImportsPageObjects.SelectSearchButton);
        var SelectOrganization = `//a[normalize-space()='${data.qa.organizationName} (${data.qa.orgExternalID})']`;
        await WaitForExist(SelectOrganization);
        await clickElement("click", "selector",SelectOrganization);
        await clickElement("click", "selector",ImportsPageObjects.ViewImportButton);
        await clickElement("click", "selector",ImportsPageObjects.generateReport);
        await browser.pause(20000);
    }

    async scheduleImport(importName: string) {
        await clickElement("click", "selector",ImportsPageObjects.scheduleImport.replace('{messageName}', importName));
        await setValue("set",ImportsTestData.scheduleTime, ImportsPageObjects.enterScheduleTime);

        for (var i = 0; i < 7; i++) {
        await clickElement("click", "selector",ImportsPageObjects.selectingDays.replace('{dayOfWeek}', i.toString()));
            
        }
        await clickElement("click", "selector",ImportsPageObjects.clickSave);
        await  browser.waitUntil(async () =>
            (await browser.getTitle() === "Automated Messages - Blackboard"), {
            timeout: 8000,
            timeoutMsg: "Automated Messages page not displayed"
        })
    }

    async enterAttendanceCodes() {
        await setValue("set",ImportsTestData.attendanceCodeAndDescription[0], ImportsPageObjects.enterCodeDescription1);
        await clickElement("click", "selector",ImportsPageObjects.clickAddButton);
        await setValue("set",ImportsTestData.attendanceCodeAndDescription[1], ImportsPageObjects.enterCode);
        await setValue("set",ImportsTestData.attendanceCodeAndDescription[2], ImportsPageObjects.enterCodeDescription2);
        
    }

    async getImportScheduleTime(importName: string) {
        await $(ImportsPageObjects.enteredSchedule.replace('{messageName}', importName)).scrollIntoView();
        return await $(ImportsPageObjects.enteredSchedule.replace('{messageName}', importName)).getText();
    }

    async enterBalance(balance: string) {
        return await setValue("set",balance, ImportsPageObjects.balance);
    }

    async enterThreshold(thresholdValue: string) {
        return await setValue("set",thresholdValue, ImportsPageObjects.threshold);

    }

    async enterXdays(days: string) {
        return await setValue("set",days, ImportsPageObjects.xDays);
    }

    async getImportStatus() {
        return  await $("//*[@id='reportResults']/ul/b[contains(text(),'STARTED')]").getText();
    }

    async verifyEnteredNotes(importName: string) {
        await clickElement("click", "selector",ImportsPageObjects.selectNotes.replace('{messageName}', importName));
        await browser.waitUntil(async () =>
        await $(ImportsPageObjects.notesTitle).isDisplayed()
            , {
                timeout: 5000,
                timeoutMsg: "Notes Page is not displayed"
            })
        await clickElement("click", "selector",ImportsPageObjects.notesArea);
        var enteredNotes = await $(ImportsPageObjects.notesArea).getText();
        await clickElement("click", "selector",ImportsPageObjects.closeNotes);
        return enteredNotes;
    }

}

export default new ImportsCommonFunctions();