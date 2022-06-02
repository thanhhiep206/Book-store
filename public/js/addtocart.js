const addtocartBtn = document.getElementById('addcart');
const addtocart = (bookId) => {
  axios({
    method: 'post',
    url: `/api/v1/carts/${bookId}`,
  })
    .then((res) => {
      if (res.data.status === 'success') {
        window.setTimeout(() => {
          location.assign('/cart');
        }, 1000);
      }
    })
    .catch((e) => {
      alert(e.response.data.message);
    });
};

addtocartBtn.addEventListener('click', (e) => {
  console.log(1);
  e.target.textContent = 'Processing...';
  const { bookId } = e.target.dataset;
  addtocart(bookId);
});
