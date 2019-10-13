const mailgun = require("mailgun-js");
const mg = mailgun({
    apiKey: process.env.MAILGUN_APIKEY, 
    domain: process.env.MAILGUN_DOMAIN,
    host: process.env.MAILGUN_HOST
});


sendMail = function sendMail(user) {

    var text = 'firstname: ' + user.firstName 
        + '\nlastname: ' + user.lastName 
        + '\nemail: ' + user.email
        + '\nagreement: ' + user.agreement;

    const data = {
        from: 'BMW IT-Cup Registration <postmaster@mg.bmw-itcup.de>',
        to: 'fveitzen@gmail.com',
        subject: '--> New registration',
        text: text
    };

    mg.messages().send(data, function (error, body) {
        if (error) {
            console.log('Error sending registration mail.')
        } else {

        }
    });

};

sendUpdateMail = function sendUpdateMail(user, subject, content) {

    const data = {
        from: 'BMW IT-Cup Registration <frank@mg.bmw-itcup.de>',
        to: user.email,
        subject: subject,
        text: content
    };

    mg.messages().send(data, function (error, body) {
        if (error) {
            console.log('Error sending update mail: ' + error)
        } else {
            console.log('Send Mail to ' + user.userName);
        }
    });

}

module.exports = { sendMail, sendUpdateMail };





