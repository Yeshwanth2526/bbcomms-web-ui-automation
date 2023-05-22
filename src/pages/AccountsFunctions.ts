import clickElement from '../helpers/action/clickElement';
import clearInputField from '../helpers/action/clearInputField';
import setValue from '../helpers/action/setInputField';
import WaitForExist from '../helpers/action/waitForExist';

import WaitForClickable from '../helpers/action/waitForClickable';
import AcceptAlert from '../helpers/action/acceptAlert';
import selectOption from '../helpers/action/selectOption';
const HomePageObjects = require('../pageobjects/HomePageObjects.json');
const SendPageObjects = require('../pageobjects/SendPageObjects.json');
const AccountsPageObjects = require('../pageobjects/AccountsPageObjects.json');
const data = require('../../data/env.json');
import { AccountTestData } from '../../data/AccountsTestCaseData';
import enter from '../helpers/action/enter';
const loginPageObjects = require('../pageobjects/loginPageObject.json');
import { expect } from 'chai';



class AccountsFunctions  { 
      async navigateToPages() {
      // await WaitForExist(HomePageObjects.NotificationButton);
      // await clickElement("click", "selector",HomePageObjects.NotificationButton);
       await clickElement("click", "selector",HomePageObjects.AccountsButton);}

      async createAccount(staffID:string, password:string,password1:string,firstName:string,lastName:string){
        await clickElement("click", "selector",AccountsPageObjects.CreateNewButton);
        await browser.pause(3000);

        await setValue("set", staffID , AccountsPageObjects.SelectStaffIDValue);
        await setValue("set", password , AccountsPageObjects.SelectPasswordValue);
        await setValue("set", password1 ,  AccountsPageObjects.SelectConfirmPasswordValue);
        await setValue("set", firstName , AccountsPageObjects.SelectFirstNameValue);
        await setValue("set", lastName , AccountsPageObjects.SelectLastNameValue);
        await selectOption('text', 'Parent', AccountsPageObjects.SelectRoleValue);
        await selectOption('value', '10989', AccountsPageObjects.SelectSchoolValue);
        await selectOption('value', 'M', AccountsPageObjects.SelectGenderValue);
        await $(AccountsPageObjects.SelectBirthDateValue).setValue('Nov 30, 1991');
        await enter();
        await selectOption('value', 'en-US', AccountsPageObjects.SelectLanguageValue);
        await browser.pause(5000);
        await clickElement("click", "selector",AccountsPageObjects.SelectSaveButton);
      }

      async createAccount2(staffID:string, password:string,password1:string,firstName:string,lastName:string){
        await clickElement("click", "selector",AccountsPageObjects.CreateNewButton);
        await browser.pause(3000);

        await setValue("set", staffID , AccountsPageObjects.SelectStaffIDValue);
        await setValue("set", password , AccountsPageObjects.SelectPasswordValue);
        await setValue("set", password1 ,  AccountsPageObjects.SelectConfirmPasswordValue);
        await setValue("set", firstName , AccountsPageObjects.SelectFirstNameValue);
        await setValue("set", lastName , AccountsPageObjects.SelectLastNameValue);
        await selectOption('text', 'Parent', AccountsPageObjects.SelectRoleValue);
        await selectOption('value', '10434', AccountsPageObjects.SelectSchoolValue);
        await selectOption('value', 'M', AccountsPageObjects.SelectGenderValue);
        await $(AccountsPageObjects.SelectBirthDateValue).setValue('Nov 30, 1991');
        await enter();
        await selectOption('value', 'en-US', AccountsPageObjects.SelectLanguageValue);
        await browser.pause(5000);
        await clickElement("click", "selector",AccountsPageObjects.SelectSaveButton);
      }
      async updatePreferredLanguageOfAccounts(users: string[], languages: string[]) {
        if (users.length != languages.length) {
            await console.log("Invalid User and Language Length!!!!!!!");
            return true;
        }
        await clickElement("click", "selector",SendPageObjects.selectHomePageButton);
        await WaitForExist(HomePageObjects.accountSearch);
        for (var i = 0; i <= users.length - 1; i++) {
            let user = 'api_'.concat(data.qa[users[i] + 'UserName']);
            await clickElement("click", "selector",HomePageObjects.accountSearch);
            await clearInputField(HomePageObjects.accountSearch);
            await setValue("set", user, HomePageObjects.accountSearch);
            await enter();
            await $(HomePageObjects.accountSearchResultLoader).waitForDisplayed({
                timeout: 10000,
                timeoutMsg: "Account Search Takes long time", reverse: true, interval: 1000
            });
            let result = HomePageObjects.accountSearchResultAccount.replace('{user}', user);
            await clickElement("click", "selector",result);
            await WaitForExist(AccountsPageObjects.SelectLanguageValue);
            await selectOption("value", languages[i], AccountsPageObjects.SelectLanguageValue);
            this.saveCloseAccountwindow();
        }
    }

