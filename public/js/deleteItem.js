const deleteBtn = document.querySelectorAll('#deletebtn');

const deleteItem = (model, itemId) => {
  axios({
    method: 'delete',
    url: `http://localhost:3000/api/v1/${model}/${itemId}`,
  })
    .then((res) => {
      if (res.data.status === 'success') {
        location.reload(true);
      }
    })
    .catch((e) => {
      console.log(e.response.data.msg);
    });
};

deleteBtn.forEach((ele) =>
  ele.addEventListener('click', (e) => {
    e.preventDefault();
    const { model, itemId } = e.target.dataset;
    console.log(e.target.dataset);
    deleteItem(model, itemId);
  })
);
