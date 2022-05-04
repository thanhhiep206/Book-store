const signupForm = document.querySelector('#form--signup');
const signup = (name, email, password) => {
  axios({
    method: 'post',
    url: 'http://localhost:3000/api/v1/users/signup',
    data: {
      name,
      email,
      password,
    },
  })
    .then((res) => {
      try {
        if (res.data.status === 'success') {
          alert('Signup successfully!, Please Login to site');
          window.setTimeout(() => {
            location.assign('/login');
          }, 1000);
        }
      } catch (e) {
        console.log(e);
      }
    })
    .catch((e) => {
      alert(e.response.data.message);
    });
};
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('#name--signup').value;
  const email = document.querySelector('#email--signup').value;
  const password = document.querySelector('#password--signup').value;

  signup(name, email, password);
});
