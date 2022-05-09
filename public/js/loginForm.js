const loginForm = document.querySelector('#form-signin');
const logoutBtn = document.querySelector('.logout');
const login = (email, password) => {
  axios({
    method: 'post',
    url: 'http://localhost:3000/api/v1/users/login',
    data: {
      email,
      password,
    },
  })
    .then((res) => {
      try {
        if (res.data.status === 'success') {
          alert('Login successfully!');
          window.setTimeout(() => {
            location.assign('/');
          }, 1000);
        }
      } catch (e) {
        console.log(e.response.data);
      }
    })
    .catch((e) => {
      alert(e.response.data.message);
    });
};
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  login(email, password);
});
// logout
const logout = () => {
  console.log(1);
  axios({
    method: 'get',
    url: 'http://localhost:3000/api/v1/users/logout',
  })
    .then((res) => {
      try {
        if (res.data.status === 'success') {
          alert('logout successfully!');
          location.reload(true);
        }
      } catch (e) {
        console.log(e.response.data);
      }
    })
    .catch((e) => {
      alert(e.response.data.message);
    });
};
logoutBtn.addEventListener('click', logout);
