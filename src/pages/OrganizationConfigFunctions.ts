import clickElement from '../helpers/action/clickElement';
const OrganizationObjects = require('../pageobjects/OrganizationPageObjects.json');

class OrganizationConfigFunctions {

   async selectOrganization(organizationName:string){
    await clickElement("click", "selector",OrganizationObjects.selectDistrictOrganization.replace('{organizationName}', organizationName));
    }

    async selectDeliveryOptions() {
        await $(OrganizationObjects.deliveryOptions).scrollIntoView();
        await browser.waitUntil(async () =>
        await $(OrganizationObjects.deliveryOptions).isDisplayed(),
            {
                timeout: 6000,
                timeoutMsg: "Delivery Options is not displayed"
            })
        await clickElement("click", "selector",OrganizationObjects.deliveryOptions);

    
        var heading = await OrganizationObjects.orgOptionHeading.replace('{option}', 'Delivery Options');
        await browser.waitUntil(async () =>
        await $(heading).isDisplayed(),
            {
                timeout: 6000,
                timeoutMsg: "Delivery Options page is not displayed"
            })
    }

    async selectTipline() {
        await $(OrganizationObjects.tipLine).scrollIntoView();
        await browser.waitUntil(async () =>
        await  $(OrganizationObjects.tipLine).isDisplayed(),
            {
                timeout: 6000,
                timeoutMsg: "Tipline Options is not displayed"
            })
        await clickElement("click", "selector",OrganizationObjects.tipLine);
        var heading = await OrganizationObjects.orgOptionHeading.replace('{option}', 'Tip Line');
        await browser.waitUntil(async () =>
        await $(heading).isDisplayed(),
            {
                timeout: 6000,
                timeoutMsg: "Tip Line page is not displayed"
            })
    }


    async getSentRssFeedSubject(subject: string) {
        await $(OrganizationObjects.rssFeedSubject.replace('{rssSubject}', subject)).scrollIntoView();
        await browser.waitUntil(async() =>
        await $(OrganizationObjects.rssFeedSubject.replace('{rssSubject}', subject)).isDisplayed(),
            {
                timeout: 6000,
                timeoutMsg: "RSS feed not displayed"
            })
        var rssSubject = await $(OrganizationObjects.rssFeedSubject.replace('{rssSubject}', subject)).getText();
//         var rssMessage = $(OrganizationObjects.rssFeedText.replace('{rssMessage}', message)).getText();
        return rssSubject;
    }
}
export default new OrganizationConfigFunctions()