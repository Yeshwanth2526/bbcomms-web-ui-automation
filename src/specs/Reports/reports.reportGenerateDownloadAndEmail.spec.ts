import LoginToBBcoms from '../../pages/LoginToBBcoms';
const data = require('../../../data/env.json');
import ReportsFunctions from '../../pages/ReportsFunctions';
const ReportsPageObjects = require('../../pageobjects/ReportsPageObjects.json');
import lighthouse from '../../helpers/action/lighthouse';
const { url, user, password } = require('../../../data/env_data')

// Actual test scenarios
describe('All Report Generate, Email and Download as a support user', () => {
    before('Login to the Application as Support user', async() => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
        await browser.pause(5000);
        await browser.refresh();
    });

    it('Generate, Email and Download Parent Report', async () => {
        await ReportsFunctions.GEDReport(ReportsPageObjects.ParentReportButton, 'ParentReport');
    });

    it('Generate, Email and Download Student Report', async () => {
        await ReportsFunctions.GEDReport(ReportsPageObjects.StudentReportButton, 'StudenReport');
    });

    it('Generate, Email and Download Staff Report', async () => {
        await ReportsFunctions.GEDReport(ReportsPageObjects.StaffReportButton, 'StaffReport');
    });

    it('Generate, Email and Download Teacher Report', async () => {
        await ReportsFunctions.GEDReport(ReportsPageObjects.TeacherClassReportButton, 'TeacherReport');
    });

    it('Generate, Email and Download School Report', async () => {
        await ReportsFunctions.GEDReport(ReportsPageObjects.SchoolReportButton, 'SchoolReport', 'true');
    });

    // it('Generate, Email and Download Login Report', async () => {
    //     await ReportsFunctions.GEDReport(ReportsPageObjects.LoginReportButton, 'LoginReport');
    // });

    // it('Generate, Email and Download BadAddress Report', async () => {
    //     await ReportsFunctions.GEDReport(ReportsPageObjects.BadPhoneEmailReportButton, 'BadAddressReport', 'true');
    // });

    // it('Generate, Email and Download ChangeLog Report', async () => {
    //     await ReportsFunctions.GEDReport(ReportsPageObjects.ChangeLogReportButton, 'ChangeLogReport', 'true');
    // });

    // it('Generate, Email and Download Contact Report', async () => {
    //     await ReportsFunctions.GEDReport(ReportsPageObjects.ContactReportButton, 'ContactReport', 'true');
    // });

    // it('Generate, Email and Download Absense Report', async () => {
    //     await ReportsFunctions.GEDReport(ReportsPageObjects.ExcusedAbsenseReportButton, 'AbsenseReport', 'true');
    // });

    // it('Generate, Email and Download MessageTracking Report', async () => {
    //     await ReportsFunctions.GEDReport(ReportsPageObjects.MessageTrackingReportButton, 'MessageTracking', 'true');
    // });

    // it('Generate, Email and Download MessageTrending Report', async () => {
    //     await ReportsFunctions.GEDReport(ReportsPageObjects.MessageTrendReportButton, 'MessageTrending');
    // });

    // it('Generate, Email and Download MessageUtilization Report', async () => {
    //     await ReportsFunctions.GEDReport(ReportsPageObjects.MessageUtilReportButton, 'MessageUtilization');
    // });

    // it('Generate, Email and Download Teacher Messaging Report', async () => {
    //     await ReportsFunctions.GEDReport(ReportsPageObjects.TeacherMessageReportButton, 'TeacherMessage', 'true');
    // });

    // it('Generate, Email and Download Analytics Report', async () => {
    //     await ReportsFunctions.GEDReport(ReportsPageObjects.PostAnalyticsReportButton, 'Analytics');
    // });

    // it('Generate, Email and Download SystemStatistics Report',async () => {
    //     await ReportsFunctions.GEDReport(ReportsPageObjects.SystemStatReportButton, 'SystemStatistics');

    // });

    // it('Generate, Email and Download SystemUtilization Report', async () => {
    //     await ReportsFunctions.GEDReport(ReportsPageObjects.SystemUtilReportButton, 'SystemUtilization');
    // });

    // it('Generate, Email and Download Settings Report', async () => {
    //     await ReportsFunctions.GEDReport(ReportsPageObjects.SettingReportButton, 'Settings');
    // });

    after('Logout from the application and close the browser', async() => {
        await browser.closeWindow();
    });
})
