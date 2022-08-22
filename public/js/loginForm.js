const loginForm = document.querySelector('#form-signin');

const login = (email, password) => {
  axios({
    method: 'post',
    url: '/api/v1/users/login',
    data: {
      email,
      password,
    },
  })
    .then((res) => {
      if (res.data.status === 'success') {
        window.setTimeout(() => {
          location.assign('/');
        }, 1000);
      }
    })
    .catch((e) => {
      swal(e.response.data.message, {
        icon: 'error',
      });
    });
};
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  login(email, password);
});
