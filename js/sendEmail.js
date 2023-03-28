const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'xhajarilindjes69@gmail.com',
    pass: 'aldo1234',
  },
});

const mailOptions = {
  username,
  from,
  to: 'berziu2004@example.com',
  phone,
  subject,
  text,
};
transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
// const sendEmail = async (name, from, phone, subject, text) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'xhajarilindjes69@gmail.com',
//       pass: 'aldo1234',
//     },
//   });
//   transporter.sendMail({
//     name,
//     from,
//     phone,
//     subject,
//     text,
//   });
// };
const submitEmailForm = document.querySelector('#contact');
if (submitEmailForm) {
  submitEmailForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const from = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const subject = document.getElementById('purpose').value;
    const text = document.getElementById('subject').value;
    mailOptions.username = name;
    mailOptions.from = from;
    mailOptions.subject = subject;
    mailOptions.text = text;
    mailOptions.phone = phone;
    console.log('mailOptions: ', mailOptions);
  });
}
// if (submitEmailForm) {
//   submitEmailForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const name = document.getElementById('name').value;
//     const from = document.getElementById('email').value;
//     const phone = document.getElementById('phone').value;
//     const subject = document.getElementById('purpose').value;
//     const text = document.getElementById('subject').value;
//     sendEmail(name, from, phone, subject, text);
//   });
// }
