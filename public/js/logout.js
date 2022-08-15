const logoutBtn = document.getElementById('logout');
const logout = () => {
  axios({
    method: 'get',
    url: '/api/v1/users/logout',
  })
    .then((res) => {
      if (res.data.status === 'success') {
        location.assign('/');
      }
    })
    .catch((e) => {
      console.log(e);
    });
};
logoutBtn.addEventListener('click', logout);
