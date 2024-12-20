import Address from "../../models/Address.js";

const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;
    if (!userId || !address || !city || !pincode || !phone) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const newAddress = new Address({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });

    await newAddress.save();

    res.status(201).json({ sucess: true, data: newAddress });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User Id is required",
      });
    }

    const addresses = await Address.find({ userId });
    if (!addresses) {
      return res.status(404).json({
        success: false,
        message: "No address found",
      });
    }

    res.status(200).json({ sucess: true, data: addresses });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formdata = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Address ID is required",
      });
    }
    const address = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      formdata,
      { new: true }
    );

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "No address found",
      });
    }

    res.status(200).json({ success: true, data: address });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Address ID is required",
      });
    }

    const address = await Address.findOneAndDelete({ _id: addressId, userId });
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "No address found",
      });
    }

    res
      .status(200)
      .json({ success: true, message: "Address deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

export { addAddress, fetchAllAddress, editAddress, deleteAddress };
