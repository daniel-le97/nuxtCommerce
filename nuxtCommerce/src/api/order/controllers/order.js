"use strict";

const stripe = require("stripe")(process.env.STRIPE_KEY);

const MY_DOMAIN = "http://localhost:3000/cart";
const { createCoreController } = require("@strapi/strapi").factories;
module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { cartDetail, cartTotal } = ctx.request.body;
    // build line items array
    const line_items = cartDetail.map((cartItem) => {
      const item = {};
      (item.price_data = {
        currency: "usd",
        product_data: {
          name: cartItem.name,
          images: [`${cartItem.url}`],
        },
        unit_amount: (cartItem.price * 100).toFixed(0),
      }),
        (item.quantity = cartItem.quantity);
      return item;
    });
    // create order
    await strapi.service("api::order.order").create({
      data: {
        item: line_items,
      },
    });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${MY_DOMAIN}?success=true`,
      cancel_url: `${MY_DOMAIN}?canceled=true`,
    });
    return { id: session.id };
  },
}));
