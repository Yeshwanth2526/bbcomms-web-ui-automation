

const ImportsTest = {
  DataSourceLocation: 'AutomationFiles/',
  SmokeDataSourceType: 'Student',
  DataSourceType: ['Assignment', 'AssignmentScore', 'Attendance', 'AttendanceHistory',
    'BusRoute', 'Grade', 'Course', 'LibraryBalance', 'LunchBalance',
    'Parent', 'Schedule', 'Section', 'Student', 'Staff', 'Term'
  ],
  DataElementType: {
    'Assignment': 'Assignment',
    'AssignmentScore': 'AssignmentScore',
    'Attendance': 'Attendance',
    'AttendanceHistory': 'Attendance',
    'BusRoute': 'BusRoute',
    'Grade': 'Grade',
    'Course': 'Course',
    'LibraryBalance': 'LibraryBalance',
    'LunchBalance': 'LunchBalance',
    'Parent': 'Parent',
    'Schedule': 'Schedule',
    'Section': 'Section',
    'Student': 'Student',
    'Staff': 'Teacher',
    'Term': 'Term'
  },
  ParseStyle: "Flex Exchange",
  DemographicDataSources: ['Assignment', 'AssignmentScore', 'Attendance', 'AttendanceHistory',
    'BusRoute', 'Grade', 'Course', 'LibraryBalance', 'LunchBalance',
    'Parent', 'Schedule', 'Section', 'Student', 'Staff', 'Term'
  ],
  MessageTypeValue: {
    'Assignment': 'Assignment',
    'Attendance': ['Daily', 'History', 'SinceDate', 'XDays', 'ConsDays'],
    'LunchBalance': 'Lunch',
    'LibraryBalance': 'Library',
    'Grades': 'Summary',
    'BusRoute': 'BusRoute'
  },
  attendanceCodeAndDescription: ['Absent', 'T', 'Tardy'],
  scheduleTime: "12:00 AM",
  importStatus: "STARTED:",
  scheduledTimeAndDays1: "12am CST, every day",
  scheduledTimeAndDays2: "12am MST, every day"

};

const generateConfig = () => {
  //const environment = process.env.TEST_ENV === 'staging' ? staging : shared;
  return { ...ImportsTest };
};

export const ImportsTestData = generateConfig();