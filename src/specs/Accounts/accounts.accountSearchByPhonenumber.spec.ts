const data = require('../../../data/env.json');
const AccountsPageObjects = require('../../pageobjects/AccountsPageObjects.json');
import { expect } from 'chai';
import AccountsFunctions from '../../pages/AccountsFunctions';
import LoginToBBcoms from '../../pages/LoginToBBcoms';
// import lighthouse from '../../helpers/action/lighthouse';
const { url, user, password } = require('../../../data/env_data')

describe('Login to the Application as Support User and search Account', () => {
    before('Login to the application as Support User and Navigate to Accounts Menu',async () => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
        await LoginToBBcoms.navigateToPages('Accounts', 'Manage Accounts');
    }); 

    it('#SMOKE Seach Account by invalid email address', async () => {
        await AccountsFunctions.searchAccount('Parent', 'invalidPhoneNo');
        const returnValue = await $(AccountsPageObjects.invalidSearchErrorMessage).isDisplayed();
        expect(returnValue).to.be.true;
    })

    it('#SMOKE Search Account by valid phone number', async () => {
        await AccountsFunctions.searchAccountByValidPhoneNumber();
     })


})