    async searchAccount(roleName: string, searchByValue: string, valueToBeSearched?:any, orgName = data.qa.organizationName) {
      await $(AccountsPageObjects.SelectSearchRoleValue).selectByVisibleText(roleName);
      await clearInputField(AccountsPageObjects.SelectSearchOrgVisibleValue)
      await setValue("set", orgName ,AccountsPageObjects.SelectSearchOrgVisibleValue);
      await enter();
      switch (searchByValue) {
           case "email":
              await $(AccountsPageObjects.SelectSearchPhoneOrEmailValue).clearValue();
              await setValue("set", AccountTestData.EmailId ,AccountsPageObjects.SelectSearchPhoneOrEmailValue);
              break;
          case "phone":
              await $(AccountsPageObjects.SelectSearchPhoneOrEmailValue).clearValue();
              await setValue("set", AccountTestData.phoneNo ,AccountsPageObjects.SelectSearchPhoneOrEmailValue);
              break;
          case "name":
              await $(AccountsPageObjects.SelectSearchNameValue).clearValue();
              await setValue("set", valueToBeSearched, AccountsPageObjects.SelectSearchNameValue);
              break;
          case "invalidEmail":
              await $(AccountsPageObjects.SelectSearchPhoneOrEmailValue).clearValue();
              await setValue("set", 'test@com', AccountsPageObjects.SelectSearchPhoneOrEmailValue);
              break;
          case "invalidPhoneNo":
              await $(AccountsPageObjects.SelectSearchPhoneOrEmailValue).clearValue();
              await setValue("set", '0123456789.', AccountsPageObjects.SelectSearchPhoneOrEmailValue);
              break;
          default:
              break;
      }
      await clickElement("click", "selector",AccountsPageObjects.listAccountsButton);
  }
  async withoutRequiredFields(password:string,password1:string){
    await WaitForExist(AccountsPageObjects.CreateNewButton);
    await clickElement("click", "selector",AccountsPageObjects.CreateNewButton);
    await WaitForExist(AccountsPageObjects.SelectStaffIDValue);
    await setValue("set", password, AccountsPageObjects.SelectPasswordValue);
    await setValue("set", password1 ,  AccountsPageObjects.SelectConfirmPasswordValue);
    await selectOption('text', 'Parent', AccountsPageObjects.SelectRoleValue);
    await selectOption('value', 'en-US', AccountsPageObjects.SelectLanguageValue);
    await clickElement("click", "selector",AccountsPageObjects.SelectSaveButton);
    //await $(HomePageObjects.ErrorHeader).waitForDisplayed({timeout: 10000, timeoutMsg:'Required Fields missing'});
    await clickElement("click", "selector",AccountsPageObjects.CloseErrorReport);
    await browser.pause(5000)
    await clickElement("click", "selector",AccountsPageObjects.SelectCloseButton);
    await browser.acceptAlert();
    await browser.pause(2000)

  }
  async addDeliveryAddress(type: string){
    switch (type) {
      case 'Phone':
          var SelectDeliveryAddress = AccountsPageObjects.SelectPhoneDelivaryAddress;
          var SelectValue = AccountsPageObjects.SelectPhonevalue;
          break;
      case 'Email':
          var SelectDeliveryAddress = AccountsPageObjects.SelectEmailDelivaryAddress;
          var SelectValue = AccountsPageObjects.SelectEmailIDvalue;
          break;
      case 'sms':
          var SelectDeliveryAddress = AccountsPageObjects.SelectSmsDeliveryAddress;
          var SelectValue = AccountsPageObjects.SelectSmsvalue;
          break;
      case 'mail':
          var SelectDeliveryAddress = AccountsPageObjects.SelectMailDeliveryAddress;
          var SelectAddressLine1Value = AccountsPageObjects.SelectAddressLine1;
          var SelectAddressLine2Value = AccountsPageObjects.SelectAddressLine2;
          var SelectCityValue = AccountsPageObjects.SelectCity;
          var SelectStateValue = AccountsPageObjects.SelectState;
          var SelectPostalValue = AccountsPageObjects.SelectPostalCode;
          break;
  }
  await clickElement("click", "selector",AccountsPageObjects.AddDeliveryAddressButton);
  await $(SelectDeliveryAddress).moveTo();
  await clickElement("click", "selector",SelectDeliveryAddress);
  
  if ( type == 'mail') {
      await setValue("set", AccountTestData.addressLine1, SelectAddressLine1Value);
      await setValue("set",  AccountTestData.addressLine2, SelectAddressLine2Value);
      await setValue("set", AccountTestData.city, SelectCityValue);
      await setValue("set", AccountTestData.state, SelectStateValue);
      await setValue("set", AccountTestData.pincode, SelectPostalValue);
  }
  
  else {
    switch(type){
      case 'Phone':
        await setValue("set", AccountTestData.phoneNo, SelectValue);
        break;
        case 'Email':
        await setValue("set",  AccountTestData.EmailId, SelectValue);
        break;
        case 'sms':
        await setValue("set", AccountTestData.phoneNo, SelectValue);
        break;
    
    }
  

  }
  await browser.pause(2000)
  var element =await $$(AccountsPageObjects.SelectDeliverySaveButton)
   await browser.pause(2000)
   element.forEach(async function (item) {
     if (await item.isClickable()) {
      await item.moveTo();
      await browser.pause(2000)
      await item.click();
     }
   });
// await $(HomePageObjects.SuccessHeader).waitForDisplayed({ timeout: 10000, timeoutMsg: "Delivery Address Not Saved Successfully " })
  }

