const deleteBtn = document.querySelectorAll('#dlcart');

const deleteCart = (bookincart) => {
  axios({
    method: 'delete',
    url: `/api/v1/carts/${bookincart}`,
  })
    .then((res) => {
      if (res.data.status === 'success') {
        location.reload(true);
      }
    })
    .catch((e) => {
      console.log(e.response.data.message);
    });
};

deleteBtn.forEach((ele) =>
  ele.addEventListener('click', (e) => {
    e.preventDefault();
    const { bookincart } = e.target.dataset;

    deleteCart(bookincart);
  })
);
