const InboxPageObjects = require('../pageobjects/InboxPageObjects.json');

class InBoxFunctions {
    async CheckMessage(subjectContent: any) {
        var actualMessage = await (InboxPageObjects.selectaMessage.replace('{messageSubject}', subjectContent[0]));
        await $(actualMessage).waitForDisplayed({ timeout: 6000 });
        if (await $(actualMessage).isDisplayed()) {
            return true
        }
        return false
    }
}
export default new InBoxFunctions();