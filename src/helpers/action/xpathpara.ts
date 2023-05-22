import { Selector } from 'webdriverio';

/**
 * Clear a given input field (placeholder for WDIO's clearElement)
 * @param  {String}   selector Element selector
 */
export default async (selector: Selector, value:string) => {
     var temp = selector.toString();
     var newstr = temp.replace(value, "<P1>"); 
};
