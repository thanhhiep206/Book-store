//updateName
const updateMe = document.querySelector('#update');
const updatePassword = document.querySelector('#update_password');
const update = (data) => {
  axios({
    method: 'patch',
    url: '/api/v1/users/updateMe',
    data,
  })
    .then((res) => {
      if (res.data.status === 'success') {
        alert('update successfully!');
        location.reload(true);
      }
    })
    .catch((e) => {
      alert(e.response.data.message);
    });
};
updateMe.addEventListener('submit', (e) => {
  e.preventDefault();
  const form = new FormData();
  form.append('name', document.getElementById('myname').value);
  form.append('photo', document.getElementById('photo').files[0]);
  console.log(form);
  update(form);
});
//update Password
const updatePass = (password, newpassword, passwordConfirm) => {
  axios({
    method: 'post',
    url: '/api/v1/users/updatePasswordMe',
    data: {
      password,
      newpassword,
      passwordConfirm,
    },
  })
    .then((res) => {
      try {
        if (res.data.status === 'success') {
          alert('update password successfully!');
          location.reload(true);
        }
      } catch (e) {
        console.log(e);
      }
    })
    .catch((e) => {
      alert(e);
    });
};
updatePassword.addEventListener('submit', (e) => {
  e.preventDefault();
  const password = document.querySelector('#password_current').value;
  const newpassword = document.querySelector('#newpassword').value;
  const passwordConfirm = document.querySelector('#password_confirm').value;
  updatePass(password, newpassword, passwordConfirm);
});
