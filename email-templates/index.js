const { WELCOME, FORGOT_PASS } = require('../config/email-actions');

module.exports = {
    [WELCOME] : {
        subject: 'Welcome on board',
        templateName: 'welcome'
    },
    [FORGOT_PASS] : {
        subject: 'Your password is ok',
        templateName: 'forgot_pass'
    },
}