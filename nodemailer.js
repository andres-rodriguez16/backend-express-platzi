const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: 'andres.rodriguez@itglobers.com',
    pass: 'eksocgksqfznecdf',
  },
  // host: 'smtp.ethereal.email',
  // port: 587,
  // auth: {
  //   user: 'winona.yost45@ethereal.email',
  //   pass: 'hBB4myWa66cvsMcCgj',
  // },
});

// async..await is not allowed in global scope, must use a wrapper
async function send() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'andres.rodriguez@itglobers.com', // sender address
    to: 'andresyrg16@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>', // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}

send();
// .catch(console.error);
