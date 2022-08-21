const deleteBtn = document.querySelectorAll('#deletebtn');

const deleteItem = (model, itemId) => {
  axios({
    method: 'delete',
    url: `/api/v1/${model}/${itemId}`,
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
    swal({
      title: 'Bạn chắc chắn chứ',
      text: 'Bạn có muốn xóa không',
      icon: 'warning',
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteItem(model, itemId);
        swal('Sản phẩm đã được xóa ', {
          icon: 'success',
        });
      }
    });
  })
);
