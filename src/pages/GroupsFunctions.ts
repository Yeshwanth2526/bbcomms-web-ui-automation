import setValue from '../helpers/action/setInputField';
import LoginToBBcoms from './LoginToBBcoms';
import clickElement from '../helpers/action/clickElement';
import AcceptAlert from '../helpers/action/acceptAlert';
const HomePageObjects = require('../pageobjects/HomePageObject.json');
const SendPageObjects = require('../pageobjects/SendPageObjects.json');
const GroupsPageObjects = require('../pageobjects/GroupsPageObjects.json');
import selectOption from '../helpers/action/selectOption';
import WaitForExist from '../helpers/action/waitForExist';
import  WaitForTitle  from '../helpers/action/waitForTitle';
import { GroupsTestData } from '../../data/GroupsTestCaseData';
import SendMessageFunctions from './SendMessageFunctions';

const data = require('../../data/env.json');

class GroupsFunctions {
    
    async  MoveAndClick(element: string, exist: string = 'false') {
        if (exist == 'false') {
             await WaitForExist(element);
        }
        if (await $(element).isClickable()) {
            await $(element).moveTo();
            await clickElement("click", "selector", element);
        }
    }
    
    async RemoveGroup(GroupName: string) {
        var oldGroup = `//a[contains(text(),'${GroupName}')]/../../td[@class='selectAll']`;
        if (await $(oldGroup).isClickable()) {
            await this.MoveAndClick(oldGroup);
            await clickElement("click", "selector",GroupsPageObjects.removeGroupButton);
            await WaitForExist(GroupsPageObjects.removeConfirmDialogbox);
            await clickElement("click", "selector",GroupsPageObjects.confirmRemoveButton);
            await WaitForExist(HomePageObjects.SuccessHeader);
        }
    }


    async SetGroupsDetails(groupType: string, groupMemberType: string) {
        await LoginToBBcoms.navigateToPages('Messages', 'Groups');
        var GroupName;
        var GroupTypeId;
        if (groupType == 'Private') {
            GroupName = GroupsTestData.privateGroupNmae;
            GroupTypeId = GroupsPageObjects.selectPrivateId;
        }
        else {
            GroupTypeId = GroupsPageObjects.selectPublicId;
            if (groupMemberType == 'PERSON') {
                GroupName = GroupsTestData.personGroupName;
            }
            else {
                GroupName = GroupsTestData.queryGroupName;
            }
        }
        await this.RemoveGroup(GroupName);
        await clickElement("click", "selector",GroupsPageObjects.addButton);
        await selectOption("value", '10989', GroupsPageObjects.selectSchool);
        await setValue("set", GroupName, GroupsPageObjects.GroupsName);
        await clickElement("click", "selector",GroupTypeId);
        await selectOption("value", groupMemberType, GroupsPageObjects.selectGroupType);
    }

    async selectPerson() {
        await WaitForExist(GroupsPageObjects.SearchAccount);
        await clickElement("click", "selector",GroupsPageObjects.selectDistrictTree);
        await WaitForExist(GroupsPageObjects.selectStudentRoleTree);
        await this.MoveAndClick(GroupsPageObjects.selectStudentRoleTree);
        var SelectStudentAccount = `//*[@id="membersOrg10434"]/div[106]/a[3]`;
        // await WaitForExist(SelectStudentAccount);
        await this.MoveAndClick(SelectStudentAccount);
        await clickElement("click", "selector",SelectStudentAccount);
    }
    async SendGroupMessages(GroupName: string) {
        var selectGroup = `(//div[@id='myGroups']/div//*[contains(text(),'${GroupName}')])/../span[contains(text(),'select')]`;
        await LoginToBBcoms.navigateToPages('Messages');
        await WaitForTitle('Send - Blackboard');
        var subjectAndTextValue = await SendMessageFunctions.enterContentInTextAndSubject(GroupName, GroupsTestData.messageContent);
        SendMessageFunctions.selectDeliveryMode('Phone');
        if (await $(SendPageObjects.audioDropDown).isExisting()) {
            await selectOption("text", 'Text to speech', SendPageObjects.audioDropDown);
        }
        await SendMessageFunctions.selectDeliveryMode('Sms');
        await SendMessageFunctions.selectDeliveryMode('Email');
        await SendMessageFunctions.selectDeliveryMode('App');
        await clickElement("click", "selector",SendPageObjects.recipientOnlyCheckbox);
        await clickElement("click", "selector",SendPageObjects.chooseReceipents);
        await clickElement("click", "selector",GroupsPageObjects.selectMyGroupTree);
        await clickElement("click", "selector",selectGroup);
        await clickElement("click", "selector",SendPageObjects.selectReceipentPopupDonebutton);
        //CommonFunction.WaitForClickable(`//div[@class="tr-recipient-list ng-scope"]/div`)
        await SendMessageFunctions.SendMessage();
        return subjectAndTextValue;
    }
    async CreateQueryGroup(value:string){
    await  selectOption('value', 'QUERY', GroupsPageObjects.selectGroupType);
    await  this.MoveAndClick(GroupsPageObjects.selectSchoolOptions)
    await this.MoveAndClick(`//input[@value='10989']`)
    await clickElement("click", "selector",GroupsPageObjects.orgDoneButton);
    await this.MoveAndClick(GroupsPageObjects.selectAccountsOptions)
    await this.MoveAndClick(GroupsPageObjects.selectParentAccount)
    await clickElement("click", "selector",GroupsPageObjects.AccountDoneButton);
    await selectOption('value', 'firstName', GroupsPageObjects.selectQueryField);
    await selectOption('value', 'contains', GroupsPageObjects.selectOperationField);
    await setValue("set", value,GroupsPageObjects.selectQueryValue);
    await clickElement("click", "selector",GroupsPageObjects.previewButton);
    await AcceptAlert();
    await clickElement("click", "selector",GroupsPageObjects.SaveButton);



    }
}
export default new GroupsFunctions();