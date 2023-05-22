// /* *************************** FileName : createSurvey.ts ***************************************

// Description
//     Test case file for creating survey with all options.

// History
//     [2022-04-02]: Poornima S <poornima.sridharan@blackboard.com> :
//         - Added following response types to questions
//             - True/False
//             - Single Option Multiple choice
//             - Multi Option Multiple choice
//             - Numeric value
//             - Freeform
//         - Send created Survey message to Applicable delivery methods
//         - Create Survey message with foreign characters (Spanish) - Currently fails due to SBBCOM-1171
//         - Create Survey questions with \',\",/ which will raise warning message

// Notes

// *****************************************************************************************************/
import CommonFunction from '../../pages/CommonFunctions';
const SendPageObjects = require('../../pageobjects/SendPageObjects.json');
const HomePageObjects = require('../../pageobjects/HomePageObject.json');
const SurveysPageObjects = require('../../pageobjects/SurveysPageObjects.json');
import setValue from '../../helpers/action/setInputField';
import WaitForExist from '../../helpers/action/waitForExist';
import acceptAlert from '../../helpers/action/acceptAlert';
import LoginToBBcoms from '../../pages/LoginToBBcoms';
import clickElement from '../../helpers/action/clickElement';
import selectOption from '../../helpers/action/selectOption';
import SendFacebookFunctions from '../../pages/SendFacebookFunctions';
import SendMessageFunctions from '../../pages/SendMessageFunctions';
import SendTwitterFunctions from '../../pages/SendTwitterFunctions';
import OutBoxFunctions from '../../pages/OutBoxFunctions';
import { SurveysTestData } from '../../../data/SurveysTestCaseData';
const data = require('../../../data/env.json');
import lighthouse from '../../helpers/action/lighthouse';
const { url, user, password } = require('../../../data/env_data')

