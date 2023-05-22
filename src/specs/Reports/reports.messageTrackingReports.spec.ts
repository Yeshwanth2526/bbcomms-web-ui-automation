import LoginToBBcoms from '../../pages/LoginToBBcoms';
const data = require('../../../data/env.json');
import ReportsFunctions from '../../pages/ReportsFunctions';
const ReportsPageObjects = require('../../pageobjects/ReportsPageObjects.json');
import lighthouse from '../../helpers/action/lighthouse';
const { url, user, password } = require('../../../data/env_data')

describe('All Report Generate, Email and Download as a support user', () => {
    before('Login to the Application as Support user', async () => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
        await browser.pause(5000);
        await browser.refresh();
    });


    it('#SMOKE Generate, Email and Download MessageTracking Report', async() => {
        ReportsFunctions.GEDReport(ReportsPageObjects.MessageTrackingReportButton, 'MessageTracking', 'true');
    });

    after('Logout from the application and close the browser', () => {
    //         CommonFunction.logOutFromApplication();
            browser.closeWindow();
    })
});