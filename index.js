const nodemailer = require('nodemailer');
const sendMailTest = () => {
  const transporter = nodemailer.createTransport({
   'host': 'smtp.dirox.dev',
    // 'host': '10.84.4.25',
    'port': 2525,
//    'tls': false,
    'secure':false,
    'tls': {
      'rejectUnauthorized': false
    }
  });

  const mailOptions = {
    from: 'CLI <test@nina.dev>',
    to: 'mrteo@yopmail.com',
    subject: 'Test send mail.',
    text: 'That was easy!',
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
sendMailTest();