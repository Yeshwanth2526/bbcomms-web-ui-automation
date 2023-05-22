import path from "path";

export const chromeCapabilities = [
    {
        maxInstances: 2,
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--no-sandbox',
                // '--disable-infobars',
                '--disable-gpu',
                //'--headless',
                '--window-size=1440,735'

            ],
            "prefs": {
                "download.default_directory": path.join(process.cwd(), 'downloads')
            }
        },
        'cjson:metadata': {
            device: process.env.SELENIUM_VERSION,
        },
    }
]

export const capabilitiesFirefoxConfig = [{
    'maxInstances': 1,
    browserName: 'firefox',
    'moz:firefoxOptions': {
        args: [
            '--no-sandbox',
            '--window-size=1440,735'
            //'-headless'
        ]
    },
    'acceptInsecureCerts': true,
    'cjson:metadata': {
        device: process.env.SELENIUM_VERSION,
    },
}]
export const capabilitiesMicrosoftEdgeConfig = [{

    maxInstances: 2,
    browserName: 'MicrosoftEdge',
    acceptInsecureCerts: true,
    'ms:edgeOptions': {
        args: [
            '--no-sandbox',
            '--disable-infobars',
            '--headless',
            '--disable-gpu',
            '--window-size=1440,735'
        ],
    }
}]

export const multipleBrowserCapabilities = [
    ...chromeCapabilities,
    ...capabilitiesFirefoxConfig,
]