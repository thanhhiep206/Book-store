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
paymentBtn.forEach((ele) =>
  ele.addEventListener('click', (e) => {
    e.preventDefault();
    const { bookId } = e.target.dataset;
    orderBook(bookId);
  })
);
