
const Test = {
  PhoneMessageSubject: "This is phone call Message subject sent via automation testing",
  SMSMessageSubject: "This is SMS Message subject sent via automation testing",
  EmailMessageSubject: "Automation testing for Email Message",
  SMSMessageContent: "This is SMS Message content sent via automation testing",
  EmailMessageContent: "WebdriverIO runs a set of asynchronous commands to interact with the browser or mobile device. In JavaScript asynchronous operations are handled via async/await. This however can be a confusing concept for people unfamiliar with the language. In addition to that it can make tests very verbose as almost every operation is asynchronous. To simplify its usage WebdriverIO provides the ability to run commands synchronous through node-fibers.",
  FbMessageSubject: "Automation testing for Facebook Message",
  FbMessageContent: "This is Facebook Message content sent via automation testing",
  FbLengthyMessageSubject: "Automation testing for Facebook lengthy message",
  FbLengthyMessageContent: `Facebook is an American online social media and social networking service owned by Facebook, Inc. 
  Founded in 2004 by Mark Zuckerberg with fellow Harvard College students and roommates Eduardo Saverin, Andrew McCollum, 
  Dustin Moskovitz, and Chris Hughes,   ts name comes from the face book directories often given to American university students.  
  Membership was initially limited to Harvard students, gradually expanding to other North American universities and, 
  since 2006, anyone over 13 years old. As of 2020,   Facebook claimed 2.8 billion monthly active users,[2] and ranked seventh in 
  global internet usage.[7] It was the most downloaded mobile app of the 2010s.[8] 
   Facebook can be accessed from devices with Internet connectivity, such as personal computers, tablets and smartphones.   
   After registering, users can create a profile revealing information about themselves.   
   They can post text, photos and multimedia which are shared with any other users who have agreed to be their friend or, 
   with different privacy settings, publicly.   Users can also communicate directly with each other with Facebook Messenger,   
   join common-interest groups, and receive notifications on the activities of their Facebook friends and pages they follow.`,
  FbUrlMessageSubject: "This is facebook message subject along with URL",
  FbUrlMessageContent: `Facebook Message with URL   
  https://en.wikipedia.org/wiki/Twitter  
   https://docs.google.com/forms/d/e/1FAIpQLScN_C_bkEjWcYG8eS1A2rnM3VH6413VcAIY9dlee1nhhf2MKg/viewform   
   [https://en.wikipedia.org/wiki/Evan_Williams_(Internet_entrepreneur)]`,
  TwitterMessageSubject: "Automation testing for Twitter Message",
  TwitterMessageContent: "This is Twitter Message content sent via automation testing",
  TwitterLengthyMessageSubject: "Automation testing for Twitter lengthy message",
  TwitterLengthyMessageContent: `Twitter is an American microblogging and social networking service on which users post and interact with messages known as "tweets".
  Audio and video tweets remain limited to 140 seconds for most accounts. Tweets were restricted to 280 characters per post`,
   TwitterUrlMessageSubject: "This is Twitter message subject along with URL",
  TwitterUrlMessageContent: `Twiteer Message with URL   
  https://en.wikipedia.org/wiki/Twitter  
   https://docs.google.com/forms/d/e/1FAIpQLScN_C_bkEjWcYG8eS1A2rnM3VH6413VcAIY9dlee1nhhf2MKg/viewform   
   [https://en.wikipedia.org/wiki/Evan_Williams_(Internet_entrepreneur)]`,
  AccountID: "45454",
  FbAccount: "QA Page100",
  TwitterAccount: "karthick",
  SmoreUsername: "praveenkumar.s@blackboard.com",
  SmorePassword: "Praveen@110300",
  gmail: "bbcommschennai@gmail.com",
  GmailPassword: "password12345!",
  NewsletterTitle: "Automation Test for Smore Template",
  NewsletterSubTitle: "This is Message sent via automation testing",
  ModifiedNewsletterTitle: "Modified Smore Template",
  PhoneMessageContent: `
    Hello Good Morning/Good Afternoon,
       This is an automated Test call for testing the Phone call flow from Send Module of BBComms.In this call we are testing a phone call with Text to Speech option with {MergeBreakPoint} more than 500 characters of text.
       For phone call we can automated only Text to Speech and Upload Audio File options,Other options Use microphone, Call me to record and Call in to record cannot
       be performed by automation test and those can be covered in manual testing. Hope this content is lengthy enough testing the scenario.
    Thank you so much
    Have a Great Day!!
  `,
  TTSMergeTags: "Organization Name [ORGANIZATION_NAME] and Recipient Name [RECIPIENT_NAME]",
  SMSMessageContent280: "Get the text content from a DOM-element found by given selector. Make sure the element you want to request the text from is interactable otherwise you will get an empty string as return value. If the element is disabled or not visible and you still want to receive the text content",
  AppMessageSubject: "Automation testing for App Message",
  AppMessageContent: "This is App Message content sent via automation testing",
  AlertMessageSubject: "Automation testing for Alert Message",
  AlertMessageContent: "This is Alert Message content sent via automation testing",
  RSSMessageSubject: "Automation testing for RSS Message",
  RSSMessageContent: "This is RSS Message content sent via automation testing",
  WebsiteMessageSubject: "Automation testing for Website Message",
  WebsiteMessageContent: "This is Website Message content sent via automation testing",
  AllMessageSubject: "Automation testing for All DeliveryMethods Message",
  AllMessageContent: "This is All DeliveryMethods Message content sent via automation testing",
  DeliveryMethods: ['Phone', 'Email', 'Sms', 'App', 'Facebook', 'Twitter', 'Web', 'Website', 'Alert'],
  Languages: {'es-US': 'Spanish', 'fr': 'French', 'pt': 'Portuguese', 'kor': 'Korean'},
  SMSMessageSubjectWithURL: "This is SMS Message with URL subject sent via automation testing",
  SMSMessageContentWithURL: "https://www.ctesurveys.com/CTESurvey?PointerId=498&SchoolId=125",
  DeliveryMethodsEmailSms: ['Email', 'Sms'],
  RSSMessageContentNew: `<a href="https://www.google.co.in">Google Website</a>`,
};

const generateConfig = () => {
  //const environment = process.env.TEST_ENV === 'staging' ? staging : shared;
  return { ...Test };
};

export const testData = generateConfig();