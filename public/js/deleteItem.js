const deleteBtn = document.getElementById('deletebtn');

const deleteItem = (model, itemId) => {
  axios({
    method: 'delete',
    url: `http://localhost:3000/api/v1/${model}/${itemId}`,
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
  console.log(1);
  const { model, itemId } = e.target.dataset;
  console.log(e.target.dataset);
  //   deleteItem(model, itemId);
});
