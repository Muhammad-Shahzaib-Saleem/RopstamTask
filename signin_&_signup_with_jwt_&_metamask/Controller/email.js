const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  // connect with the smtp
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'jakob65@ethereal.email',
        pass: '1PzZNgeEJyxHCumAN6'
    }
});

  let info = await transporter.sendMail({
    from: '"CEO👻" <shazijutt987@gmail.com>', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    
  });

  console.log("Message sent: %s", info.messageId);
  res.json(info);
};

module.exports = sendMail;