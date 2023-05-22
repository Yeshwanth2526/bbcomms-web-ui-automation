import { expect } from 'chai';
import CommonFunction from './CommonFunctions';
import setValue from '../helpers/action/setInputField';
const HomePageObjects = require('../pageobjects/HomePageObject.json');
const FeedPageObjects = require('../pageobjects/FeedPageObjects.json');
import clickElement from '../helpers/action/clickElement';
const data = require('../../data/env.json');
import { FeedTestData } from '../../data/FeedTestData';
import clearInputField from '../helpers/action/clearInputField';
import WaitForExist from '../helpers/action/waitForExist';
import { Console } from 'console';

class FeedsFunctions {

    async LoadFeedPage() {
        await clickElement("click", "selector",(HomePageObjects.Menus.SettingsMenu.subMenus["App Config"].xpath));
        var selectOrganization = `//td/a[contains(text(), '${data.qa.organizationName.toString()}')]`;
        await CommonFunction.MoveAndClick(selectOrganization);
        await browser.pause(2000)
        await WaitForExist(FeedPageObjects.OrgInfoPage);
        await clickElement("click", "selector",FeedPageObjects.FeedTab);
        await WaitForExist(FeedPageObjects.FeedPageContent);
    }
    async CheckFeedCount(AccountElement: string, Type: string) {
        await this.LoadFeedPage();
        var feedCountElement = await AccountElement.concat(FeedPageObjects.EntryCount);
        if (await $(feedCountElement).isExisting()) {
            var feedCount =await $(feedCountElement).getText();
            if (await parseInt(feedCount) > 0) {
                console.log(feedCountElement);
                console.log(feedCount);
            await clickElement("click", "selector",feedCountElement);

            }
            else {
                await this.ModifySocialFeed(AccountElement.concat(FeedPageObjects.FeedNameLink));
                await this.WaitForFeedAddition(Type);
                await  this.CheckFeedCount(AccountElement, Type);
            }
        }
        else {
            await this.ModifySocialFeed(AccountElement.concat(FeedPageObjects.FeedNameLink));
            await this.WaitForFeedAddition(Type);
            await this.CheckFeedCount(AccountElement, Type);
        }
    }
    async RefreshAndSaveFeed() {
        await clickElement("click", "selector",FeedPageObjects.EditFeedRefreshButton);
        await $(FeedPageObjects.FeedSavedSuccess).waitForDisplayed({ timeout: 10000, timeoutMsg: 'Taking more time to start refresh', reverse: true, interval: 1000 });
        await clickElement("click", "selector",FeedPageObjects.EditFeedSaveBUtton);
        await $(FeedPageObjects.FeedSavedSuccess).waitForDisplayed({ timeout: 10000, timeoutMsg: 'Taking more time to Save', reverse: true, interval: 1000 });
    }
    async RemoveFeeds(element: string) {
        if (await $(element).isClickable()) {
        await clickElement("click", "selector",element);
        await WaitForExist(FeedPageObjects.EditFeedDialogBox);
        await clickElement("click", "selector",FeedPageObjects.EditFeedDeleteBUtton);
        // await  $(FeedPageObjects.FeedSavedSuccess).waitForDisplayed({ timeout: 10000, timeoutMsg: 'Taking more time to remove', reverse: true, interval: 1000 });
        }
    }

    async AddSocialFeed(Type: string , AccountElement: string) {
        switch (Type) {
            case 'Facebook':
                var FeedIcon = await FeedPageObjects.FacebookIcon;
                var InputElement =await FeedPageObjects.FeedInput1;
                var AddButton =await FeedPageObjects.AddButton1;
                break;
            case 'Twitter':
                var FeedIcon =await FeedPageObjects.TwitterIcon;
                var InputElement = await FeedPageObjects.FeedInput1;
                var AddButton = await FeedPageObjects.AddButton1;
                break;
            case 'Youtube':
                var FeedIcon = await FeedPageObjects.YoutubeIcon;
                var InputElement = await FeedPageObjects.FeedInput1;
                var AddButton =await FeedPageObjects.AddButton1;
                break;
            case 'Instagram':
                var FeedIcon = await FeedPageObjects.InstagramIcon;
                var InputElement =await FeedPageObjects.FeedInput1;
                var AddButton =await FeedPageObjects.AddButton1;
                break;
                
        }

        await CommonFunction.MoveAndClick(FeedIcon);
        // await WaitForExist(FeedPageObjects.EditFeedDialogBox);
        switch(Type){
            case 'Facebook':
              await setValue("set", FeedTestData.FbPageAddress, InputElement);
              break;
              case 'Twitter':
              await setValue("set",  FeedTestData.TwitterUserName, InputElement);
              break;
              case 'Youtube':
              await setValue("set", FeedTestData.YoutubePageName, InputElement);
              break;
              case 'Instagram':
              await setValue("set",FeedTestData.InstagramPageName, InputElement);
              break;
            }
        await CommonFunction.MoveAndClick(AddButton);
        await $(FeedPageObjects.FeedSavedSuccess).waitForDisplayed({ timeout: 10000, timeoutMsg: 'Takingmore time to add feed', reverse: true, interval: 1000 });
        $(AccountElement).waitForDisplayed({ timeout: 10000, timeoutMsg: 'Taking more time to display', reverse: true, interval: 1000 });
    }

    async ModifySocialFeed(DefaultFeedName: string, FeedName?: any, ModifyName: string = 'false') {
        await console.log(DefaultFeedName);
        await clickElement("click", "selector",DefaultFeedName);
        await WaitForExist(FeedPageObjects.EditFeedDialogBox);
        if (ModifyName === 'true') {
        await clearInputField(FeedPageObjects.FeedTitle);
        await setValue("set", FeedName, FeedPageObjects.FeedTitle);
        }
        await this.RefreshAndSaveFeed();
    }
    async WaitForFeedAddition(Type: any) {
        if ('Facebook' == Type) {
            await browser.pause(5000);//Facebook took more time to fetch the feeds
        }
        else if (['Twitter', 'Youtube','Instagram'].indexOf(Type) != -1) {
            await  browser.pause(8000);
        }

    }
    async VerifyFeedEntries(AccountName: string) {
        //$(`//h2[contains(.,'${AccountName}')]`).waitForDisplayed({ timeout: 10000, timeoutMsg: 'Taking more time to display', reverse: true, interval: 1000 });
        await WaitForExist(FeedPageObjects.FeedEntries);
        const listItems = await $$(FeedPageObjects.FeedEntries);
        expect(listItems.length).to.be.greaterThan(0);

    }
    async VerifyFeedEntryContent(Content: string) {
         var FeedEntry = `${FeedPageObjects.FeedEntries}[contains(.,'${Content}')]`;
         var FeedImage = `${FeedEntry}//img`;
        // expect($(FeedEntry).isExisting()).to.be.equal(false);
        var imgLink = await $(FeedImage).getAttribute('ng-src');
        console.log(imgLink)
        expect(imgLink).to.be.not.equal(null);
    }

}
export default new FeedsFunctions()