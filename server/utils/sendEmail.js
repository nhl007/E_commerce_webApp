const nodemailer = require('nodemailer');

const sendEmail = async (info) => {
  const transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '5e72871fd40e34',
      pass: '585b570f54c334',
    },
  });
  const options = {
    from: `Nihal <noreplay@nihal.co>`,
    to: info.email,
    subject: info.sub,
    text: info.message,
  };

  await transport.sendMail(options);
};

module.exports = sendEmail;
