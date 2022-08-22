const signupForm = document.querySelector('#form-signup');
const signup = (name, email, password, passwordConfirm) => {
  console.log(passwordConfirm);
  axios({
    method: 'post',
    url: '/api/v1/users/signup',
    data: {
      name,
      email,
      password,
      passwordConfirm,
    },
  })
    .then((res) => {
      if (res.data.status === 'success') {
        swal('Đăng kí tài khoản thành công vui lòng đăng nhập để tiếp tục', {
          icon: 'success',
        });
      }
    })
    .catch((e) => {
      console.log(e);
      if (e.response.data.startsWith('E11000')) {
        swal('Email đã tồn tại vui lòng chọn email khác', {
          icon: 'error',
        });
      }

      swal(e.response.data, {
        icon: 'error',
      });
    });
};
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('#name--signup').value;
  const email = document.querySelector('#email--signup').value;
  const password = document.querySelector('#password--signup').value;
  const passwordConfirm = document.querySelector('#passwordConfirm--signup').value;

  signup(name, email, password, passwordConfirm);
});
