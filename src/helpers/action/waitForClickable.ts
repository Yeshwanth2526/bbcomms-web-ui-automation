import type { Selector } from 'webdriverio';

export default async (Selector: any, ms: string = '5000') => {
    let timeout = parseInt(ms) || 5000;
    await browser.waitUntil(
        async () => $(Selector).isClickable(),
        {
            timeout: timeout,
            timeoutMsg: 'Expected element was not clickable!!!'
        }
    );
}