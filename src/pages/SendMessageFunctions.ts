//Files to import
import clickElement from '../helpers/action/clickElement';
const SendPageObjects = require('../pageobjects/SendPageObjects.json');
const HomePageObjects = require('../pageobjects/HomePageObjects.json');
const OutboxPageObjects = require('../pageobjects/OutboxPageObjects.json');
import { testData } from '../../data/SendTestCaseData';
const data = require('../../data/env.json');
import CommonFunction from './CommonFunctions';
import click from '../helpers/action/click';
import selectOption from '../helpers/action/selectOption';
import setValue from '../helpers/action/setInputField';
import WaitForExist from '../helpers/action/waitForExist';
import WaitForClickable from '../helpers/action/waitForClickable';
import clearInputField from '../helpers/action/clearInputField';
import acceptAlert from '../helpers/action/acceptAlert';

class SendMessageFunctions {
    async CapitalizeString(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

   async selectMessageSubMenus(subMenuName: string) {
        var optionToClick;
        switch (subMenuName) {
            case 'Send':
                optionToClick = await SendPageObjects.sendMenu;
                break;
            case 'Outbox':
                optionToClick = await SendPageObjects.outBoxMenu;
                break;
            case 'Library':
                optionToClick = await SendPageObjects.libraryMenu;
                break;
        }
        await WaitForExist(optionToClick);
        await clickElement("click", "selector",optionToClick);
    }

    async selectDeliveryMode(mode: string, deliveryMethods = testData.DeliveryMethods) {
        var deliveryMode = await this.CapitalizeString(mode);
        if( deliveryMode == 'All' ||  deliveryMode == "SmsEmail"){
            let self = this;
              deliveryMethods.forEach(async function(obj, index){
                await self.selectDeliveryMode(obj);
            });
        }
        else{
            var deliveryMethod = await SendPageObjects[deliveryMode.toLowerCase()+'DeliveryMethod'];
            let selectedDeliveryMethod = await deliveryMethod.replace('unselected', 'selected')
            if( await $(selectedDeliveryMethod).isExisting()){
            browser.pause(1000)
            clickElement("click", "selector",selectedDeliveryMethod);
            }
            else{
                browser.pause(1000)
             clickElement("click", "selector",deliveryMethod);
            }
            let header = await SendPageObjects.messageContentAreaHeader;
            if( await deliveryMode == 'Sms'){ deliveryMode == 'Text / SMS'}
            // await WaitForExist(header.replace('{deliveryMethod}', deliveryMode));
        }
    }

    async getSelectedDeliveryModes(deliveryMethods = testData.DeliveryMethods){
        var selectedModes ;
        deliveryMethods.forEach(async function(obj, index){
            let selectedDeliveryMethod = obj.replace('unselected', 'selected')
            if(await $(selectedDeliveryMethod).isExisting()){
                await selectedModes.push(obj);
            }
        });
        return selectedModes;
    }

    async ChooseRecipient(roles: string[] = ['student']) {
        await clickElement("click", "selector",SendPageObjects.chooseReceipents);
        await WaitForExist(SendPageObjects.selectReceipentPopupDropdown);
        await selectOption("value", 'QUERY', SendPageObjects.selectReceipentPopupDropdown);
        await WaitForExist(SendPageObjects.selectRecipientPopupMatchORCriteria);
        var rolesLength = roles.length - 1;
        if (rolesLength > 0) {
        await clickElement("click", "selector",SendPageObjects.selectRecipientPopupMatchORCriteria);
        }
        for (var i = 0; i <= rolesLength; i++) {
                let loginID = roles[i] + 'UserName';
                let index = (i + 1).toString();
                let queryField = SendPageObjects.selectReceipentPopupQueryField.replace('{index}', index);
                let queryOperation = SendPageObjects.selectReceipentPopupQueryOperation.replace('{index}', index);
                let queryValue = SendPageObjects.selectReceipentPopupQueryValue.replace('{index}', index);

                await selectOption("value", 'loginID', queryField);
                await browser.pause(5000);
                await selectOption("text", '=', queryOperation);
                await browser.pause(5000);
                await setValue("set", data.qa[loginID], queryValue);
                if (i < rolesLength) {
                    await clickElement("click", "selector",SendPageObjects.addQueryCriteria);
    
                 }
        }
        await browser.pause(2000)
        await click(SendPageObjects.selectReceipentPopupSearchButton);
        await browser.pause(5000)
        await acceptAlert
        await clickElement("click", "selector",SendPageObjects.selectReceipentPopupDonebutton);

    }

    async selectHeadlinesRecipient(typeOfSchool: string, organizationName = data.qa.organizationName) {
        await this.selectDeliveryMode('Website');
        await WaitForExist(SendPageObjects.HeadlineAndAnnouncementTitle);
        await clickElement("click", "selector",SendPageObjects.HeadlineAndAnnouncementTitle);
        switch (typeOfSchool) {
            case 'District':
              await clickElement("click", "selector",SendPageObjects.selectDistrict);
              await clickElement("click", "selector",SendPageObjects.selectDistrictName);
                break;
            case 'High Schools':
              await clickElement("click", "selector",SendPageObjects.selectWebsiteHighSchool);
              await clickElement("click", "selector",SendPageObjects.schoolWebsiteSelection.replace('{schoolName}', organizationName));
                break;
        }
        await clickElement("click", "selector",SendPageObjects.selectAlHeadlines);
        await clickElement("click", "selector",SendPageObjects.headingLinesDoneButton);
    }

    async selectAlertRecipient(typeOfSchool: string = 'District', organizationName = data.qa.organizationName) {
        await this.selectDeliveryMode('Alert');
        await WaitForExist(SendPageObjects.alertRecipient);
        await browser.pause(2000);
        await clickElement("click", "selector",SendPageObjects.alertRecipient);
        await browser.pause(2000);
        switch (typeOfSchool) {
            case 'District':
                 await clickElement("click", "selector",SendPageObjects.selectDistrict);
                 await clickElement("click", "selector",SendPageObjects.selectDistrictName);
                break;
            case 'High Schools':
                await clickElement("click", "selector",SendPageObjects.selectAlertHighSchool);
                await clickElement("click", "selector",SendPageObjects.selectAschoolInAlert.replace('{organizationName}', organizationName));
                break;
        }
        await clickElement("click", "selector",SendPageObjects.alertDoneButton);
    }

   async enterContentInTextAndSubject(subject: string, content: string) {
        var date: string = (new Date()).toString().split(' ').splice(1, 4).join(' ');
        var subjectContent: string = `${date} : ${subject}`;
        var messageContent: string = `${date} : ${content}`;
        await browser.pause(2000);
        await WaitForExist(SendPageObjects.subjectField);
        await browser.pause(2000);
        await clickElement("click", "selector",SendPageObjects.subjectField);
        await browser.pause(2000);
        await setValue("set", subjectContent, SendPageObjects.subjectField);
        await browser.pause(2000);
        await clickElement("click", "selector",SendPageObjects.textField);
        await browser.pause(2000);
        await setValue("set", subjectContent, SendPageObjects.textField);
        await browser.pause(2000);
        return [subjectContent, messageContent];
    }


    async checkAndFillTemplate(){
        let selectedDeliveryMethod = await SendPageObjects.templateDeliveryMethod.replace('unselected', 'selected')
        await WaitForExist(selectedDeliveryMethod);
        await clickElement("click", "selector",selectedDeliveryMethod);
        let templateContent = await CommonFunction.Strip(await $(SendPageObjects.existingContentDiv).getHTML(false));
        if( templateContent.length == 0){
            var date: string = (new Date()).toString().split(' ').splice(1, 4).join(' ');
            var messageContent: string = `${date} : This is an Automated testing message`;
        await clickElement("click", "selector",SendPageObjects.textField);
        await setValue("set", messageContent, SendPageObjects.textField);

        }
    }

   async selectSavedMessageCategory(category: string){
        await WaitForExist(SendPageObjects.selectSavedMessages, '30000');
        //Timeout and browser sleep is added for Survey message to get loaded and to avoid timing issues.
        await browser.pause(1000);
        await clickElement("click", "selector",SendPageObjects.selectSavedMessages);
        var element = await SendPageObjects.selectSavedMessageCategory.replace('{messageCategory}', category);
        await WaitForExist(SendPageObjects.savedMessagedCategoryList, '10000');
        await WaitForExist(element);
        await $(element).click();
        // Select Random value from the list of Messages
        let messageElements = await browser.findElements("xpath", SendPageObjects.selectedCategoryMessagesList);
        let messageLength = await messageElements.length-1;
        messageLength = await messageLength > 10 ? 10 : messageLength;
        let choice =await CommonFunction.getRandomInt(0, messageLength);
        await WaitForClickable(messageElements[choice]);
        await $(messageElements[choice]).click();
        await WaitForExist(SendPageObjects.sendButton);
        if(category == 'Emergency'){
        await WaitForExist(SendPageObjects.setEmergencyOptions);
        await clickElement("click", "selector",SendPageObjects.setEmergencyOptions);
        }
        if(await $(SendPageObjects.copySavedMessage).isClickable())
        {
           await clickElement("click", "selector",SendPageObjects.copySavedMessage);
        //    await $(HomePageObjects.SuccessHeader).waitForDisplayed({timeout: 10000, timeoutMsg: 'Copying Saved Message was Failed!!!!'});
        //    await WaitForExist(SendPageObjects.selectedSavedMessageUnderDraft);
           await this.checkAndFillTemplate()
        }
    }

    async getLibraryMessageCategory(){
        await  this.selectMessageSubMenus('Library');
        await WaitForExist(SendPageObjects.librarySchoolMessagesTab);
        let selected = await $(SendPageObjects.librarySchoolMessagesTab).getAttribute('aria-selected');
        if(selected == 'false'){
           await clickElement("click", "selector",SendPageObjects.librarySchoolMessagesTab);
           await CommonFunction.WaitForAttributeChange(SendPageObjects.librarySchoolMessagesTab,
            'aria-selected', 'true');
        }
        let element = await SendPageObjects.libraryMessagesUnderDistrict.replace('{orgID}', data.qa.districtID);
        let categories = await browser.findElements("xpath", element.concat("/li/span[@class='link']"));
        var libraryCategoryName = ''
        for(var i=1; i <= categories.length-1; i++){
            var obj = categories[i];
            var categoryText = await $(obj).getText();
            await $(obj).click();
            await $(SendPageObjects.libraryPleaseWaitSpinner).waitForDisplayed({timeout: 10000, timeoutMsg: 'Library Message Loading long time', reverse: true});
            if( !$(SendPageObjects.noMessageFoundOnLibraryCategory).isExisting())
            {
                libraryCategoryName = categoryText;
                break;
            }
        }
        return libraryCategoryName;
    }

    async scheduleMessage(){
        await clickElement("click", "selector",SendPageObjects.advancedOptions);
        await WaitForExist(SendPageObjects.scheduleMessageStartTime);
        await clearInputField(SendPageObjects.scheduleMessageStartTime);
        await WaitForExist(SendPageObjects.scheduleTimeSelectionDiv);
        var twentyMinutesLater = new Date();
        await twentyMinutesLater.setMinutes(twentyMinutesLater.getMinutes() + 20);
        var hours = await twentyMinutesLater.getHours();
        var meridian = hours > 12 ? 'PM': 'AM';
        hours = hours > 12 ? hours - 12: hours;
		var minutes = "0" + twentyMinutesLater.getMinutes();
        var formattedTime = hours + ':' + minutes.substr(-2) + ' ' + meridian;
        await setValue("set", formattedTime, SendPageObjects.scheduleMessageStartTime);
        await clickElement("click", "selector",SendPageObjects.allowBlockOutCheckbox);
        await clickElement("click", "selector",SendPageObjects.dialogSaveButton);
        let verificationElement = SendPageObjects.checkScheduledTime.replace('{time}',formattedTime);
        await WaitForExist(verificationElement);
    }

    async checkBlackedOutTime() {
        let element = await SendPageObjects.checkScheduledTime.replace('{time}', 'Blacked Out');
        await console.log("wertyuioiuhgfdcxvghfd1111");
        if (await $(element).isExisting()) {
            await clickElement("click", "selector",SendPageObjects.advancedOption);
            await  WaitForExist(SendPageObjects.allowBlockOutCheckbox);
            await clickElement("click", "selector",SendPageObjects.allowBlockOutCheckbox);
            await clickElement("click", "selector",SendPageObjects.dialogSaveButton);
        }
    }

    async  SendMessage(ms: number = 1000) {
      // await this.checkBlackedOutTime();
        await browser.pause(1000);
        var sendButton = await $(SendPageObjects.sendButton);
        await browser.pause(1000);
        await sendButton.waitForClickable({ timeout: ms, timeoutMsg: 'Send Button is not clickable!!!' })
        await browser.pause(1000);
        await sendButton.click();
        // if (await $(HomePageObjects.ErrorHeader).isDisplayed()) {
        //     await browser.pause(2000);
        //     await sendButton.click();
        // }
        // await browser.waitUntil ( async () =>
        // await $(OutboxPageObjects.yourMessageText).isDisplayed(), {
        //     timeout: 30000,
        //     timeoutMsg: "Didn't navigate to outbox automatically"
        // })
    }

    async ChooseRecipientWithNames(nameList: string[]) {
      await  clickElement("click", "selector",SendPageObjects.chooseReceipents);
      await  WaitForExist(SendPageObjects.selectReceipentPopupDropdown);
      await  selectOption("value", 'QUERY', SendPageObjects.selectReceipentPopupDropdown);
      await  WaitForExist(SendPageObjects.selectRecipientPopupMatchORCriteria);
        var namesLength =await nameList.length - 1;
        if (namesLength > 0) {
            await  clickElement("click", "selector",SendPageObjects.selectRecipientPopupMatchORCriteria);
        }
        for (var i = 0; i <= namesLength; i++) {
                let loginID:string =await nameList[i];
                let index = (i + 1).toString();
                let queryField =await SendPageObjects.selectReceipentPopupQueryField.replace('{index}', index);
                let queryOperation =await SendPageObjects.selectReceipentPopupQueryOperation.replace('{index}', index);
                let queryValue =await SendPageObjects.selectReceipentPopupQueryValue.replace('{index}', index);

                await selectOption("value", 'loginID', queryField);
                await selectOption("text", '=', queryOperation);
                await setValue("set",nameList[i], queryValue);
                if (i < namesLength) {
                    await clickElement("click", "selector",SendPageObjects.addQueryCriteria);
                 }
        }
       
        await  clickElement("click", "selector",SendPageObjects.selectReceipentPopupSearchButton);
        await acceptAlert();
        await clickElement("click", "selector",SendPageObjects.selectReceipentPopupDonebutton);
    }

    async selectSpecificSurveyMessage (category: string = 'Survey'){
        await WaitForExist(SendPageObjects.selectSavedMessages, '30000');
        //Timeout and browser sleep is added for Survey message to get loaded and to avoid timing issues.
        await browser.pause(1000);
        await clickElement("click", "selector",SendPageObjects.selectSavedMessages);
        var element = SendPageObjects.selectSavedMessageCategory.replace('{messageCategory}', category);
        await WaitForExist(SendPageObjects.savedMessagedCategoryList, '10000');
        await WaitForExist(element);
        await $(element).click();
        let messageElements = await browser.findElements("xpath", SendPageObjects.selectedCategoryMessagesList);
        await WaitForClickable(messageElements[0]);
        await $(messageElements[0]).click();
        await WaitForExist(SendPageObjects.sendButton);
    }

}
export default new SendMessageFunctions();