import setValue from '../helpers/action/setInputField';
import selectOption from '../helpers/action/selectOption';
import clickElement from '../helpers/action/clickElement';
import click from '../helpers/action/click';
import clearInputField from '../helpers/action/clearInputField';
import enter from '../helpers/action/enter';
const ReportsPageObjects = require('../pageobjects/ReportsPageObjects.json');
const HomePageObjects = require('../pageobjects/HomePageObjects.json');
import { reportTestData } from '../../data/ReportsTestCaseData';
const data = require('../../data/env.json');
import WaitForExist from '../helpers/action/waitForExist';
import WaitForClickable from '../helpers/action/waitForClickable';
import LoginToBBcoms from './LoginToBBcoms';
import log from '@wdio/logger';

const logger = log('@automation');


class ReportsFunctions {
    async  MoveAndClick(element: string, exist: string = 'false') {
        if (exist == 'false') {
             await WaitForExist(element);
        }
        if (await $(element).isClickable()) {
            await $(element).moveTo();
            await clickElement("click", "selector", element);
        }
    }

   async ReportScheduling(){
        await clickElement("click", "selector",ReportsPageObjects.ScheduleButton);
        await WaitForExist(ReportsPageObjects.SelectScheduleTime);
        await setValue("set", reportTestData.scheduleTime, ReportsPageObjects.SelectScheduleTime);
        await ReportsPageObjects.ToggleDays.forEach(click);
        await setValue("set", data.qa.emailAddress, ReportsPageObjects.SelectScheduleEmail);
        await clickElement("click", "selector",ReportsPageObjects.SelectScheduleConfirmButton);
        // await $(HomePageObjects.SuccessHeader).waitForDisplayed({timeout: 10000, timeoutMsg: 'Report Not Scheduled!!!'});
    }

    async WaitForReportToBeGenerated(){
        await $(ReportsPageObjects.PleaseWaitSpinner).waitForDisplayed({timeout: 240000, timeoutMsg: 'Report generation takes more than 3 minutes', reverse: true, interval:1000});
        await $(ReportsPageObjects.PleaseWaitProgress).waitForDisplayed({timeout: 240000, timeoutMsg: 'Report display progress taking more than 10 secs', reverse: true, interval:1000});
    }

    async GenerateReport(reportName:string){
        await clickElement("click", "selector",ReportsPageObjects.GenerateReportButton);
        await this.WaitForReportToBeGenerated();
        let exportButton = await ReportsPageObjects.ExportButton;
        if(await $(ReportsPageObjects.NoRecordsFound).isExisting()){
            if(await $(ReportsPageObjects.SelectDateValue).getValue() == 'lastweek')
            {
                await logger.info(`${reportName} doesn't have data for last 1 week trying last 1 month
                record to test the Download and Email functionality`);
                await selectOption('value', 'lastmonth', ReportsPageObjects.SelectDateValue);
                return this.GenerateReport(reportName);
            }
            else{
                await logger.warn(`${reportName} doesn't have data for last 1 month. So skipping Export
                and Download functionality`);
                return false;
            }
        }
        else{

            if(await $(exportButton).isExisting()){
                await WaitForClickable(exportButton);
                return $(exportButton).isClickable();
            }
            return false;
        }
    }

    async DownloadReport(){
        await this.MoveAndClick(ReportsPageObjects.ExportButton);
        await browser.pause(5000);
        await WaitForClickable(ReportsPageObjects.DownloadResultsButton, '10000');
        await browser.pause(2000);
        await this.MoveAndClick(ReportsPageObjects.DownloadResultsButton);
        await $(ReportsPageObjects.PleaseWaitSpinner).waitForDisplayed({timeout: 160000, timeoutMsg: 'Report Download takes more than 2 minutes', reverse: true, interval:1000});       // await console.log("55555555555555")
        // await WaitForExist(ReportsPageObjects.DownloadFile);
        await browser.pause(5000);
    //    await $(ReportsPageObjects.DownloadFile).parentElement().click();
    }

    async EmailReport(){
        var exportButton = await ReportsPageObjects.ExportButton;
        await browser.pause(5000);
        await WaitForClickable(exportButton, '20000');
        await this.MoveAndClick(exportButton);
        await WaitForExist(ReportsPageObjects.SelectEmailValue);
        await setValue("set", data.qa.emailAddress, ReportsPageObjects.SelectEmailValue);
        await enter();
        await browser.waitUntil(
            async () => ( (await $(ReportsPageObjects.SelectEmailSentConfirmation).getText()).includes(reportTestData.emailSentConfirmation)),
            {
                timeout: 120000,
                timeoutMsg: 'expected email sent confirmation'
            }
        );
        await enter();
    }

    async  GEDReport(element: string, reportType: string, schedule: string = 'false'){
        await LoginToBBcoms.navigateToPages('Reports');
        var self = this;
        if (await $(element).isClickable()) {
            await this.MoveAndClick(element, 'true');
            if(reportType == 'TeacherReport'){
                let districtName = await browser.execute(async (el) => {
                        return ( el).options[1].text;
                    },
                    await  $(ReportsPageObjects.TCR_OrgSelect)
                );
                await WaitForExist(ReportsPageObjects.TCR_SelectSchool);
                await clearInputField(ReportsPageObjects.TCR_SelectSchool);
                await setValue("set", districtName, ReportsPageObjects.TCR_SelectSchool);
                await enter();
                let noTeacherPath = await ReportsPageObjects.TCR_SelectTeacherValue + "/option[normalize-space()='-- Choose a school --']";
                await $(noTeacherPath).waitForDisplayed({timeout: 3000, timeoutMsg: 'No Teacher found on District "'+districtName+'"', reverse: true})
                await $(ReportsPageObjects.TCR_SelectTeacherValue).selectByIndex(0);
                let noSectionPath = await ReportsPageObjects.TCR_SelectSectionValue + "/option[normalize-space()='-- No active sections --']";
                await $(noSectionPath).waitForDisplayed({timeout: 3000, timeoutMsg: 'No Section found!!', reverse: true})
                let loadingSectionPath = await ReportsPageObjects.TCR_SelectSectionValue + "/option[normalize-space()='Loading...']";
                await $(loadingSectionPath).waitForDisplayed({timeout: 3000, timeoutMsg: 'No Section found!!', reverse: true})
                await $(ReportsPageObjects.TCR_SelectSectionValue).selectByIndex(0);
            }
            else if(reportTestData.reportsWithoutDateFilter.indexOf(reportType) == -1){
                await WaitForExist(ReportsPageObjects.SelectDateValue);
                await selectOption('value', 'lastweek', ReportsPageObjects.SelectDateValue);
            }

            if(schedule == 'true')
            {
                await self.ReportScheduling();
            }

            if(reportType != 'TeacherMessage')
            {
                // Generate Report
                var exportReport = await self.GenerateReport(reportType);

                // Export
                if (exportReport) {
                    // Test export via download option
                    await browser.pause(5000);
                    await self.DownloadReport();

                    // Test export via email option
                    await self.EmailReport();
                }
            }
            else{
                await clickElement("click", "selector",ReportsPageObjects.GenerateReportButton);
                await this.WaitForReportToBeGenerated();
                await this.MoveAndClick(ReportsPageObjects.TMR_SelectReportDownload);

                await $(ReportsPageObjects.PleaseWaitSpinner).waitForDisplayed({timeout: 120000, timeoutMsg: 'Report Download takes more than 2 minutes', reverse: true, interval:1000});
            }

        }
    }
}

export default new ReportsFunctions();