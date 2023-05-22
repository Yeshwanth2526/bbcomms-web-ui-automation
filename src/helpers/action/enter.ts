/**
 * Scroll the page to the given element
 * @param  {String}   selector Element selector
 */
 export default async () => {
   await browser.keys('Enter');
   await browser.pause(500);
};