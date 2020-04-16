# Undonered App (undonered)

Undonered with Quasar

## Quick disclaimer
When running in dev you should also run the backend.
When running in production its possible that the server is not running.

## How to install the Quasar CLI
```bash
npm install -g @quasar/cli
```

## How to install Cordova
```bash
npm install -g cordova
```

## Install the dependencies
```bash
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Run or build the app on mobile
```bash
$ quasar dev -m cordova -T [ios|android]

# ..or the longer form:
$ quasar dev --mode cordova -T [ios|android]

# using a specific emulator (--emulator, -e)
$ quasar dev -m cordova -T ios -e iPhone-7
# or
$ quasar dev -m cordova -T ios -e iPhone-X,com.apple.CoreSimulator.SimRuntime.iOS-12-2

# passing extra parameters and/or options to
# underlying "cordova" executable:
$ quasar dev -m ios -- some params --and options --here
```


### Lint the files
```bash
yarn run lint
```

### Build the app for production
```bash
quasar build
```

### Test with Cypress
For this to work the application needs to be running locally in development (quasar) and the server locally in the test environment (See README.md in the server) (Command is something like: 'docker-compoe -f docker-compose.testfrontend.yml up')
```bash
yarn run test:e2e
```
Or
```bash
yarn run test:e2e:CI
```
You can also install cypress and see the test running visually
- Install cypress
```bash
npm i -g cypress
```
- Open cypress PASOP de frontend moet nu ook aanstaan 'quasar dev'
```bash
cypress open
```
### Technical document
See technical_document.md

### Functional Design
See funcitnal_design.md
