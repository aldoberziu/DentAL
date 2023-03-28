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
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://127.0.0.1:8000/api/users/updateMyPassword'
        : 'http://127.0.0.1:8000/api/users/updateMe';
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });
    if ((res.data.status = 'success')) {
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
      window.setTimeout(() => {
        location.assign('/me');
      }, 1000);
      location.reload(true);
    }
  } catch (err) {
    const message = err.response.data.split(': ')[1].split('<br>')[0];
    console.log('message: ', message);
    showAlert('error', message);
  }
};
if (userDataForm) {
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('email', document.getElementById('email').value);
    form.append('name', document.getElementById('name').value);
    form.append('photo', document.getElementById('photo').files[0]);
    //form becomes an object now
    updateSettings(form, 'data');
  });
}
if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn-save-password').innerHTML = 'Updating...';
    const passwordCurrent = document.getElementById('currentPassword').value;
    const password = document.getElementById('newPassword').value;
    const passwordConfirm = document.getElementById('confirmPassword').value;
    const passwordStrength = document.getElementById('StrengthDisp').innerText;
    if (passwordStrength === 'Strong') {
      await updateSettings(
        { passwordCurrent, password, passwordConfirm },
        'password'
      );
    } else {
      showAlert(
        'error',
        'Please create a stronger password using numbers, symbols and uppercase letters!'
      );
    }
    document.querySelector('.btn-save-password').innerHTML = 'Save Password';
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
  });
}
