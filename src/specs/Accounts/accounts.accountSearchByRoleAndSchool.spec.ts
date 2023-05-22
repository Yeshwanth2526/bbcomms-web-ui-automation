import AccountsFunctions from '../../pages/AccountsFunctions';
import WaitForExist from '../../helpers/action/waitForExist';
import AccountsPageObjects from 'src/pageobjects/AccountsPageObjects.json';
import LoginToBBcoms from '../../pages/LoginToBBcoms';
const data = require('../../../data/env.json');
import { expect } from 'chai';
import lighthouse from '../../helpers/action/lighthouse';
const { url, user, password } = require('../../../data/env_data')

describe('Login to the Application as Support User and view Account', () => {
    before('Login to the application as Support User and Navigate to Accounts Menu', async () => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
        await LoginToBBcoms.navigateToPages('Accounts', 'Manage Accounts');
    })
    
    it('#SMOKE View Account', async () => {
        await AccountsFunctions.searchAccount('Parent', '');
        await AccountsFunctions.viewAccount();
    })


})