export default async () => {
    if (await browser.isAlertOpen()) {
        await browser.pause(5000)
        await browser.acceptAlert();
    }
   
};
