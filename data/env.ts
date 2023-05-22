const sharedData = {
    teacherUserName: 'automation_teacher',
    teacherPassword: 'pass@123',
    parentUserName: 'automation_parent',
    parentPassword: 'pass@123',
    studentUserName: 'automation_student',
    studentPassword: 'pass@123',
    principalUserName: 'automation_principal',
    principalPassword: 'pass@123',
    attendanceSeceratoryUserName: 'automation_attendance_seceratory',
    attendanceSeceratoryPassword: 'pass@123',
    districtAdminUserName: 'automation_district_admin',
    districtAdminPassword: 'pass@123',
    superintendentUserName: 'automation_superintendent',
    superintendentPassword: 'pass@123',
    phoneNumber: 2029813253,
    smsNumber: 2029813253,
    emailAddress: 'yeswanth.bhuvanagiri@finalsite.com',
    organizationName: 'Automation Org - Do Not Delete',
    organizationName2: '99-3 School District',
    organizationName3: 'Bayside High School',
    orgExternalID: 'automation'
};

const environmentConfig = {
    qa: {
        url: 'https://spl9-pt99-2.parentlink.net/',
        supportUserName: 'spl9support',
        supportPassword: 'pw',
        orgID: 2000003067,
        orgID2: 10434,
        orgID3: 2000002371,
        districtID: 2000001172
    },
    stage: {
        url: 'https://spl9-pt99-3.parentlink.net/',
        supportUserName: 'spl9support',
        supportPassword: 'pw',
        orgID: 2000004402,
        orgID2: 10434,
        orgID3: 2000003260,
        districtID: 2000001172
    },
    qa1: {
        url: 'https://spl9-pt99-4.parentlink.net/',
        supportUserName: 'support',
        supportPassword: 'pw',
        orgID: 39, 
        districtID: 32
    },
    pt041: {
        url: 'https://shellpt041.parentlink.net/',
        supportUserName: 'support175825',
        supportPassword: 'password@pt041',
        orgID: 10544,
        districtID: 9977
    },
    pt042: {
        url: 'https://shellpt042.parentlink.net/',
        supportUserName: 'support175826',
        supportPassword: 'password@pt042',
        orgID: 10989,
        districtID: 10434
    },
    pt043: {
        url: 'https://pt04-3-ibm.parentlink.net/',
        supportUserName: 'support175775',
        supportPassword: 'password@pt043',
        orgID: 2139,
        districtID: 3
    },
    pt051: {
        url: 'https://shellpt051.parentlink.net/',
        supportUserName: 'support175827',
        supportPassword: 'password@pt051',
        orgID: 51320,
        districtID: 51070
    },
    pt052: {
        url: 'https://shellpt052.parentlink.net/',
        supportUserName: 'support175828',
        supportPassword: 'password@pt052',
        orgID: 19366,
        districtID: 13969
    },
    pt061: {
        url: 'https://shellpt061.parentlink.net/',
        supportUserName: 'support175829',
        supportPassword: 'password@pt061',
        orgID: 33270,
        districtID: 33039
    },
    pt062: {
        url: 'https://shellpt062.parentlink.net/',
        supportUserName: 'support175830',
        supportPassword: 'password@pt062',
        orgID: 38822,
        districtID: 38339
    },
    pt05demo: {
        url: 'https://demo1.parentlink.com/',
        supportUserName: 'support174830',
        supportPassword: 'password@pt05demo',
        orgID: 2268,
        districtID: 307
    },
    pt990: {
        url: 'https://pt99-0.parentlink.net/',
        supportUserName: 'spl9support',
        supportPassword: 'pw',
        orgID: 2000002666,
        districtID: 2000001172
    },
};

const generateConfig = () => {
    const environment = process.env.ENVIRONMENT;
    const environmentData = environmentConfig[environment.replace('-', '')]
    return { ...sharedData, ...environmentData };
};

export const config = generateConfig();
