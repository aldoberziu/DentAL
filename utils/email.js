const nodemailer = require('nodemailer');
const catchAsync = require('./../utils/catchAsync');
const pug = require('pug');
const { htmlToText } = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `DentAL <${process.env.EMAIL_FROM}>`;
  }
  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD
        }
      })
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  //will send the actual email
  async send(template, subject) {
    //1) render the HTML template
    const html = pug.renderFile(
      `${__dirname}/../views/email/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject,
      }
    );

    //2) define the email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html),
    };
    //3) create transport and send email
    await this.newTransport().sendMail(mailOptions)
  }
  //kur thu async function here, mund ti besh await kudo sa her qe e thrret funksionin
  async sendWelcome() {
    await this.send('welcome', 'Welcome to DentAL');
  }
  async sendPasswordReset() {
    await this.send('passwordReset', 'Password reset token is valid for 10min')
  }
};

//__dirname is the location of the currently running script
