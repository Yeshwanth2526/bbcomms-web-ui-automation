import type { Selector } from 'webdriverio';

export default async (Selector: string, ms : string = '5000' ) => {
    let timeout = parseInt(ms) || 5000;
   await browser.waitUntil(
    async  ()=> $(Selector).isExisting(),
        {
            timeout: timeout,
            timeoutMsg: 'Expected Element was not found!!!',
        }
    );
};





