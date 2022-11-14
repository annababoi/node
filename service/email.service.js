const nodemailer = require('nodemailer');

const path = require('path');
const EmailTemplates = require('email-templates');

const emailTemplates = require('../email-templates')
// const {NO_REPLY_EMAIL, NO_REPLY_EMAIL_PASS} = require('../config/config')
const {Api_error} = require("../error/ApiError");


const sendEmail = async (receiverMail, emailAction,  locals = {}) => {
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'testtestio123ef@gmail.com',
        pass: 'clarzpxrdurqvcpj'
    },
    secure:false
});

const templateInfo = emailTemplates[emailAction];

if(!templateInfo){
    throw new Api_error('Wrong template', 500)
}

const templateRenderer = new EmailTemplates({
    views:{
        root: path.join(process.cwd(), 'email-templates')
    }
})

    const html = await templateRenderer.render(templateInfo.templateName)

return transporter.sendMail({
    from: 'No reply',
    to: receiverMail,
    subject: templateInfo.subject,
    html

})
};

module.exports = {
    sendEmail
}