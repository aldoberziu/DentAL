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
    const message = err.response.data.split(': ')[3].split('<br>')[0];
    if(message === 'clinic_1_user_1 dup key'){
      showAlert('error', 'You have reviewed once!');
    } else if(message.includes('type string')){
      showAlert('error', 'Please rate using numbers 1-5 !');
    } else{
      showAlert('error', message);
    }
    console.log(err.response);
  }
};
const submitReviewForm = document.querySelector('.review');
var rate_value;
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
    console.log(err.response)
    showAlert('error', 'Error deleting! Try again.');
  }
};
const deleteReviewBtn = document.querySelector('.review__delete');
if(deleteReviewBtn){
  deleteReviewBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const url = document.getElementById('review__url').value;
    console.log('url: ', url)
    deleteReview(url);
  })
}
