const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: body.line_items,
    mode: "payment",
    success_url: `${process.env.BASE_URL}/success`,
    cancel_url: `${process.env.BASE_URL}/cart`,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ id: session.id }),
  };
};
