import { expect } from 'chai';
import CommonFunction from './CommonFunctions';
import setValue from '../helpers/action/setInputField';
const ActivityPageObjects = require('../pageobjects/SocialActivityPageObjects.json');
import clickElement from '../helpers/action/clickElement';
import lighthouse from '../helpers/action/lighthouse';
import WaitForClickable from '../helpers/action/waitForClickable';
import WaitForExist from '../helpers/action/waitForExist';
import scroll from '../helpers/action/scroll';
import acceptAlert from '../helpers/action/acceptAlert';
const data = require('../../data/env.json');
import { SocialActivityTestData } from '../../data/SocialActivityTestCaseData';


class ActivityFunctions {

   async AddComments(Content: string, DialogBox: string, Type: string) {
        var date: string = await (new Date()).toString().split(' ').splice(1, 4).join(' ');
        var CommentsContent = `${date} : ${Content}`;
        if (await Type === 'Twitter') {
        await clickElement("click", "selector",ActivityPageObjects.TwitterReplayButton);
        }
        await setValue("set", CommentsContent, ActivityPageObjects.commentTextArea);
        await WaitForClickable(ActivityPageObjects.PostButton);
        await clickElement("click", "selector",ActivityPageObjects.PostButton);
        var CommentsContainer = await `${DialogBox}${ActivityPageObjects.commentsContainer}[contains(.,'${CommentsContent}')]`;
        await WaitForExist(CommentsContainer, '5000');
        return CommentsContainer;
    }
    async ClickMessage(Message: string) {
        if (await $(ActivityPageObjects.TwitterMessage).isClickable()) {
            await CommonFunction.MoveAndClick(Message);
        }
        else {
            await scroll(ActivityPageObjects.LastFeed)
            await this.ClickMessage(Message);
        }
    }

    async  PerformSocialActivity(Type: string) {

        var AllOrgsStatus = $(ActivityPageObjects.AllOrgs).getAttribute('class')
        if (await AllOrgsStatus == "orgGroupTitle selectedOrg") {
        await clickElement("click", "selector",ActivityPageObjects.AllOrgs);
        }
        var OrgLinkElement = `//span[contains(.,'${data.qa.organizationName.toString()}')]/parent::li`
        var OrgLinkStatus = await $(OrgLinkElement).getAttribute('class')
        if (await OrgLinkStatus != "ng-scope selectedOrg") {
            await CommonFunction.MoveAndClick(OrgLinkElement)
        }
        await $(ActivityPageObjects.FeedsContainer).waitForDisplayed({ timeout: 5000, timeoutMsg: 'Takes more load the feeds', reverse: true, interval: 1000 });
        switch (Type) {
            case 'Facebook':
                var Message =await  ActivityPageObjects.FbMessage
                var DialogBox =await  ActivityPageObjects.FbDialogBox;
                var CloseIcon = await ActivityPageObjects.FbcloseIcon;
                break;
            case 'Twitter':
                var Message =await ActivityPageObjects.TwitterMessage
                var DialogBox =await ActivityPageObjects.TwitterDialogBox;
                var CloseIcon =await ActivityPageObjects.TwitterCloseIcon;
                break;
        }
        await this.ClickMessage(Message);
        var DeleteCommenContainer = await this.AddComments(SocialActivityTestData.DeleteContent, DialogBox, Type);
        await clickElement("click", "selector",CloseIcon);
        await this.ClickMessage(Message);
        var CommentContainer = await this.AddComments(SocialActivityTestData.ReplayContent, DialogBox, Type);
        var DeleteComments = await `${DeleteCommenContainer}${ActivityPageObjects.deleteIcon}`;
        await clickElement("click", "selector",CloseIcon);
        await this.ClickMessage(Message);
        await clickElement("click", "selector",DeleteComments);
        await acceptAlert();
        var VerifyDeletedComments = await `${DeleteCommenContainer}${ActivityPageObjects.ConfirmDeletedComments}`
        await expect($(VerifyDeletedComments).getText()).to.be.equal('Deleted');
    }

}

export default new ActivityFunctions();