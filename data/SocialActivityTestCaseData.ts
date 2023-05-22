
const SocialActivityTest = {

    ReplayContent: "Relplay contents for Automation",
    DeleteContent: "This message will be deleted to check delete functionality"
};

const generateConfig = () => {
    //const environment = process.env.TEST_ENV === 'staging' ? staging : shared;
    return { ...SocialActivityTest };
};

export const SocialActivityTestData = generateConfig();