  async removeDeliveryAddress(type: string) {
    //function to remove Delivery Address for the Account
    switch (type) {
        case 'Phone':
            var SelectDeliveryAddress = AccountsPageObjects.SelectPhoneDeliveryCheckBox;
            break;
        case 'Email':
            var SelectDeliveryAddress = AccountsPageObjects.SelectEmailDeliveryCheckbox;
            break;
        case 'sms':
            var SelectDeliveryAddress = AccountsPageObjects.SelectSmsDeliveryCheckbox;
            break;
        case 'mail':
            var SelectDeliveryAddress = AccountsPageObjects.SelectMailDeliveryCheckBox;
            break;
        case 'all':
            var SelectDeliveryAddress = AccountsPageObjects.accountAddressSelectAllOption;
            break;
    }
    await clickElement("click", "selector",SelectDeliveryAddress);
    await browser.pause(6000)
    await clickElement("click", "selector",AccountsPageObjects.RemoveDeliveryAddressButton);
    await AcceptAlert();
    await browser.pause(6000)
    var element = await $$(AccountsPageObjects.SelectDeliverySaveButton)
    await browser.pause(2000)
     element.forEach(async function (item, index) {
        if (await item.isClickable()) {
            await item.moveTo();
            await browser.pause(2000)
            await item.click();
        }
    });
    // await $(HomePageObjects.SuccessHeader).waitForDisplayed({ timeout: 10000, timeoutMsg: "Delivery Address Not Saved Successfully " })
}
  async editAccount(){
    await clickElement("click", "selector",AccountsPageObjects.SelectModifyAccount);
    //  await WaitForExist(AccountsPageObjects.SelectLastNameValue);
        await setValue("set", AccountTestData.NewLastName, AccountsPageObjects.SelectLastNameValue);
        await this.addDeliveryAddress('Phone');
        await driver.pause(5000)
        await this.addDeliveryAddress('Email');
        await driver.pause(5000)
        await this.addDeliveryAddress('sms');
        await driver.pause(5000)
        await this.addDeliveryAddress('mail');
        await browser.pause(5000);
        // const filePath = './src/Attachments/Gif.gif';
        // const messageElements = await browser.findElement('xpath', "//span/input[@type='button'][@value='Change']");
        // await browser.pause(5000);
        // //await CommonFunction.WaitForClickable(messageElements[0]);
        // await $(messageElements).click();
        // const remoteFilePath = await browser.uploadFile(filePath);
        // await $("//div/input[@type='file']").setValue(remoteFilePath);
        // await WaitForExist(AccountsPageObjects.deleteProfilePic);
        // await browser.pause(1000);
        // await clickElement("click", "selector",AccountsPageObjects.deleteProfilePic);
        // await AcceptAlert();
        await this.saveCloseAccountwindow();
        await browser.pause(5000);
   }

