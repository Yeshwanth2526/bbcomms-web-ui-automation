
export default async (title: string)  => {
    await browser.waitUntil(
     async () => title == await browser.getTitle(),
         {
             timeout: 5000,
             timeoutMsg: 'Expected page navigation not happened',
         }
     );
}
