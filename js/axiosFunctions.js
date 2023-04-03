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
        ? 'https://dental-app-oxvg.onrender.com/api/users/updateMyPassword'
        : 'https://dental-app-oxvg.onrender.com/api/users/updateMe';
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const contactEmail = async (phoneNumber, purpose, subject, email) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'https://dental-app-oxvg.onrender.com/api/email',
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
    const message = err.response.data.split('<pre>')[1].split('</pre>');
    if (message.includes('Internal Server Error')) {
      showAlert('error', 'You have sent an email once!');
    } else {
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'https://dental-app-oxvg.onrender.com/api/users/login',
      data: {
        email: email,
        password: password,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Logged in Successfully!');
      window.setTimeout(() => {
        location.assign('/home');
      }, 300);
    }
  } catch (err) {
    const message = err.response.data.split('<pre>')[1].split('</pre>')[0];
    showAlert('error', message);
  }
};
const loginForm = document.querySelector('.loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'https://dental-app-oxvg.onrender.com/api/users/logout',
    });
    if ((res.data.status = 'success')) {
      showAlert('success', 'Logged out successfully!');
      window.setTimeout(() => {
        location.assign('/home');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', 'Error logging out! Try again.');
  }
};
const logOutBtn = document.querySelector('.logoutBtn');
if (logOutBtn) {
  logOutBtn.addEventListener('click', logout);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const submitReview = async (review, rating, url) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${url}`,
      data: {
        review: review,
        rating: rating,
      },
    });
    if ((res.data.status = 'success')) {
      showAlert('success', 'Submitted successfully!');
      window.setTimeout(() => {
        location.reload(true);
      }, 300);
    }
  } catch (err) {
    const message = err.response.data.split('<pre>')[1].split('</pre>')[0];
    if (message === 'Internal Server Error') {
      showAlert('error', 'You have reviewed once!');
    } else {
      showAlert('error', message);
    }
  }
};
const submitReviewForm = document.querySelector('.review');
var rate_value = 1;
if (
  document.getElementById('star1').addEventListener('click', function () {
    rate_value = document.getElementById('star1').value;
  })
) {
} else if (
  document.getElementById('star2').addEventListener('click', function () {
    rate_value = document.getElementById('star2').value;
  })
) {
} else if (
  document.getElementById('star3').addEventListener('click', function () {
    rate_value = document.getElementById('star3').value;
  })
) {
} else if (
  document.getElementById('star4').addEventListener('click', function () {
    rate_value = document.getElementById('star4').value;
  })
) {
} else if (
  document.getElementById('star5').addEventListener('click', function () {
    rate_value = document.getElementById('star5').value;
  })
) {
}
if (submitReviewForm) {
  submitReviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const review = document.getElementById('review').value;
    const rating = rate_value;
    const url = document.getElementById('reviewUrl').value;
    submitReview(review, rating, url);
  });
}
////////////////////////////////////////////////////////
const deleteReview = async (url) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: url,
    });
    if ((res.data.status = 'success')) {
      showAlert('success', 'Review deleted successfully!');
      location.reload(true);
    }
  } catch (err) {
    showAlert('error', 'Error deleting! Try again.');
  }
};
const deleteReviewBtn = document.querySelector('.review__delete');
if (deleteReviewBtn) {
  deleteReviewBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const url = document.getElementById('review__url').value;
    deleteReview(url);
  });
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
