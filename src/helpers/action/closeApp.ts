/**
 * Perform a closeapp
 */
export default async (str: string) => {
    await browser.removeApp(str);
};
