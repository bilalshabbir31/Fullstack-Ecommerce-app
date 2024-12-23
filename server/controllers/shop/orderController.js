import { stripe } from "../../config/stripe.js";
import Order from "../../models/Order.js";

const createCheckoutSession = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfopaymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId
    } = req.body;

    if (
      !cartItems ||
      !Array.isArray(cartItems.items) ||
      cartItems.items.length === 0
    ) {
      return res.status(400).json({ error: "Invalid or empty products array" });
    }

    const lineItems = cartItems.items.map((product) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.title,
            images: [product.image],
          },
          unit_amount: product.price.toFixed(2),
        },
        quantity: product.quantity || 1,
      };
    });

    console.log(lineItems);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
      metadata: {
        userId: userId,
        products: JSON.stringify(
          cartItems.items.map((p) => ({
            id: p.productId,
            title: p.title,
            quantity: p.quantity,
            price: p.price,
          }))
        ),
        totalAmount: totalAmount,
      },
    });

    console.log(session);

    const newOrder = new Order({
      userId,
      cartItems,
      addressInfopaymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      stripeSessionId: session.id,
    });

    await newOrder.save();


    res.status(201).json({ success: true, orderId: newOrder._id, session: session.id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const checkoutSuccess = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { createCheckoutSession, checkoutSuccess };
