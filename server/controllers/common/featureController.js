import Feature from "../../models/Feature.js";

const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({success: false, message: "Please add image."})
    }

    const featureImage = new Feature({
      image,
    });

    await featureImage.save();
    res.status(201).json({ success: true, data: featureImage });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const fetchFeatureImages = async (req, res) => {
  try {
    const featureImages = await Feature.find({});
    res.status(200).json({ success: true, data: featureImages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addFeatureImage, fetchFeatureImages };
