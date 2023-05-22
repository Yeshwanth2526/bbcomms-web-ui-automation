export default async (selector: string, ms: any = '500') => {
   
    const method = 'click';
    const pause_ms = await parseInt(ms) || 500;
    await $(selector)[method]();
    await browser.pause(pause_ms);
 }; 