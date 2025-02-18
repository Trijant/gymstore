
const dotenv = require("dotenv");
dotenv.config();

exports.sendMail = async (to_email, subject, message) => {

  const transport = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    port: 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  transport.sendMail({
    from: process.env.EMAIL_FROM,
    to: to_email,
    subject: subject,
    html: message,
  }, (error) => { if (error) console.log(error) });
}
