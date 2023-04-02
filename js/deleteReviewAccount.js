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
    console.log(err.response);
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
