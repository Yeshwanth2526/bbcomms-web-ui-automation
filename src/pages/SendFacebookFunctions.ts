import SendMessageFunctions from './SendMessageFunctions';
import CommonFunction from './CommonFunctions';
import setValue from '../helpers/action/setInputField';
import WaitForExist from '../helpers/action/WaitForExist';
import clearInputField from '../helpers/action/clearInputField';
const HomePageObjects = require('../pageobjects/HomePageObjects.json');
const SendPageObjects = require('../pageobjects/SendPageObjects.json');
import clickElement from '../helpers/action/clickElement';
import { testData } from '../../data/SendTestCaseData';

//Actual test scenarios
class SendFacebookFunctions {

    async searchSelectFbAccount() {
        await SendMessageFunctions.selectDeliveryMode('Facebook');
        await clickElement("click", "selector",SendPageObjects.selectSocialAccountFbButton);
        await $(SendPageObjects.selectFbAccountSearchValue).waitForClickable({ timeout: 15000 });
        await clearInputField(SendPageObjects.selectFbAccountSearchValue);
        let defaultAccountSelector = await SendPageObjects.selectSocialAccountFbButton.concat("//following::li[@ng-click='toggleAll(allAccounts.primary)']");
        await WaitForExist(defaultAccountSelector);
        await clickElement("click", "selector",defaultAccountSelector);
        await clickElement("click", "selector",defaultAccountSelector);
        await setValue("set", testData.FbAccount, SendPageObjects.selectFbAccountSearchValue);
        await $(SendPageObjects.selectFbAccount).waitForDisplayed({ timeout: 3000 });
        await clickElement("click", "selector",SendPageObjects.selectFbAccount);
        await clickElement("click", "selector",SendPageObjects.selectFbAccountPopupDonebutton);
    }

    FacebookFileUpload(filePath: string) {
        this.searchSelectFbAccount();
        CommonFunction.FileUpload(filePath, SendPageObjects.facebookAttachment);
        browser.pause(30000);
    }
}
export default new SendFacebookFunctions();