import clickElement from '../helpers/action/clickElement';
import WaitForExist from '../helpers/action/waitForExist';
const GlobalSettingsPageObjects = require('../pageobjects/GlobalSettingsPageObjects.json');
const SocialMediaPageObjects = require('../pageobjects/SocialMediaPageObjects.json');
import clearInputField from '../helpers/action/clearInputField';
import setValue from '../helpers/action/setInputField';
import LoginToBBcoms from './LoginToBBcoms';
import acceptAlert from '../helpers/action/acceptAlert';
import selectOption from '../helpers/action/selectOption';
const HomePageObjects = require('../pageobjects/HomePageObject.json');
const SurveysPageObjects = require('../pageobjects/SurveysPageObjects.json');
import click from '../helpers/action/click';
import lighthouse from '../helpers/action/lighthouse';




class CommonFunctions {
   
    async Strip(str: string) {
        return str.replace(/^\s+|\s+$/g, '');
    }

    async CapitalizeString(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
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

    

    async WaitForAttributeChange(element: string, attributeName: string, changeValue: string, ms: string =
        '10000') {
            await browser.waitUntil(
            async () => await $(element).getAttribute(attributeName) == changeValue,
            {
                timeout: parseInt(ms) || 10000,
                timeoutMsg: 'Expected Attribute change was not happened!!'
            }
        );

    }


    async FileUpload(filePath: string, element: any) {
        const remoteFilePath = await browser.uploadFile(filePath);
        await $(element).setValue(remoteFilePath);
    }

    async lighthouse() {
        const str1 = await Promise.resolve(driver.getUrl());
        const str = await Promise.resolve(driver.getTitle());
        await lighthouse(str1,str);
    }

    async  UploadFilesFromDirectory(directoryPath: string, element: string) {
        //requiring path and fs modules
        const path = await require('path');
        const fs = await require('fs');
        //joining path of directory
        var self = this;
        await fs.readdirSync(directoryPath).forEach( async file => {
            if ( !fs.lstatSync( await path.resolve(directoryPath, file)).isDirectory()) {
                await self.FileUpload(directoryPath.concat(file), element);
            }
        });
    }


    async updateGlobalSettings(values) {
        await browser.pause(2000);
        await clearInputField(GlobalSettingsPageObjects.blackoutStartTimeHours);
        await setValue("set", values.startHour, GlobalSettingsPageObjects.blackoutStartTimeHours);
        await browser.pause(2000);
        await clearInputField(GlobalSettingsPageObjects.blackoutStartTimeMinutes);
        await setValue("set", values.startMinute, GlobalSettingsPageObjects.blackoutStartTimeMinutes);
        await browser.pause(2000);
        if (await values.startMeridian !=await $(GlobalSettingsPageObjects.blackoutStartTimeMeridian).getText()) {
        await clickElement("click", "selector",GlobalSettingsPageObjects.blackoutStartTimeMeridian);
        }
        await browser.pause(2000);
        await clearInputField(GlobalSettingsPageObjects.blackoutEndTimeHours);
        await setValue("set", values.endHour, GlobalSettingsPageObjects.blackoutEndTimeHours);
        await clearInputField(GlobalSettingsPageObjects.blackoutEndTimeMinutes);
        await browser.pause(2000);
        await setValue("set", values.endMinute, GlobalSettingsPageObjects.blackoutEndTimeMinutes);
        await browser.pause(2000);
        if (await values.endMeridian != await $(GlobalSettingsPageObjects.blackoutEndTimeMeridian).getText()) {
        await clickElement("click", "selector",GlobalSettingsPageObjects.blackoutEndTimeMeridian);
        }
        await clickElement("click", "selector",GlobalSettingsPageObjects.saveSettingsButton);
        await browser.pause(2000);
        if (await $(HomePageObjects.ErrorHeader).isDisplayed()) {
            await LoginToBBcoms.navigateToPages('Settings', 'Global Settings');
            await WaitForExist(GlobalSettingsPageObjects.globalSettingsForm);
            await this.updateGlobalSettings(values);
        }
        else {
            await $(HomePageObjects.SuccessHeader).waitForDisplayed({ timeout: 10000, timeoutMsg: 'Global Settings Failed to Save within 10 seconds' });
        }
    }

   async AddQuestions(question: string, responseType: string, responseList: string[] = [], warningHeaderData = 'no') {
    await clickElement("click", "selector",SurveysPageObjects.addQuestion);
    await WaitForExist(SurveysPageObjects.selectQuestionTextField);
    await setValue("set", question, SurveysPageObjects.selectQuestionTextField);
    await  selectOption("value", responseType, SurveysPageObjects.selectResponseType);
        if (responseType == 'SINGLEMULT' || responseType == 'MANYMULT') {
            for (let i = 0; i < responseList.length ; i++) {
    await setValue("set", responseList[i], SurveysPageObjects.selectResponseField);
            }
        }
    await clickElement("click", "selector",SurveysPageObjects.saveButton);
        if (warningHeaderData == 'yes') { 
            await WaitForExist(HomePageObjects.WarningHeader);
            await browser.pause(1000);
            await clickElement("click", "selector",SurveysPageObjects.saveButton);
        } else {
            await WaitForExist(HomePageObjects.SuccessHeader);
        }
    }

    async WaitForBackendPost(deliveryMode: any) {
        if ('email' == deliveryMode) {
            await browser.pause(5000);
        }
        else if ((['phone', 'sms'].indexOf(deliveryMode) != -1) || 'SmsEmail' == deliveryMode) {
            await browser.pause(5000);
        }
        else if ('website' == deliveryMode) {
            await browser.pause(5000);
        }
        else if ( ['facebook', 'twitter', 'all'].indexOf(deliveryMode) != -1) {
            await browser.pause(5000);
        }
    }
    //random number
    async getRandomInt(min, max): Promise<number> {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    async RemoveSocialAccount(element: string) {
        await this.WaitForAttributeChange(SocialMediaPageObjects.SocialMediaAccountLoading, 'class', 'no-link ng-hide');
        if (await $(element).isClickable()) {
        await clickElement("click", "selector",element);
        await  WaitForExist(SocialMediaPageObjects.RemoveFbPage)
        await browser.pause(3000);
        await click(SocialMediaPageObjects.RemoveFbPage);
        await browser.pause(3000);
        await acceptAlert();
        }
    }

    // verifyStudentUploadedDocuments() {
    //     clickElement(AccountsPageObjects.SelectOthers);
    //     browser.waitUntil(() =>
    //         $(AccountsPageObjects.GetBalanceType).isDisplayed(),
    //         {
    //             timeout: 5000,
    //             timeoutMsg: "Page not displayed"
    //         });
    //     var type: string = $(AccountsPageObjects.GetBalanceType).getText();
    //     var actualBalance: string = $(AccountsPageObjects.GetBalanceValue).getText();
    //     clickElement(AccountsPageObjects.CloseButton);
    //     return [type, actualBalance];
    // }

    // delay = (ms: number) => {
    //     return new Promise((resolve) => setTimeout(resolve, ms));
    // };

    /********************** Procedure Name : createAccount **********************************************************
     * NAME
     *      createAccount - Procedure to create a new account and assign DeliveryAddresses
     * 
     * AUTHOR
     *      Poornima Sridharan <poornima.sridharan@blackboard.com>
     * 
     * HISTORY
     *      Created on 13-Apr-22
     * 
     * USAGE
     *      createAccount <accountList>
     * 
     * PARAMETERS DESCRIPTION
     *      accountList : string[] parameter which holds staffId, password, firstName, lastName and role.
     *      accountList(staffId, password, firstName, lastName, role)
     * 
     * USAGE EXAMPLES
     * EXAMPLE1:
     *      let accountList:String[] = ['test123', '12345', 'Poornima', 'S', 'Student'];
     *      CommonFunctions.createAccount(accountList);
     * 
     * EXAMPLE2:
     *      CommonFunctions.createAccount(['test123', '12345', 'Poornima', 'S', 'Student']);
     * 
     * EXAMPLE3:
     *      let staffId:string = 'test123', password:string = '12345', firstName:string = 'Poornima';
     *      let lastName:string = 'S', role:string = 'Student';
     * 
     *      CommonFunctions.createAccount([staffId, password, firstName, lastName, role]);
     *  
     * NOTES
     *      import CommonFunctions from 'src/pages/CommonFunctions/CommonFunctions';    
     *****************************************************************************************************************/
    // createAccount(accountList:String[]) {
    //     let staffId = accountList[0], password = accountList[1], firstName = accountList[2];
    //     let lastName = accountList[3], role = accountList[4]; 
    //     this.navigateToPages('Accounts', 'Manage Accounts');
    //     this.WaitForExist(AccountsPageObjects.CreateNewButton);
    //     clickElement(AccountsPageObjects.CreateNewButton);
    //     this.WaitForExist(AccountsPageObjects.SelectStaffIDValue);
    //     setInputField(staffId, AccountsPageObjects.SelectStaffIDValue);
    //     setInputField(password, AccountsPageObjects.SelectPasswordValue);
    //     setInputField(password, AccountsPageObjects.SelectConfirmPasswordValue);
    //     setInputField(firstName, AccountsPageObjects.SelectFirstNameValue);
    //     setInputField(lastName, AccountsPageObjects.SelectLastNameValue);
    //     selectOption("text", role, AccountsPageObjects.SelectRoleValue);
    //     selectOption("value", config.orgID.toString(), AccountsPageObjects.SelectSchoolValue);
    //     selectOption("value", 'M', AccountsPageObjects.SelectGenderValue);
    //     $(AccountsPageObjects.SelectBirthDateValue).setValue('Nov 30, 1991');
    //     enter();
    //     selectOption("value", 'en-US', AccountsPageObjects.SelectLanguageValue);
    //     ManageAccountsFunctions.saveCloseAccountwindow();
    // }

}

export default new CommonFunctions();

