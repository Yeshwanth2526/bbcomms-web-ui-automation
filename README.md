This is a sample project that uses WebdriverIO and TypeScript. It includes examples of the PageObject pattern and some practical examples for using WebdriverIO for cross browser and parallel testing.

- Chrome
- Edge
- Firefox

> **Note:**
> This project handles docker execution with parallel execution. For more info about that Google on setting up a webdriverio docker hub.

## Based on
This project is currently based on:
- **WebdriverIO:** `7.##.#`

## Installation

1. Running `git clone `
2. Running `npm install`
3. Docker-up -'`docker-compose up`
4. Running tests `npm run test` or `npm run multi-browser`
3. Docker-down -'`npm run docker-down`


## How to implement in your project
Choose one of the following options:

1. Clone the git repo — `xxx`
2. Then copy the files to your project directory (all files in `/src` and the `wdio.conf`-files in the `config`-folder)
3. Merge project dev dependencies with your projects dev dependencies in your `package.json`
4. Merge the scripts to your `package.json` scripts
5. Run the tests

## Configuration files
This Project uses a specific config for single and multi-browser, see [configs](./config). The configs are based on a shared config
[`capabilities.ts`](./config/wdio.conf.cross-browser.ts).
Under `capabilities.ts` we have seperate capabilities for Chrome, Edge and Firefox
Under `/config/wdio.conf.cross-browser.ts` we can call twom or three browsers


You can run the single test with single and multi browser

        // For single Docker execution
        npm run test -- --spec=/src/specs/app.login.spec.ts
        
        // For multiple Docker execution
        npm run multi-browser -- --spec=/src/specs/app.login.spec.ts

You can run the tests with single and multi browser

        // For single Docker execution
        npm run test -- --spec=/src/specs/app*.spec.ts
        
        // For multiple Docker execution
        npm run multi-browser -- --spec=/src/specs/app*.spec.ts

