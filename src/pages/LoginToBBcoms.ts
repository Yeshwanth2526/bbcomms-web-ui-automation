const loginPageObjects = require('../pageobjects/loginPageObject.json');
import clickElement from '../helpers/action/clickElement';
import isDisplay from '../helpers/check/isDisplayed';
import setValue from '../helpers/action/setInputField';
const HomePageObjects = require('../pageobjects/HomePageObject.json');

class LoginToBBcoms  { 
  
    
    async openBBCommsURL(url: string){
        await driver.url(url);
    }

    async login(name:string,password: string){
        await isDisplay(loginPageObjects.loginIdField,true);
        await setValue("set", name ,loginPageObjects.loginIdField);
        await browser.pause(5000);
        await isDisplay(loginPageObjects.passwordField,true);
        await setValue("set", password ,loginPageObjects.passwordField);
        await clickElement("click", "selector",loginPageObjects.signInButton);
       
    }
    async WaitForBackendPost(deliveryMode: any) {
        if ('email' == deliveryMode) {
            await browser.pause(10000);
        }
        else if ((['phone', 'sms'].indexOf(deliveryMode) != -1) || 'SmsEmail' == deliveryMode) {
            await browser.pause(20000);
        }
        else if ('website' == deliveryMode) {
            await browser.pause(40000);
        }
        else if (await ['facebook', 'twitter', 'all'].indexOf(deliveryMode) != -1) {
            await browser.pause(60000);
        }
    }
    async logoutFromApplication() {
        await clickElement("click", "selector",loginPageObjects.signOut);
     }
     async navigateToPages(mainMenu: string,subMenu?:any) {
        var menuObject = HomePageObjects.Menus[mainMenu + 'Menu'];
        await clickElement("click", "selector",menuObject.xpath);
        // await this.WaitForTitle(menuObject.title);
        var subMenuObject = await menuObject.subMenus[subMenu];
        if (subMenu && subMenuObject) {
            await clickElement("click", "selector",subMenuObject.xpath);
            // this.WaitForTitle(subMenuObject.title);
        }

    }
    
  
}
   



export default new LoginToBBcoms();


