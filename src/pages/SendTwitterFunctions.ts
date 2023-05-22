import SendMessageFunctions from './SendMessageFunctions';
import CommonFunction from './CommonFunctions';
import setValue from '../helpers/action/setInputField';
import WaitForExist from '../helpers/action/WaitForExist';
import clearInputField from '../helpers/action/clearInputField';
const HomePageObjects = require('../pageobjects/HomePageObjects.json');
const SendPageObjects = require('../pageobjects/SendPageObjects.json');
import clickElement from '../helpers/action/clickElement';
import { testData } from '../../data/SendTestCaseData';

class SendTwitterFunctions {

   async searchSelectTwitterAccount() {
        await SendMessageFunctions.selectDeliveryMode('Twitter');
        await clickElement("click", "selector",SendPageObjects.selectSocialAccountTWITTERButton);
        await $(SendPageObjects.selectTwitterAccountSearchValue).waitForClickable({ timeout: 3000 });
        await clearInputField(SendPageObjects.selectTwitterAccountSearchValue);
        let defaultAccountSelector = await SendPageObjects.selectSocialAccountTWITTERButton.concat("//following::li[@ng-click='toggleAll(allAccounts.primary)']");
        await WaitForExist(defaultAccountSelector);
        await clickElement("click", "selector",defaultAccountSelector);
        await clickElement("click", "selector",defaultAccountSelector);
        await setValue("set", testData.TwitterAccount, SendPageObjects.selectTwitterAccountSearchValue);
        await $(SendPageObjects.selectTwitterAccount).waitForDisplayed({ timeout: 2000 });
        await clickElement("click", "selector",SendPageObjects.selectTwitterAccount);
        await clickElement("click", "selector",SendPageObjects.selectTwitterAccountPopupDonebutton);

    }

    async TwitterFileUpload(filePath: string, fileType:string) {
       await this.searchSelectTwitterAccount();
        if(fileType === 'jpg' || fileType === 'png')
        {
            CommonFunction.UploadFilesFromDirectory(filePath, SendPageObjects.twitterAttachment);
            browser.pause(20000); //Added sleep to avoid timing issues due to network connectivity
        }
        else
        {
            CommonFunction.FileUpload(filePath, SendPageObjects.twitterAttachment);
        }
    }
}
export default new SendTwitterFunctions();