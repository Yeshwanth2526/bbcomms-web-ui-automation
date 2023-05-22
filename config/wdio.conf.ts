// let baseUrl = (process.env.USE_PROD === 'true')
//     ? 'https://spl9-pt99-2.parentlink.net'
//     : 'https://spl9-pt99-2.parentlink.net/QA'

// const dev = "https://spl9-pt99-2.parentlink.net/dev"
// const qa = "https://spl9-pt99-2.parentlink.net"
// const stage = "https://spl9-pt99-2.parentlink.net/stage"

// let baseUrl: string;

// if (process.env.ENV == 'DEV') { baseUrl = dev }
// else if (process.env.ENV == 'QA') { baseUrl = qa }
// else if (process.env.ENV == 'STAGE') { baseUrl = stage }
// else {
//     baseUrl = dev;
//     console.log("Please pass correct ENV variable:: DEV | QA | STAGE")
//     process.exit()
// }  

import { env } from "process";
import { chromeCapabilities } from "./capabilities";
import { capabilitiesFirefoxConfig } from "./capabilities";
import { capabilitiesMicrosoftEdgeConfig } from "./capabilities";
import { multipleBrowserCapabilities } from "./capabilities";


const video = require('wdio-video-reporter');
export const config: WebdriverIO.Config = {
    // ==================
    // Specify Test Files
    // ==================
    specs: [
       

        // Smoke:
        // './src/specs/Accounts/accounts.accountCreateAndEdit.spec.ts',
        // './src/specs/Imports/imports.dataImports.spec.ts',
        // './src/specs/Settings/settings.addSocialMediaAccounts.spec.ts',
        // './src/specs/Send/send.sendEmail.spec.ts',
        // './src/specs/Send/send.sendFacebookMessage.spec.ts', 
        // './src/specs/Send/send.sendPhoneCall.spec.ts',
        // './src/specs/Send/send.sendSMS.spec.ts',
        // './src/specs/Send/send.sendTwitterMessage.spec.ts', 
        // './src/specs/Send/send.sendTwitterMessagewithJPG.spec.ts',
        // './src/specs/Reports/reports.messageTrackingReports.spec.ts',
        // './src/specs/Settings/settings.addSocialMediaInstagramAccount.spec.ts',
        // './src/specs/Settings/settings.addInstagramFeed.spec.ts',



        // Accounts:
        //  './src/specs/Accounts/accounts.accountSearchByEmailAddress.spec.ts',
        // './src/specs/Accounts/accounts.accountCreateAndEdit.spec.ts',
        // './src/specs/Accounts/accounts.accountSearchbyPhonenumber.spec.ts',
        // './src/specs/Accounts/accounts.accountSearchbyRoleAndSchool.spec.ts',
        // './src/specs/Accounts/accounts.forgetPassword.spec.ts',
        // './src/specs/Accounts/accounts.mergeAccounts.spec.ts', 
         
        //  Reports:
        './src/specs/Reports/reports.messageTrackingReports.spec.ts',
        //  './src/specs/Reports/reports.reportGenerateDownloadAndEmail.spec.ts', 

        // Tipline:
        //  './src/specs/Tipline/Tipline.submitNewTipLine.spec.ts', 

        // Surveys:
        //  './src/specs/Surveys/survey.createSurvey.spec.ts', 

        // Groups:
        // './src/specs/Groups/groups.createPersonGroup.spec.ts', 
        // './src/specs/Groups/groups.createPrivateGroup.spec.ts', 
        // './src/specs/Groups/groups.createQueryGroup.spec.ts', 

        // Settings:
        // './src/specs/Settings/settings.addFacebookFeed.spec.ts', 
        // './src/specs/Settings/settings.addSocialMediaAccounts.spec.ts', 
        // './src/specs/Settings/settings.addSocialMediaInstagramAccount.spec.ts', 
        // './src/specs/Settings/settings.addTwitterFeed.spec.ts', 
        // './src/specs/Settings/settings.addYoutubeFeed.spec.ts', 
        // './src/specs/Settings/settings.addInstagramFeed.spec.ts', 
        // './src/specs/Settings/settings.ValidateTwitterFeedUpdate.spec.ts', 

        //Imports
        // './src/specs/Imports/imports.attendanceConsecutiveDays.spec.ts',
        // './src/specs/Imports/imports.attendanceHistory.spec.ts',
        // './src/specs/Imports/imports.attendanceimport.spec.ts',
        // './src/specs/Imports/imports.attendanceSinceData.spec.ts',
        // './src/specs/Imports/imports.attendanceXdays.spec.ts',
        // './src/specs/Imports/imports.RouteImport.spec.ts',
        // './src/specs/Imports/imports.dataImports.spec.ts',
        // './src/specs/Imports/imports.demographicImports.spec.ts',
        // './src/specs/Imports/imports.libraryBalance.spec.ts',
        // './src/specs/Imports/imports.lunchBalance.spec.ts',

        // Send:

        // './src/specs/Send/send.sendAlert.spec.ts',
        // './src/specs/Send/send.sendApp.spec.ts',
        // './src/specs/Send/send.sendAppWithRecipients.spec.ts',
        // './src/specs/Send/send.sendEmail.spec.ts', 
        //    './src/specs/Send/send.sendAppWithAttachments.spec.ts',  
        //    './src/specs/Send/send.sendAppWithMergeTag.spec.ts', 
        //    './src/specs/Send/send.sendAppWithTemplate.spec.ts',
        //    './src/specs/Send/send.sendEmailWithAttachments.spec.ts',
        //    './src/specs/Send/send.sendEmailWithMergeTag.spec.ts', 
        //   './src/specs/Send/send.sendEmailWithTemplate.spec.ts', 
        //       './src/specs/Send/send.sendRss.spec.ts',
            //  './src/specs/Send/send.sendSMS.spec.ts',
        //      './src/specs/Send/send.sendReminderMessage.spec.ts',
            // './src/specs/Send/send.sendFaceBookLengthyMessage.spec.ts',
            //  './src/specs/Send/send.sendFaceBookMessage.spec.ts',
            // './src/specs/Send/send.sendfacebookMessageWithURL.spec.ts',
            // './src/specs/Send/send.sendFaceBookWithGIF.spec.ts',
            // './src/specs/Send/send.sendFaceBookWithJpg.spec.ts',
            // './src/specs/Send/send.sendFaceBookWithPng.spec.ts',
            // './src/specs/Send/send.sendFaceBookWitVideo.spec.ts',
            //  './src/specs/Send/send.sendHeadlines.spec.ts',
            // './src/specs/Send/send.sendPhoneCall.spec.ts',
            // './src/specs/Send/send.sendPhoneCallWithAudioFile.spec.ts',
            // './src/specs/Send/send.sendScheduledMessages.spec.ts',
            // './src/specs/Send/send.sendSurveyMessage.spec.ts',
            // './src/specs/Send/send.sendTwitterLengthyMessage.spec.ts',
            // './src/specs/Send/send.sendTwitterMessage.spec.ts',
            // './src/specs/Send/send.sendTwitterMessagewithJPG.spec.ts',
            // './src/specs/Send/send.sendTwitterMessageWithURL.spec.ts',
            // './src/specs/Send/send.sendTwitterWithGIF.spec.ts',
            //   './src/specs/Send/send.sendEmergencyMessage.spec.ts',
            //   './src/specs/Send/send.sendSurveyMessage.spec.ts',

            // Social:
            // './src/specs/Social/social.facebookActivty.spec.ts',
            // './src/specs/Social/social.twitterActivity.spec.ts',

    
    
    
    
    ], 

    exclude: [],

    suites: {
        smoke: ['./src/specs/**/SendImageAndFile2.spec.ts'],
    },
    // ============
    // Capabilities
    // ============
    maxInstances: 1,
    capabilities: chromeCapabilities,

    // ===================
    // Test Configurations
    // ===================
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'error',
    bail: 0,
    baseUrl: '',
    waitforTimeout: 5000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 1,
    //services: ['docker'],
    //hostname: 'hub',
    services: ['selenium-standalone'],
    port: 4444,
    path: '/wd/hub',
    framework: 'mocha',
    specFileRetries: 0,
    specFileRetriesDelay: 0,
    specFileRetriesDeferred: false,
    reporters: ['spec',
        // [video, {
        //   saveAllVideos: true,       // If true, also saves videos for successful test cases
        //   videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
        // }],
        ['allure', {
            outputDir: './results/allure-raw',
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false,
        }],
    ],

    mochaOpts: {
        ui: 'bdd',
        timeout: 999999999,
        mochawesomeOpts: {
            includeScreenshots: true,
            screenshotUseRelativePath: true
        },
    },

    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    // onPrepare: function (config, capabilities) {
    // },
    /**
     * Gets executed before a worker process is spawned and can be used to initialise specific service
     * for that worker as well as modify runtime environments in an async fashion.
     * @param  {String} cid      capability id (e.g 0-0)
     * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
     * @param  {[type]} specs    specs to be run in the worker process
     * @param  {[type]} args     object that will be merged with the main configuration once worker is initialised
     * @param  {[type]} execArgv list of string arguments passed to the worker process
     */
    // onWorkerStart: function (cid, caps, specs, args, execArgv) {
    // },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    // beforeSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs        List of spec file paths that are to be run
     * @param {Object}         browser      instance of created browser/device session
     */
    // before: function (capabilities, specs) {
    // },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },
    /**
     * Hook that gets executed before the suite starts
     * @param {Object} suite suite details
     */
    // beforeSuite: function (suite) {
    // },
    /**
     * Function to be executed before a test (in Mocha/Jasmine) starts.
     */
    // beforeTest: function (test, context) {
    // },
    /**
     * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
     * beforeEach in Mocha)
     */
    // beforeHook: function (test, context) {
    // },
    /**
     * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
     * afterEach in Mocha)
     */
    // afterHook: function (test, context, { error, result, duration, passed, retries }) {
    // },
    /**
     * Function to be executed after a test (in Mocha/Jasmine).
     */
    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            await browser.takeScreenshot();
        }
    },


    /**
     * Hook that gets executed after the suite has ended
     * @param {Object} suite suite details
     */
    // afterSuite: function (suite) {
    // },
    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // after: function (result, capabilities, specs) {
    // },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
    /**
    * Gets executed when a refresh happens.
    * @param {String} oldSessionId session ID of the old session
    * @param {String} newSessionId session ID of the new session
    */
    //onReload: function(oldSessionId, newSessionId) {
    //}
}