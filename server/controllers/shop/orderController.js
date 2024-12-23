import { stripe } from "../../config/stripe.js";
import Order from "../../models/Order.js";
import Cart from "../../models/Cart.js";

const createCheckoutSession = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      cartId,
    } = req.body;

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: "Invalid or empty products array" });
    }

    const lineItems = cartItems.map((product) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.title,
            images: [product.image],
          },
          unit_amount: product.price * 100,
        },
        quantity: product.quantity || 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/shop/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/shop/purchase-cancel`,
      metadata: {
        userId: userId,
        products: JSON.stringify(
          cartItems.map((p) => ({
            id: p.productId,
            title: p.title,
            quantity: p.quantity,
            price: p.price,
          }))
        ),
        totalAmount: totalAmount,
      },
    });

    const newOrder = new Order({
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      cartId,
      stripeSessionId: session.id,
    });

    await newOrder.save();

    res
      .status(201)
      .json({ success: true, orderId: newOrder._id, sessionId: session.id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const checkoutSuccess = async (req, res) => {
  try {
    const { sessionId, orderId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    let order = await Order.findById(orderId);

    if (session.payment_status !== "paid") {
      return res
        .status(400)
        .json({ success: false, message: "Payment not successful" });
    }

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.orderUpdateDate = new Date();

    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId);

    await order.save();

    res
      .status(200)
      .json({ success: true, message: "Order confirmed", data: order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { createCheckoutSession, checkoutSuccess };
