const rateController = {};
const Rate = require("../models/rateModel");

rateController.addRate = async (req, res, next) => {
  const { comment, star, id } = req.body;
  const { user } = req;
  try {
    const newRate = new Rate({
      comment,
      star,
      rater: user._id,
      ratee: id,
    });
    await newRate.save();
    return res.send({
      message: "the rate added successfully",
    });
  } catch (e) {
    return res.status(401).send({
      error: "please try again to rate the product",
    });
  }
};

rateController.fetchRates = async (req, res, next) => {
  const { _id } = req.params;
  try {
    const rates = await Rate.find({ ratee: _id }).populate("rater");
    return res.send({
      rates,
    });
  } catch (e) {
    return res.status(401).send({
      error: "fetching failed , try again",
    });
  }
};
module.exports = rateController;
