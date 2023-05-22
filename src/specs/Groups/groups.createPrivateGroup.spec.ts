const GroupsPageObjects = require('../../pageobjects/GroupsPageObjects.json');
import LoginToBBcoms from '../../pages/LoginToBBcoms';
const data = require('../../../data/env.json');
import GroupsFunctions from '../../pages/GroupsFunctions';
import OutBoxFunctions from '../../pages/OutBoxFunctions';
import clickElement from '../../helpers/action/clickElement';
import { GroupsTestData } from '../../../data/GroupsTestCaseData';
import lighthouse from '../../helpers/action/lighthouse';
const { url, user, password } = require('../../../data/env_data')

describe('Login to the Application as Support User and Create Private Group', () => {
    let subjectAndTextValue: string[];

    before('Login to the Application as Support User', async () => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
    })

    it('Navigate to Groups and create Private Group', async () => {
        await GroupsFunctions.SetGroupsDetails('Private', 'PERSON')
        await GroupsFunctions.selectPerson();
        await clickElement("click", "selector",GroupsPageObjects.SaveButton);
        subjectAndTextValue = await GroupsFunctions.SendGroupMessages(GroupsTestData.privateGroupNmae);
        await browser.pause(5000);
    })

    it('Verify the Public Groups batch created successfully', async () => {
        await LoginToBBcoms.WaitForBackendPost('sms');
        await OutBoxFunctions.selectMessage(subjectAndTextValue);
        await OutBoxFunctions.verifyAllDeliveryMethodMessages(['phone', 'sms', 'email']);
    });

    after('Logout from the application and close the browser', async () => {
//         CommonFunction.logOutFromApplication();
        await browser.closeWindow();
    });
})