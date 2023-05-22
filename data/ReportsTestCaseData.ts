const reportData = {
  scheduleTime: "12:00 PM",
  emailSentConfirmation: "has been emailed",
  reportsWithoutDateFilter: [
    "SchoolReport",
    "BadAddressReport",
    "MessageTrending",
    "SystemUtilization",
    "Settings"
  ]
};

const generateConfig = () => {
  //const environment = process.env.TEST_ENV === 'staging' ? staging : shared;
  return { ...reportData };
};

export const reportTestData = generateConfig();