module.exports = {
    default: {
        require: [
            'support/*.js',
            'step_definitions/*.js'
        ],
        format: [
            'json:reports/cucumber_report.json',
            'progress-bar',
            ['html', 'reports/cucumber_report.html'],
            'rerun:reports/rerun.txt'
        ],
        publishQuiet: true
    },
    rerun: {
        require: [
            'support/*.js',
            'step_definitions/*.js'
        ],
        format: [
            'json:reports/cucumber_report_rerun.json',
            'progress-bar',
            ['html', 'reports/cucumber_report_rerun.html']
        ],
        publishQuiet: true
    }
}
