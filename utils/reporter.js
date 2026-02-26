const reporter = require('multiple-cucumber-html-reporter');
const fs = require('fs-extra');
const path = require('path');

async function generateReport(jsonPath, reportPath, reportTitle) {
    if (!fs.existsSync(jsonPath)) {
        console.log(`No JSON report found at ${jsonPath}`);
        return;
    }

    await reporter.generate({
        jsonDir: path.dirname(jsonPath),
        reportPath: reportPath,
        metadata: {
            browser: {
                name: process.env.BROWSER_TYPE || 'playwright',
                version: 'Latest'
            },
            device: 'Local Test Machine',
            platform: {
                name: 'Windows',
                version: '11'
            }
        },
        customData: {
            title: 'Run Info',
            data: [
                { label: 'Project', value: 'E-commerce Demo' },
                { label: 'Release', value: '1.0.0' },
                { label: 'Cycle', value: 'B112' },
                { label: 'Execution Start Time', value: new Date().toISOString() }
            ]
        },
        pageTitle: reportTitle,
        reportName: reportTitle,
        pageFooter: '<div><p>Maintained by Basant Dewangan</p></div>'
    });
    console.log(`Report generated: ${reportPath}/index.html`);
}

module.exports = { generateReport };
