const paymentBtn = document.getElementById('payment');
const stripe = Stripe(
  'pk_test_51L2suxEvR2fI04feHxbgK9ONdAY0VeN6104AfSU8GItAxTsB97BosXGhJmQT5ojbx4MxblS2umx8PBU4E6o5DXkA002qLFhYQW'
);
const orderBook = async (bookId) => {
  try {
    // 1) Get Checkout session from API

    const session = await axios(`http://localhost:3000/api/v1/orders/checkout-session/${bookId}`);
    console.log(session);

    // 2) Create checkout from + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (e) {
    console.log(e);
  }
};
paymentBtn.addEventListener('click', (e) => {
  console.log(1);
  e.preventDefault();
  const { bookId } = e.target.dataset;
  orderBook(bookId);
});
