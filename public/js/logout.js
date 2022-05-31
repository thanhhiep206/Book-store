const logoutBtn = document.getElementById('logout');
const logout = () => {
  console.log(1);
  axios({
    method: 'get',
    url: '/api/v1/users/logout',
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
      console.log(e);
    });
};
logoutBtn.addEventListener('click', logout);
