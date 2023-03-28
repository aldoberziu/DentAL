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
const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:8000/api/users/logout',
    });
    if ((res.data.status = 'success')) {
      showAlert('success', 'Logged out successfully!');
      window.setTimeout(() => {
        location.assign('/home');
      }, 1000);
      location.reload(true);
    }
  } catch (err) {
    console.log(err.response);
    showAlert('error', 'Error logging out! Try again.');
  }
};
const logOutBtn = document.querySelector('.logoutBtn');
if (logOutBtn) {
  logOutBtn.addEventListener('click', logout);
}
