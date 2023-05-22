var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
var value = 'test'.concat(seq);
const AccountTest = {
  staffID: value,
  password: 'pw12345',
  firstName: 'SS',
  lastName: 'Parent',
  Role: 'Parent',
  NewLastName: 'New',
  EmailId: 'poornima.sridharan@blackboard.com',
  phoneNo: '2029813253',
  nameToSearch: 'Automation',
  BalanceDetails: {
    type: 'Balance',
    balanceBeforeEditing: '$10.0',
    balanceAfterEditing: '$5.0',
  },
  noLoginNoPasswordOption: 'NOLOGINNOPASSWORDGEN',
  noLoginOption: 'NOLOGIN',
  noActiveSinceOption: 'NOLETTERSINCE',
  noFilterOption: 'NOFILTER',
  dateFieldValue: 'Jul 26, 2021',
  accountSearchUser: 'ParentNew',
  organizationName: 'Automation Org - Do Not Delete', //Email_School
  layoutOptionValue: 'Default Print Layout',
  newPassword: 'pw',
  addressLine1: 'III street',
  addressLine2: 'OMR',
  city: 'Chennai',
  state: 'TN',
  pincode: '600042',
};

const generateConfig = () => {
  //const environment = process.env.TEST_ENV === 'staging' ? staging : shared;
  return { ...AccountTest };
};

export const AccountTestData = generateConfig();
