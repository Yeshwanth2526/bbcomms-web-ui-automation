import { expect } from 'chai';
import WaitForExist from '../helpers/action/waitForExist';
import clickElement from '../helpers/action/clickElement';
const OutboxPageObjects = require('../pageobjects/OutboxPageObjects.json');
const OrganizationObjects = require('../pageobjects/OrganizationPageObjects.json');
const SendPageObjects = require('../pageobjects/SendPageObjects.json');
import OrganizationConfigFunctions from './OrganizationConfigFunctions';
import LoginToBBcoms from './LoginToBBcoms';

class OutBoxFunctions {
    async CapitalizeString(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    async selectMessage(subjectContent: any, verify: any = true){
        var actualMessage = await(OutboxPageObjects.selectaMessage.replace('{messageSubject}', subjectContent[0]));
        await browser.pause(2000);
        console.log("subjectContent[0]"+subjectContent[0]);
        await $(actualMessage).waitForDisplayed({ timeout: 6000 });
        await browser.pause(2000);
        await clickElement("click", "selector",actualMessage);
        await browser.pause(2000);
        if(verify){
            let messageContent = await OutboxPageObjects.messageContent.replace('{messageContent}', subjectContent[0]);
            await browser.pause(2000);
            console.log("subjectContent[1]]"+subjectContent[1]);
            await WaitForExist(messageContent);
        }
    }

    async selectLatestMessage(){
        await clickElement("click", "selector",OutboxPageObjects.latestOutboxMessage);
        await WaitForExist(OutboxPageObjects.messageTrackingTabs);

    }

    async verifyAllDeliveryMethodMessages(deliveryMethods: string[]){
        var self = this;
        await deliveryMethods.forEach( async function(obj, index){
            var deliveryMode = await obj.toLowerCase();
            if(['phone', 'sms', 'email'].indexOf(deliveryMode) != -1){
                self.verifyUhuraJobCreation(deliveryMode, 0);
            }
            else if(['website', 'facebook', 'twitter'].indexOf(deliveryMode) != -1){
                let mode = await this.CapitalizeString(deliveryMode);
                self.verifySocialAndWebsiteCounts(mode);
            }
        });
        if(deliveryMethods.indexOf('web') != -1 || deliveryMethods.indexOf('Web') != -1){
             this.verifyRSSMessageInSettings();
        }
    }

    async selectMessageTrackingTab(tab: string) {
        let tabName =await tab.concat('Tab');
        await clickElement("click", "selector",OutboxPageObjects[tabName]);
        await browser.waitUntil(
            async () => await $(OutboxPageObjects[tabName]).getAttribute('aria-selected') == 'true',
            {
                timeout: 5000,
                timeoutMsg: 'Invalid tab!!!'
            }
        );
    }

    async verifyUhuraJobCreation(deliveryMode: string, pausingMS: number, negative = 'no'){
        let mode = deliveryMode.toLowerCase();
        await this.selectMessageTrackingTab('support');
        if((deliveryMode.indexOf('email') || deliveryMode.indexOf('sms') || deliveryMode.indexOf('phone')) && await  $(OutboxPageObjects.connectNotification).isDisplayed() && negative == 'no'){
            return true;
        }
        if (negative == 'yes') {
            return false;
        } else {
            // await WaitForExist(OutboxPageObjects.uhuraJobRow.replace('{deliveryMode}', mode));
        }
    }


    async verifySocialAndWebsiteCounts(deliveryMode: string){
        this.selectMessageTrackingTab('details');
        await expect(this.getSuccessCount(deliveryMode));
        await expect(this.getErrorCount(deliveryMode));
    }

    async verifyMessageDataInContent(compareData: string){
        this.selectMessageTrackingTab('content');
        let contentMsg = await $(OutboxPageObjects.verifyContentData).getText();
        await expect(contentMsg).to.equal(compareData);
    }

   
    async verifyRSSMessageInSettings(subject?: string){
        if(!subject){
             subject = await $(SendPageObjects.subjectField).getValue();
        }
        await LoginToBBcoms.navigateToPages('Settings');
        let districtName = await $(OrganizationObjects.districtOrganizationName).getText();
        await OrganizationConfigFunctions.selectOrganization(districtName);
        await OrganizationConfigFunctions.selectDeliveryOptions();
        var postedRss = await OrganizationConfigFunctions.getSentRssFeedSubject(subject);
        expect(postedRss).to.equal(subject);
    }

    async getSuccessCount(deliveryMode: string){
        return parseInt(await $(OutboxPageObjects.successCount.replace('{deliveryMethod}', deliveryMode)).getText());
    }

    async getErrorCount(deliveryMode: string) {
        return parseInt(await $(OutboxPageObjects.errorCount.replace('{deliveryMethod}', deliveryMode)).getText());
    }

}
export default new OutBoxFunctions();