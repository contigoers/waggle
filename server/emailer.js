const nodemailer = require('nodemailer');

const defaultEmailData = { from: 'waggl.help@gmail.com' };

const sendEmail = (emailData) => {
  const completeEmailData = Object.assign(defaultEmailData, emailData);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'waggl.help@gmail.com',
      pass: process.env.EMAIL_PW,
    },
  });
  return transporter
    .sendMail(completeEmailData)
    .then(info => console.log(`Message send: ${info.response}`))
    .catch(err => console.log(`Problem sending email: ${err}`));
};

module.exports = { sendEmail };
