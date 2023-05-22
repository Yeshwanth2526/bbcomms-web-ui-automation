let creds = {
  url: 'https://spl9-pt99-3.parentlink.net',
  user: 'spl9support',
  password: 'pw',
  orgID: 2000004402,
  orgID2: 2000002576,
  orgID3: 2000002371,
  districtID: 2000001172,
  
  
}

if (process.env.ENV == 'DEV') {
  creds = {
    url: 'https://spl9-pt99-2.parentlink.net',
    user: 'spl9support',
    password: 'pw'
  }
}

if (process.env.ENV == 'QA') {
  
  creds = {
    url: 'https://spl9-pt99-2.parentlink.net',
    user: 'spl9support',
    password: 'pw'
  }
}

if (process.env.ENV == 'STAGE') {
  creds = {
    url: 'https://spl9-pt99-2.parentlink.net',
    user: 'spl9support',
    password: 'pw'
  }
}



module.exports = creds