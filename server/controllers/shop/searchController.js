import Product from "../../models/Product.js";

const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;
    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({
        success: false,
        message: "Keyword is required and must be in String format.",
      });
    }

    const regEX = new RegExp(keyword, "i");
    const createSearchQuery = {
      $or: [
        { title: regEX },
        { description: regEX },
        { category: regEX },
        { brand: regEX },
      ],
    };

    const searchResults = await Product.find(createSearchQuery);
    res.status(200).json({ success: true, data: searchResults });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

export { searchProducts };
