const deleteBtn = document.getElementById('dlcart');

const deleteCart = (bookincart) => {
  axios({
    method: 'delete',
    url: `/api/v1/carts/${bookincart}`,
  })
    .then((res) => {
      try {
        if (res.data.status === 'success') {
          location.reload(true);
        }
      } catch (e) {
        console.log(e.response.data);
      }
    })
    .catch((e) => {
      console.log(e.response.data.message);
    });
};

deleteBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const { bookincart } = e.target.dataset;

  deleteCart(bookincart);
});
