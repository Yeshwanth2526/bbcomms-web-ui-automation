import GroupsFunctions from '../../pages/GroupsFunctions';
import OutBoxFunctions from '../../pages/OutBoxFunctions';
import { GroupsTestData } from '../../../data/GroupsTestCaseData';
import LoginToBBcoms from '../../pages/LoginToBBcoms';
const data = require('../../../data/env.json');
import lighthouse from '../../helpers/action/lighthouse';
const { url, user, password } = require('../../../data/env_data')





describe('Login to the Application as Support User and Create Query Group', () => {
    let subjectAndTextValue: string[];

    before('Login to the Application as Support User', async () => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
    })

    it('Navigate to Groups and Create Query Group',async () => {
        await  GroupsFunctions.SetGroupsDetails('Public', 'QUERY')
        await GroupsFunctions.CreateQueryGroup('auto');
        subjectAndTextValue = await GroupsFunctions.SendGroupMessages(GroupsTestData.queryGroupName)
    })

    it('Verify the Public Groups batch created successfully', async() => {
        await LoginToBBcoms.WaitForBackendPost('sms');
        await OutBoxFunctions.selectMessage(subjectAndTextValue);
        await OutBoxFunctions.verifyAllDeliveryMethodMessages(['phone', 'sms', 'email']);
    });

    after('Logout from the application and close the browser', async () => {
//         CommonFunction.logOutFromApplication();
        await browser.closeWindow();
    });
})