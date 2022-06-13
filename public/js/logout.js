const logoutBtn = document.getElementById('logout');
const logout = () => {
  axios({
    method: 'get',
    url: 'http://localhost:3000/api/v1/users/logout',
  })
    .then((res) => {
      if (res.data.status === 'success') {
        location.reload(true);
      }
    })
    .catch((e) => {
      console.log(e);
    });
};
logoutBtn.addEventListener('click', logout);