describe('Login to the Application as Support User and Create Survey', () => {
    let selectedDeliverymethods: string[];
    const surveyResponseList1 =   [SurveysTestData.surveyResponse1, SurveysTestData.surveyResponse2];
    const surveyResponseList2 =   [SurveysTestData.surveyResponse3, SurveysTestData.surveyResponse4,
                                SurveysTestData.surveyResponse5];

    before('Login to the Application as Support User and Navigate to Surveys', async () => {
        await browser.url(url)
        await browser.maximizeWindow()
        await LoginToBBcoms.login(user,password);
        await LoginToBBcoms.navigateToPages('Messages', 'Surveys');
    });

    it('Create Survey and Questions',async () => {

        const oldSurvey = `//a[contains(text(),'${SurveysTestData.surveyName}')]`;
        if (await $(oldSurvey).isExisting() && $(oldSurvey).isClickable()) {
        await clickElement("click", "selector",`${oldSurvey}/../../td[@class='selectAll']`);
        await clickElement("click", "selector",SurveysPageObjects.removeSurveyButton);
        await acceptAlert();
        await WaitForExist(HomePageObjects.SuccessHeader);
        }
        await clickElement("click", "selector",SurveysPageObjects.addSurveyButton);
        await WaitForExist(SurveysPageObjects.selectSchoolDropDown);
        await setValue("set",SurveysTestData.surveyName, SurveysPageObjects.SurveyName);
        await CommonFunction.AddQuestions(SurveysTestData.surveyQuestion1, 'YESNO')
        await WaitForExist(SurveysPageObjects.selectSchoolDropDown);
        await CommonFunction.AddQuestions(SurveysTestData.surveyQuestion2, 'AGREESCALE')
        await WaitForExist(SurveysPageObjects.selectSchoolDropDown);
        await CommonFunction.AddQuestions(SurveysTestData.surveyQuestion3, 'TRUEFALSE')
        await WaitForExist(SurveysPageObjects.selectSchoolDropDown);
        await CommonFunction.AddQuestions(SurveysTestData.surveyQuestion4, 'NUMERICVALUE')
        await WaitForExist(SurveysPageObjects.selectSchoolDropDown);
        await CommonFunction.AddQuestions(SurveysTestData.surveyQuestion5, 'SINGLEMULT',surveyResponseList1);
        await WaitForExist(SurveysPageObjects.selectSchoolDropDown);
        await CommonFunction.AddQuestions(SurveysTestData.surveyQuestion6, 'MANYMULT', surveyResponseList2);
        await WaitForExist(SurveysPageObjects.selectSchoolDropDown);
        await CommonFunction.AddQuestions(SurveysTestData.surveyQuestion7, 'FREEFORM')
        await WaitForExist(SurveysPageObjects.selectSchoolDropDown);
        await clickElement("click", "selector",SurveysPageObjects.saveButton);
        await WaitForExist(HomePageObjects.SuccessHeader);
    });

    it('Send created survey message through email', async () => {
        await LoginToBBcoms.navigateToPages('Messages');
        await SendMessageFunctions.selectSpecificSurveyMessage('Survey');
        // This timeout in the below steps is required for Survey Message to get loaded in Send module
        // page and to avoid timing issue
        await browser.pause(1000);
        await SendMessageFunctions.selectHeadlinesRecipient('High Schools','Bayside High School');
        await browser.pause(1000);
        await SendFacebookFunctions.searchSelectFbAccount();
        await SendTwitterFunctions.searchSelectTwitterAccount();
        await SendMessageFunctions.selectDeliveryMode('App');
        await WaitForExist(SendPageObjects.recipientOnlyCheckbox);
        await clickElement("click", "selector",SendPageObjects.recipientOnlyCheckbox);
        selectedDeliverymethods = await SendMessageFunctions.getSelectedDeliveryModes();
        await SendMessageFunctions.ChooseRecipient();
        await SendMessageFunctions.SendMessage();
        await CommonFunction.WaitForBackendPost('all');
        await OutBoxFunctions.selectLatestMessage();
        //await OutBoxFunctions.verifyAllDeliveryMethodMessages(selectedDeliverymethods);
    })

    it('Create Survey name with foreign characters (Spanish)', async () => {
        await LoginToBBcoms.navigateToPages('Messages', 'Surveys');
        const oldSurvey = `//a[contains(text(),'${SurveysTestData.surveyName2}')]`;
        if (await $(oldSurvey).isExisting() && $(oldSurvey).isClickable()) {
        await clickElement("click", "selector",`${oldSurvey}/../../td[@class='selectAll']`);
        await clickElement("click", "selector",SurveysPageObjects.removeSurveyButton);
        await acceptAlert();
        await WaitForExist(HomePageObjects.SuccessHeader);
        }
        await clickElement("click", "selector",SurveysPageObjects.addSurveyButton);
        await WaitForExist(SurveysPageObjects.selectSchoolDropDown);
        await selectOption('value', data.qa.orgID.toString(), SurveysPageObjects.selectSchoolDropDown);
        await setValue("set", SurveysTestData.surveyName2, SurveysPageObjects.SurveyName);
        await CommonFunction.AddQuestions(SurveysTestData.surveyQuestion8, 'YESNO')
        await WaitForExist(SurveysPageObjects.selectSchoolDropDown);
        await CommonFunction.AddQuestions(SurveysTestData.surveyQuestion9, 'AGREESCALE')
        await WaitForExist(SurveysPageObjects.selectSchoolDropDown);
        await clickElement("click", "selector",SurveysPageObjects.saveButton);
        await WaitForExist(HomePageObjects.SuccessHeader);
    });

    it('Create Survey questions with backslash and quotes', async () => {
        await LoginToBBcoms.navigateToPages('Messages', 'Surveys');
        const oldSurvey = `//a[contains(text(),'${SurveysTestData.surveyName3}')]`;
        if (await $(oldSurvey).isExisting() && $(oldSurvey).isClickable()) {
        await clickElement("click", "selector",`${oldSurvey}/../../td[@class='selectAll']`);
        await clickElement("click", "selector",SurveysPageObjects.removeSurveyButton);
        await acceptAlert();
        await WaitForExist(HomePageObjects.SuccessHeader);
        }
        await clickElement("click", "selector",SurveysPageObjects.addSurveyButton);
        await WaitForExist(SurveysPageObjects.selectSchoolDropDown);
        await selectOption('value', data.qa.orgID.toString(), SurveysPageObjects.selectSchoolDropDown);
        await setValue("set", SurveysTestData.surveyName3, SurveysPageObjects.SurveyName);
        await CommonFunction.AddQuestions(SurveysTestData.surveyQuestion10, 'YESNO', [], 'yes');
        await WaitForExist(SurveysPageObjects.selectSchoolDropDown);
        await clickElement("click", "selector",SurveysPageObjects.saveButton);
        await WaitForExist(HomePageObjects.SuccessHeader);
    });

    after('Logout from the application and close the browser', async () => {
        await browser.closeWindow();
    });


})