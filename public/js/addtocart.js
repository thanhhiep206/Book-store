const addtocartBtn = document.getElementById('addcart');
const addtocart = (bookId) => {
  axios({
    method: 'post',
    url: `http://localhost:3000/api/v1/carts/${bookId}`,
  })
    .then((res) => {
      try {
        if (res.data.status === 'success') {
          window.setTimeout(() => {
            location.assign('/cart');
          }, 1000);
        }
      } catch (e) {
        console.log(e.response.data);
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