   async downloadPDFFile(){
    await WaitForExist(AccountsPageObjects.SearchResultDiv);
    await clickElement("click", "selector",AccountsPageObjects.SelectModifyAccount);
    browser.pause(7000);
    const elem = await $("//i[@id='generateFileCabinetPDFButton']");
    await elem.scrollIntoView();
    await clickElement("click", "selector",elem);
    await browser.pause(1000);
    await clickElement("click", "selector",AccountsPageObjects.generateAccountPDFButton);
    await browser.pause(2000);

   }
   async removeAccount (){
    await WaitForExist(AccountsPageObjects.SearchResultDiv);
    await clickElement("click", "selector",AccountsPageObjects.SelectModifyAccount);
    await browser.pause(5000);
    await this.removeDeliveryAddress('mail');
    await driver.pause(5000)
    await this.removeDeliveryAddress('Email');
    await driver.pause(5000)
    await this.removeDeliveryAddress('sms');
    await driver.pause(5000)
    await this.removeDeliveryAddress('Phone');
    await driver.pause(5000)
    await this.saveCloseAccountwindow();
    await browser.pause(5000);
   }
   async addAccount(){
    await clickElement("click", "selector",AccountsPageObjects.SelectModifyAccount);
    await this.addDeliveryAddress('Phone');
    await driver.pause(5000)
    await this.addDeliveryAddress('Email');
    await driver.pause(5000)
    await this.addDeliveryAddress('sms');
    await driver.pause(5000)
    await this.addDeliveryAddress('mail');
    await browser.pause(5000);
    await this.removeDeliveryAddress('all');
    await this.saveCloseAccountwindow();
    await browser.pause(5000);
   }
   async searchAccountByName (){
    await WaitForExist(AccountsPageObjects.SearchResultDiv);
    await clickElement("click", "selector",AccountsPageObjects.accountSelectCheckBox);
    await clickElement("click", "selector",AccountsPageObjects.removeAccountButton);
    await enter();

   }
   async editLatNameWithApostrophe(lastNameWithApostrophe:string){
    await clickElement("click", "selector",AccountsPageObjects.SelectModifyAccount);
    await WaitForExist(AccountsPageObjects.SelectLastNameValue);
    await clearInputField(AccountsPageObjects.SelectLastNameValue);
    await setValue("set", lastNameWithApostrophe, AccountsPageObjects.SelectLastNameValue);
    await this.saveCloseAccountwindow();
    await this.searchAccount('Parent', 'name', AccountTestData.firstName);
    await clickElement("click", "selector",AccountsPageObjects.SelectModifyAccount);
    const lastNameData = await $(AccountsPageObjects.SelectLastNameValue).getValue();
    expect(lastNameData).to.equal(lastNameWithApostrophe);
  
   }
   async searchAccountByValidEmailAddresss(){
    await WaitForExist(AccountsPageObjects.SelectSearchPhoneOrEmailValue);
    await clearInputField(AccountsPageObjects.SelectSearchPhoneOrEmailValue)
    await this.searchAccount('Parent', 'email');
    await WaitForExist(AccountsPageObjects.SearchResultDiv);
    await browser.closeWindow();

   }
   async searchAccountByValidPhoneNumber(){
    await WaitForExist(AccountsPageObjects.SelectSearchPhoneOrEmailValue);
    await clearInputField(AccountsPageObjects.SelectSearchPhoneOrEmailValue)
    await this.searchAccount('Parent', 'phone');
    await WaitForExist(AccountsPageObjects.SearchResultDiv);
    await browser.closeWindow();

   }
   async viewAccount(){
    await clickElement("click","selector",AccountsPageObjects.allButton)
    await browser.closeWindow();
   }
   async mergeAccounts(accountId:any){
    await WaitForExist(AccountsPageObjects.SearchResultDiv);
    await clickElement("click", "selector",AccountsPageObjects.SelectModifyAccount);
    await clickElement("click", "selector",AccountsPageObjects.SelectMergeAccounts);
    await setValue("set", accountId, AccountsPageObjects.SearchMergeAccounts);
    await clickElement("click", "selector",AccountsPageObjects.MergeSearchButton);
    await browser.pause(1000);
    await clickElement("click","selector",AccountsPageObjects.SelectMergeButton);
    await clickElement("click","selector", AccountsPageObjects.Accountsclosebutton);
    // let messageElements =await browser.findElements("xpath", AccountsPageObjects.SelectMergeButton);
    // await WaitForClickable(messageElements[0]);
    // await $(messageElements[0]).click();
    // await AcceptAlert();

   }

    async saveCloseAccountwindow() {
      await browser.pause(5000);
      await clickElement("click", "selector",AccountsPageObjects.SelectSaveButton);
      await browser.pause(5000);
      await clickElement("click", "selector",AccountsPageObjects.SelectCloseButton);
 }
  async forgetPassword(name:string){
      await clickElement("click", "selector",loginPageObjects.forgetPasswordLink);
      await WaitForExist(loginPageObjects.forgetPasswordLoginID);
      await setValue("set",name, loginPageObjects.forgetPasswordLoginID);
      await browser.pause(5000);
      await clickElement("click", "selector",loginPageObjects.forgetPasswordSendEmailButton);
      await browser.pause(5000);
      await WaitForExist(loginPageObjects.forgetPasswordConfirmEmailButton);
      await clickElement("click", "selector",loginPageObjects.forgetPasswordConfirmEmailButton);
      await $(loginPageObjects.forgetPasswordMailSentMessage).waitForDisplayed({ timeout: 10000, timeoutMsg: 'Message not Set successfully' })
  }

     

}
   
   



export default new AccountsFunctions();

