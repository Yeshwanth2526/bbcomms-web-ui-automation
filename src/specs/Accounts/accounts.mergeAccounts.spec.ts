import AccountsFunctions from '../../pages/AccountsFunctions';
import LoginToBBcoms from '../../pages/LoginToBBcoms';
const data = require('../../../data/env.json');
import WaitForExist from '../../helpers/action/waitForExist';
import { AccountTestData } from '../../../data/AccountsTestCaseData';
const AccountsPageObjects = require('../../pageobjects/AccountsPageObjects.json');
import clickElement from '../../helpers/action/clickElement';
import AcceptAlert from '../../helpers/action/acceptAlert';
import lighthouse from '../../helpers/action/lighthouse';
const { url, user, password } = require('../../../data/env_data')

// Actual test scenarios
describe('Login to the Application as Support User and Create an Account', () => {
    before('Login to the application as Support User and Navigate to Accounts Menu', async () => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
        await LoginToBBcoms.navigateToPages('Accounts', 'Manage Accounts');
    });

    it('#SMOKE Create Account-1', async () => {
        await browser.pause(2000)
        await AccountsFunctions.createAccount(AccountTestData.staffID,AccountTestData.password,AccountTestData.password,AccountTestData.firstName,AccountTestData.lastName,);
        await AccountsFunctions.saveCloseAccountwindow();
    });

    it('#SMOKE Create Account-2', async() => {
        await browser.pause(2000)
        await AccountsFunctions.createAccount2(AccountTestData.staffID,AccountTestData.password,AccountTestData.password,AccountTestData.firstName,AccountTestData.lastName,);
        await AccountsFunctions.saveCloseAccountwindow();
       
    });

    it('#SMOKE Merge Account 1 & 2', async () => {
        await LoginToBBcoms.navigateToPages('Accounts', 'Manage Accounts');
        await AccountsFunctions.searchAccount('Parent', 'name', AccountTestData.firstName);
        await AccountsFunctions.mergeAccounts(AccountTestData.firstName);

      
    });
    it('#SMOKE Search account by Name and delete it', async() => {
        for (let i = 0; i < 2; i++) {
            await LoginToBBcoms.navigateToPages('Accounts', 'Manage Accounts');
            if (i == 0) {
                await  AccountsFunctions.searchAccount('Parent', 'name', AccountTestData.firstName);
            } else {
                await AccountsFunctions.searchAccount('Parent', 'name', AccountTestData.firstName,data.qa.organizationName2);
            }
            await WaitForExist(AccountsPageObjects.SearchResultDiv);
        await clickElement("click", "selector",AccountsPageObjects.accountSelectCheckBox);
        await clickElement("click", "selector",AccountsPageObjects.removeAccountButton);
        await AcceptAlert();
        }
     });



    after('Logout from the application and close the browser', async () => {
        await browser.closeWindow();
    });

})