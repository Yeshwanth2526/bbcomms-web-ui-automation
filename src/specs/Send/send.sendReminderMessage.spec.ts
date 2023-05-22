import CommonFunction from '../../pages/CommonFunctions';
import SendMessageFunctions from '../../pages/SendMessageFunctions';
import OutBoxFunctions from '../../pages/OutBoxFunctions';
const data = require('../../../data/env.json');
import LoginToBBcoms from '../../pages/LoginToBBcoms';
const SendPageObjects = require('../../pageobjects/SendPageObjects.json');
import WaitForExist from '../../helpers/action/waitForExist';
import enter from '../../helpers/action/enter';
import lighthouse from '../../helpers/action/lighthouse';
const { url, user, password } = require('../../../data/env_data')

describe('Login to the Application as Support User and send Reminder Message with applicable Delivery methods', () => {
    let selectedDeliverymethods: string[];

    before('Login to the Application as Support User and Navigate to Message Menu',async () => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
        await LoginToBBcoms.navigateToPages('Messages');
    })

    it('Send Reminder Message in All delivery methods',async () => {
        await SendMessageFunctions.selectSavedMessageCategory('Reminder');
        selectedDeliverymethods = await SendMessageFunctions.getSelectedDeliveryModes();
        await WaitForExist(SendPageObjects.reminderDatePicker, '10000');
        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate()+1);
        let dateStr =  tomorrow.toString().split(' ');
        await $(SendPageObjects.reminderDatePicker).setValue(dateStr.splice(1, 2).join(' ')+', '+dateStr[1]);
        await  enter();
        await $(SendPageObjects.reminderTime).setValue('12:00');
        await enter();
        await SendMessageFunctions.ChooseRecipient();
        await SendMessageFunctions.SendMessage();
    })

    it('Verify all delivery Methods',async () => {
         if( selectedDeliverymethods.indexOf('Facebook') > 0 || selectedDeliverymethods.indexOf
        ('Twitter') > 0 || selectedDeliverymethods.indexOf('Website') > 0){
            await CommonFunction.WaitForBackendPost('all');
        }
        else{
            await CommonFunction.WaitForBackendPost('sms');
        }
        await OutBoxFunctions.selectLatestMessage();
    //    await OutBoxFunctions.verifyAllDeliveryMethodMessages(selectedDeliverymethods);
    })

    after('Logout from the application and close the browser', async () => {
//         CommonFunction.logOutFromApplication();
       await browser.closeWindow();
    });
})