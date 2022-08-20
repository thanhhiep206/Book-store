const paymentBtn = document.querySelectorAll('#payment');
const stripe = Stripe(
  'pk_test_51L2suxEvR2fI04feHxbgK9ONdAY0VeN6104AfSU8GItAxTsB97BosXGhJmQT5ojbx4MxblS2umx8PBU4E6o5DXkA002qLFhYQW'
);

const orderBook = async (bookId) => {
  try {
    // 1) Get Checkout session from API

    const session = await axios(`/api/v1/orders/checkout-session/${bookId}`);

    // 2) Create checkout from + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (e) {
    console.log(e);
  }
};
//dat hang nhan hang thanh toan
const orderBookCod = async (bookId) => {
  try {
    await axios.post(`/api/v1/orders/cod/${bookId}`);
  } catch (e) {
    console.log(e);
  }
};
paymentBtn.forEach((ele) =>
  ele.addEventListener('click', (e) => {
    e.preventDefault();
    const { bookId } = e.target.dataset;
    swal({
      title: 'Bạn chắc chắn chứ',
      icon: 'warning',
      buttons: ['Thanh toán khi nhận hàng', 'Thanh toán qua thẻ visa'],
    }).then((willDelete) => {
      if (willDelete) {
        swal('Vui lòng chờ để chuyển trang đến thanh toán qua thẻ ', {
          icon: 'success',
        });
        orderBook(bookId);
      } else {
        orderBookCod(bookId);
        swal('Bạn đã đặt hàng thành công , vui lòng kiểm tra đơn hàng và thanh toán trước khi nhận hàng ', {
          icon: 'success',
        });
      }
    });
  })
);
