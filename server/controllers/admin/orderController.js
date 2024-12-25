import Order from "../../models/Order.js";

const fetchAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    if (!orders.length) {
      return res
        .status(404)
        .json({ succes: false, message: "No orders found" });
    }
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ succes: false, message: "No order found" });
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ succes: false, message: "No order found" });
    }

    await Order.findByIdAndUpdate(id, { orderStatus: status });

    res
      .status(200)
      .json({ success: true, message: "Order Status Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { fetchAllOrders, getOrder, updateOrderStatus };
