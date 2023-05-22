const GroupsTest = {
    organizationName: "Automation Org - Do Not Delete",
    queryGroupName: "Automation Query Group",
    personGroupName: "Automation Persons Group",
    privateGroupNmae: "Automation Private Group",
    messageContent: "Testing the Messages for Group Recipients"
};

const generateConfig = () => {
    //const environment = process.env.TEST_ENV === 'staging' ? staging : shared;
    return { ...GroupsTest };
};

export const GroupsTestData = generateConfig();