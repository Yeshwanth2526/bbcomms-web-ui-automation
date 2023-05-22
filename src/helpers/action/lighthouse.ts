const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
import { join } from "path";


export default async (url: string, title: string) => {

  
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {logLevel: 'info', output: 'html' , port: chrome.port};
  const runnerResult = await lighthouse(url, options);
 
  // `.report` is the HTML report as a string
  const reportHtml = runnerResult.report;
  fs.writeFileSync(join(process.cwd(), `Reports/`) + title+'.html', reportHtml);
  

    // `.report` is the JSON report as a string
    // const options1 = {logLevel: 'info', output: 'json' , port: chrome.port};
    // const runnerResult1 = await lighthouse(url, options1);
    // const reportJson = runnerResult1.report;
    // fs.writeFileSync(join(process.cwd(), `Reports/`) + title+'.json', reportJson);

  // `.lhr` is the Lighthouse Result as a JS object
  console.log('Report is done for', runnerResult.lhr.finalUrl);
  console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);

  await chrome.kill();
}