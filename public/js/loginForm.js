const loginForm = document.querySelector('#form--login');
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
  console.log(email);
  login(email, password);
});
