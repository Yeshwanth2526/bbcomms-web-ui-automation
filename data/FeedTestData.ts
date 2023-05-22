
const FeedTest = {
    FbUserNmae: "bbcommschennai@gmail.com",
    FbPassword: "password12345!",
    FbPageAddress: "https://www.facebook.com/QA-Page100-106435971005901",
    FbPageName: "QA Page100",
    DisplayedFbname: "QA Page100 (News)",
    DefaultFbName: "Facebook (News)",
    TwitterUserName: "karthick240796",
    TwitterPassword: "K@6thick",
    TwitterAccountName: "Karthick",
    DefaultTwitterName: "Twitter (News)",
    DisplayedTwitterName: "Karthick (News)",
    YoutubePageName: "NDTV",
    DefaultYoutubeName: "NDTV (News)",
    InstagramUserName: 'bbcommschennai',
    InstagramPassword: 'Chennai@bbcomm',
    DisplayedInstagramName: "bbcommschennai (News)",
    DefaultInstagramName: "Instagram (News)",
    InstagramAccountName: "bbcommschennai",
    InstagramPageName: 'bbcommschennai'
};

const generateConfig = () => {
    //const environment = process.env.TEST_ENV === 'staging' ? staging : shared;
    return { ...FeedTest };
};

export const FeedTestData = generateConfig();