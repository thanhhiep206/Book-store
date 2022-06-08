const nodeMailer = require('nodemailer');

const sendMail = async (mailoption) => {
  const transporter = nodeMailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '8bb7d695948e55',
      pass: 'c507ca1da88bf8',
    },
  });
  const options = {
    from: 'gblhiep@gmail.com',
    to: mailoption.email,
    subject: mailoption.subject,
    text: mailoption.message,
  };

  await transporter.sendMail(options);
};
module.exports = sendMail;
