const paymentBtn = document.querySelector('.payment');
const stripe = Stripe(
  'pk_test_51L2suxEvR2fI04feHxbgK9ONdAY0VeN6104AfSU8GItAxTsB97BosXGhJmQT5ojbx4MxblS2umx8PBU4E6o5DXkA002qLFhYQW'
);

const orderBook = async (bookId, fullname, email, phone, address, note) => {
  try {
    // 1) Get Checkout session from API

    const session = await axios.post(`/api/v1/orders/checkout-session/${bookId}`, {
      fullname: fullname,
      email: email,
      phone: phone,
      address: address,
      note: note,
    });
    // 2) Create checkout from + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (e) {
    console.log(e);
  }
};
//dat hang nhan hang thanh toan
const orderBookCod = async (bookId, fullname, email, phone, address, pack, note) => {
  try {
    await axios.post(`/api/v1/orders/cod/${bookId}`, {
      fullname: fullname,
      phone: phone,
      email: email,
      address: address,
      pack: pack,
      note: note,
    });
  } catch (e) {
    console.log(e);
  }
};
paymentBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const { bookId } = e.target.dataset;
  const fullname = document.querySelector('.fullname_order').value;
  const email = document.querySelector('.email_order').value;
  const phone = document.querySelector('.phone_order').value;
  const address = document.querySelector('.address_order').value;
  const packSelect = document.querySelector('.pack_order');
  const pack = packSelect.options[packSelect.selectedIndex].text;
  const note = document.querySelector('.note_order').value;
  const payment_order = document.querySelector('.payment_order').value;
  if (
    fullname.length == 0 ||
    email.length == 0 ||
    phone.length == 0 ||
    address.length == 0 ||
    pack == 'Chọn quy cách đóng gói' ||
    payment_order == 'Chọn hình thức'
  ) {
    swal({
      title: 'Vui lòng điền đầy đủ các thông tin',
      icon: 'error',
    });
    return false;
  }

  if (payment_order == 2) {
    swal({
      title: 'Bạn chắc chắn chứ',
      icon: 'warning',
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal('Vui lòng chờ để chuyển trang đến thanh toán qua thẻ ', {
          icon: 'success',
        });
        orderBook(bookId, fullname, email, phone, address, note);
      }
    });
  } else if (payment_order == 1) {
    orderBookCod(bookId, fullname, email, phone, address, pack, note);
    swal({
      title:
        'Đặt hàng thành công , vui lòng chờ quay lại trang chủ và xem thông tin đơn hàng tại trang cá nhân thông tin của bạn',
      icon: 'success',
    });
    window.setTimeout(() => {
      location.assign('/');
    }, 1000);
  }
});
