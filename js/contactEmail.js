const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};
const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 1500);
};
const contactEmail = async (phoneNumber, purpose, subject, email) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/email',
      data: {
        phoneNumber,
        purpose,
        subject,
        contacterEmail: email,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Email sent successfully!');
      window.setTimeout(() => {
        location.assign('/home');
      }, 300);
    }
  } catch (err) {
    const message = err.response.data;
    console.log(message);
    if (message.includes('email_1 dup key:')) {
      showAlert('error', 'You have sent an email once!');
    } else{
        showAlert('error', err.response.data.message);
    }
  }
};
const contactUsForm = document.querySelector('#contact');
if (contactUsForm) {
  contactUsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const phoneNumber = document.getElementById('phone').value;
    const purpose = document.getElementById('purpose').value;
    const subject = document.getElementById('subject').value;
    const email = document.getElementById('email').value;
    contactEmail(phoneNumber, purpose, subject, email);
  });
}
