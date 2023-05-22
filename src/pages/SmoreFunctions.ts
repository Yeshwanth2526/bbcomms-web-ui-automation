import SendMessageFunctions from './SendMessageFunctions';
import CommonFunction from './CommonFunctions';
const SendPageObjects = require('../pageobjects/SendPageObjects.json');
import clickElement from '../helpers/action/clickElement';
import switchToFrame from '../helpers/action/switchToIframe';
import AcceptAlert from '../helpers/action/acceptAlert';
import setValue from '../helpers/action/setInputField';
import WaitForClickable from '../helpers/action/WaitForClickable';
import WaitForExist from '../helpers/action/WaitForExist';
import clearInputField from '../helpers/action/clearInputField';
import { testData } from '../../data/SendTestCaseData';
import LoginToBBcoms from './LoginToBBcoms';

class SmoreFunctions {

    async moveToDelivaryMethod(delivaryMethod: string) {
        await LoginToBBcoms.navigateToPages('Messages');
        await SendMessageFunctions.selectDeliveryMode(delivaryMethod);
    }

    async SelectExistingSmore(delivaryMethod: string) {
        await  this.moveToDelivaryMethod(delivaryMethod);
        var SmoreIcon = await `(//div[normalize-space()='${delivaryMethod}']/..)${SendPageObjects.selectSmoreTeplate}`;
        //var newsLetter = `//option[contains(.,'${testData.NewsletterTitle}')]`
        var newsLetter = await "//option[contains(.,'Automation Test For Smore Template')]"
        await WaitForClickable(SmoreIcon);
        await clickElement("click", "selector",SmoreIcon);
        await WaitForExist(SendPageObjects.SmoreNewsletterDialog);
        await clickElement("click", "selector",newsLetter);
    }

    async GoToSmore(delivaryMethod: string) {
        await this.moveToDelivaryMethod(delivaryMethod);
        var SmoreIcon = await`(//div[normalize-space()='${delivaryMethod}']/..)${SendPageObjects.selectSmore}`;
        await WaitForClickable(SmoreIcon);
        await clickElement("click", "selector",SmoreIcon);
        await CommonFunction.MoveAndClick(SendPageObjects.selectCreateNewsLetter);
        let SmoreFrame = await SendPageObjects.SmoreIframe;
        await WaitForExist(SmoreFrame)
        await switchToFrame(SmoreFrame)
    }

    async loginToSmore() {
        await clickElement("click", "selector",SendPageObjects.selectSmoreLoginOthers);
        await WaitForExist(SendPageObjects.selectSmoreUsername);
        await setValue("set",testData.SmoreUsername, SendPageObjects.selectSmoreUsername);
        await setValue("set",testData.SmorePassword, SendPageObjects.selectSmorePassword);
        await WaitForExist(SendPageObjects.selectSmoreLogin);
        await clickElement("click", "selector",SendPageObjects.selectSmoreLogin);
        await browser.switchToFrame(null);
    }
    async createNewsLetter() {
        await clickElement("click", "selector",SendPageObjects.selectStartNewsletter);
        await WaitForExist("//*[normalize-space()='Create a gorgeous newsletter']");
        var rind = await CommonFunction.getRandomInt(1, 5).toString();
        await clickElement("click", "selector",SendPageObjects.selectNewsletterType.concat(`[${rind}]`));
        await WaitForExist(SendPageObjects.selectEditTitle, '10000');
        await clickElement("click", "selector",SendPageObjects.selectEditTitle);
        await setValue("set",testData.NewsletterTitle, SendPageObjects.selectTitle);
        await setValue("set",testData.NewsletterSubTitle, SendPageObjects.selectSubTitle);
        await clickElement("click", "selector",SendPageObjects.selectTitleEditDone);
        await WaitForExist(SendPageObjects.selectDoneEditing);
        await clickElement("click", "selector",SendPageObjects.selectDoneEditing);
        await browser.switchToFrame(null);
    }
    async previewAndClose() {
        await WaitForExist(SendPageObjects.selectSmoreClosePreviewIcon, '10000');
        await CommonFunction.MoveAndClick(SendPageObjects.selectSmoreClosePreviewIcon)
        await WaitForExist(SendPageObjects.subjectField);
    }
    async editNewsLetter() {
        await clickElement("click", "selector",SendPageObjects.SmoreEditButton);
        let SmoreFrame = await SendPageObjects.SmoreIframe;
        await WaitForExist(SmoreFrame);
        await switchToFrame(SmoreFrame);
        await WaitForClickable(SendPageObjects.EditNewsLetter);
        await CommonFunction.MoveAndClick(SendPageObjects.EditNewsLetter)
        //clickElement(SendPageObjects.EditNewsLetter);
        await clearInputField(SendPageObjects.selectTitle)
        await setValue("set",testData.ModifiedNewsletterTitle, SendPageObjects.selectTitle);
        await clickElement("click", "selector",SendPageObjects.selectTitleEditDone);
        await WaitForExist(SendPageObjects.selectUpdateButton);
        await clickElement("click", "selector",SendPageObjects.selectUpdateButton);
        await browser.pause(10000)
        await browser.switchToFrame(null);
    }
    async deleteNewsLetter() {
        await clickElement("click", "selector",SendPageObjects.SmoreDeleteButton);
        await AcceptAlert();
    }
}

export default new SmoreFunctions();

