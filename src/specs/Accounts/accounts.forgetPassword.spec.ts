import AccountsFunctions from '../../pages/AccountsFunctions';
import LoginToBBcoms from '../../pages/LoginToBBcoms';
const data = require('../../../data/env.json');
import lighthouse from '../../helpers/action/lighthouse';
const { url, user, password } = require('../../../data/env_data')

// Actual test scenarios
describe('Click Forget password and send Email', () => {

    before('Go to HomePage ', async () => {
        await browser.url(url)
        
    });

    it('#SMOKE Click forget Password and Send Forget password link mail to Student', async () => {
        await LoginToBBcoms.login(user,password);
    });

    after('Logout from the application and close the browser', async () => {
        await  browser.closeWindow();
    });

})