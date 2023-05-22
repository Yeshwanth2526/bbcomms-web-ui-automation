const OrganizationTest = {
    "DistrictNameShortForm": "SPL9 School District",
    "TipCategory": "AutomationTip"
};

const generateConfig = () => {
    //const environment = process.env.TEST_ENV === 'staging' ? staging : shared;
    return { ...OrganizationTest };
};

export const OrganizationTestData = generateConfig();