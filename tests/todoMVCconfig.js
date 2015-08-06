var ScreenShotReporter = require('protractor-html-screenshot-reporter');

// A reference configuration file.
exports.config = {
    seleniumServerJar: '/usr/local/lib/node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',
    params: {
        // Defines a multiplier for timeouts.  If an environment is slower,
        // the timeout multiplier can be increased.
    },
    // ----- What tests to run -----

    multiCapabilities: [
        {
            'browserName': 'chrome'
        },
    ],
    params: require('./tools/testdata-qa.json'),
            suites: {
                todoMVC: [
                     './specs/todoMVC_spec.js'
                ]
            },
    // Options to be passed to Jasmine-node.
    onPrepare: function () {
        // Add a screenshot reporter and store screenshots to `/tmp/screenshots`:
        jasmine.getEnv().addReporter(new ScreenShotReporter({
            baseDirectory: require('path').resolve(__dirname, 'screenshots')
        }));


        // The require statement must be down here, since jasmine-reporters@1.0
        // needs jasmine to be in the global and protractor does not guarantee
        // this until inside the onPrepare function.
        require('jasmine-reporters');
        jasmine.getEnv().addReporter(
                new jasmine.JUnitXmlReporter('xmloutput', true, true)
                );
    },
    baseUrl: 'https://qa-appcenter.intuit.com',
    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        isVerbose: true,
        showTiming: true,
        showColors: true,
        defaultTimeoutInterval: 900000
    }
};
