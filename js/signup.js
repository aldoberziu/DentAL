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
  const signup = async (
    username,
    email,
    password,
    passwordConfirm,
    passwordStrength
  ) => {
    try {
      let res;
      if (passwordStrength === 'Strong') {
        res = await axios({
          method: 'POST',
          url: 'https://dental-app-oxvg.onrender.com/api/users/signup',
          data: {
            name: username,
            email: email,
            password: password,
            passwordConfirm: passwordConfirm,
          },
        });
      }
      if (res.data.status === 'success') {
        showAlert('success', 'Logged in Successfully!');
        window.setTimeout(() => {
          location.assign('/home');
        }, 300);
      }
    } catch (err) {
      const message = err.response.data.split(': ')[3].split('<br>')[0];
      if (message.includes('email_1 dup key')) {
        showAlert('error', 'That email already belongs to an existing account!');
      } else if (message.includes('is shorter than the minimum allowed length')) {
        showAlert('error', 'Please provide a longer password (8 characters)');
      } else if (passwordStrength === 'Weak' || passwordStrength === 'Medium') {
        showAlert(
          'error',
          'Please provide a stronger password! Include symbols,numbers and uppercase letters'
        );
      } else {
        showAlert('error', message);
      }
    }
  };
  const signupForm = document.querySelector('.signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const passwordConfirm = document.getElementById('passwordConfirm').value;
      const passwordStrength = document.getElementById('StrengthDisp').innerText;
      signup(username, email, password, passwordConfirm, passwordStrength);
    });
  }