const { execSync } = require('child_process');
const fs = require('fs-extra');
const { generateReport } = require('./utils/reporter');
const nodemailer = require('nodemailer');

async function runTests() {
    console.log('--- Starting Automation Execution ---');

    // Clean reports directory
    fs.emptyDirSync('./reports');

    let mainRunPassed = true;
    try {
        console.log('Running initial test suite...');
        execSync('npx cucumber-js --profile default', { stdio: 'inherit' });
    } catch (error) {
        mainRunPassed = false;
        console.log('Some tests failed in the initial run.');
    }

    // Generate Initial Report
    await generateReport('./reports/cucumber_report.json', './reports/main_report', 'Full Execution Report');

    if (!mainRunPassed) {
        console.log('\n--- Starting Rerun for Failed Scenarios ---');
        try {
            // Find failed scenarios and rerun them
            // Cucumber-js doesn't have a direct 'rerun' file like Ruby/Java implementation easily out of box without extra config
            // But we can use @cucumber/cucumber's built-in rerun formatter if we configured it correctly.
            // However, for simplicity in this demo, we'll rerun the whole feature or use tags if we had them.
            // Let's assume we want to rerun everything that failed.
            execSync('npx cucumber-js @reports/rerun.txt --profile rerun', { stdio: 'inherit' });
        } catch (error) {
            console.log('Rerun also had some failures.');
        }

        // Generate Rerun Report
        await generateReport('./reports/cucumber_report_rerun.json', './reports/rerun_report', 'Failed Tests Rerun Report');
    } else {
        console.log('All tests passed! Skipping rerun.');
    }

    // Send Email Notification
    await sendEmailNotification();
}

async function sendEmailNotification() {
    console.log('\n--- Sending Execution Notification ---');

    // NOTE: This is a placeholder SMTP configuration. 
    // In a real scenario, the user would provide their SMTP details.
    // We'll use a mock Ethereal account logic or just log the intent.

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: 'test.user@ethereal.email', // Replace with real credentials
            pass: 'test-pass',
        },
    });

    const mailOptions = {
        from: '"QA Automation Runner" <automation@demo.com>',
        to: "stakeholder@demo.com",
        subject: "Automation Execution Report",
        text: "Please find the automation execution reports attached.",
        html: "<b>Automation execution completed.</b><br>Check the reports directory for detailed HTML results.",
    };

    try {
        // In this simulation, we'll just log success instead of actually sending to a fake server
        // Unless requested to show real email logic.
        console.log('Email drafted for execution summary.');
        console.log('Success Report: ./reports/main_report/index.html');
        console.log('Rerun/Fail Report (if any): ./reports/rerun_report/index.html');
    } catch (error) {
        console.error('Failed to send email:', error);
    }
}

runTests().catch(console.error);
