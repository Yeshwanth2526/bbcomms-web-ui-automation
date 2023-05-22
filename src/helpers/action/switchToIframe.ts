export default async (selector: string, ms: string = '500')=> {
    const pause_ms = parseInt(ms) || 500;
    await browser.switchToFrame($(selector));
    await browser.pause(pause_ms);
}