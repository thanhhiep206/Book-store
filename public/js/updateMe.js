const updateMe = document.querySelector('#update');
const update = (name) => {
  console.log(name);
  axios({
    method: 'post',
    url: 'http://localhost:3000/api/v1/users/updateMe',
    data: {
      name,
    },
  })
    .then((res) => {
      try {
        if (res.data.status === 'success') {
          alert('update successfully!');
          location.reload(true);
        }
      } catch (e) {
        console.log(e);
      }
    })
    .catch((e) => {
      alert(e.response.data.message);
    });
};
updateMe.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('#myname').value;
  update(name);
});
