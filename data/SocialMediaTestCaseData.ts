
const SocialTest = {

  FbUserNmae: "bbcommschennai@gmail.com",
  FbPassword: "chennai@bbcomm",
  FbPageNme: "'QA Page100'",
  TwitterUserName: "karthick240796",
  TwitterPassword: "K@6thick",
  TwitterAccountName: "'Karthick'",
  InstagramUserName: "bbcommschennai",
  InstagramPassword: "Chennai@bbcomm",
  InstagramAccountName: "'bbcommschennai'"
};

const generateConfig = () => {
  //const environment = process.env.TEST_ENV === 'staging' ? staging : shared;
  return { ...SocialTest };
};

export const SocialMediaTestData = generateConfig();