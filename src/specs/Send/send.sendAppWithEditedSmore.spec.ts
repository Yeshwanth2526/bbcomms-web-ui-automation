// Files
const data = require('../../../data/env.json');
import LoginToBBcoms from '../../pages/LoginToBBcoms';
import SmoreFunctions from '../../pages/SmoreFunctions';
import SendMessageFunctions from '../../pages/SendMessageFunctions';
import OutBoxFunctions from '../../pages/OutBoxFunctions';
import setValue from '../../helpers/action/setInputField';
const SendPageObjects = require('../../pageobjects/SendPageObjects.json');
import clickElement from '../../helpers/action/clickElement';
import { testData } from '../../../data/SendTestCaseData';
import lighthouse from '../../helpers/action/lighthouse';
const { url, user, password } = require('../../../data/env_data')

// Actual test scenarios
describe('Login to the Application as Support User and send App Message using Edited Smore Template ', () => {
    let date: string = (new Date()).toString().split(' ').splice(1, 4).join(' ');
    let subject = testData.AppMessageSubject.concat(`with Smore ${date}`);

    before('Login to the Application as Support User',async () => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
    })

    it('Navigate to Email and Select Existing Smore', async () => {
        await SmoreFunctions.GoToSmore('App');
        await SmoreFunctions.loginToSmore();
        await SmoreFunctions.SelectExistingSmore('App');

    })

    it('Edit Existing News Letter',async () => {
        await SmoreFunctions.editNewsLetter();
    })

    it('Preview Smore and send email',async () => {
        await SmoreFunctions.previewAndClose();
        await setValue("set",subject, SendPageObjects.subjectField);
       // await SendMessageFunctions.ChooseRecipient();
       // await clickElement("click", "selector",SendPageObjects.recipientOnlyCheckbox);
        await SendMessageFunctions.SendMessage();
    })

    it('Verify the Push Notification batch created successfully', async () => {
        await OutBoxFunctions.selectMessage([subject]);
    });

    after('Logout from the application and close the browser', async () => {
        await browser.closeWindow();
    });
})
