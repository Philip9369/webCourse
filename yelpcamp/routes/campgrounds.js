const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
//
const Campground = require("../models/campground");
// // const Review = require("../models/review");

router.get("/", async (req, res) => {
  const campgrounds = await Campground.find({});
  return res.render("campgrounds/index", { campgrounds });
});

router.get("/new", (req, res) => {
  return res.render("campgrounds/new");
});

router.post(
  "/",
  catchAsync(async (req, res, next) => {
    if (!req.body.campground) throw new ExpressError("Invalid Data", 400);
    const campground = new Campground(req.body.campground);
    await campground.save();
    req.flash("success", "Successfully made a  new capmground!");
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate(
      "reviews"
    );
    if (!campground) {
      req.flash("error", "Campground not Found.");
      return res.redirect("/campgrounds");
    }
    return res.render("campgrounds/show", { campground });
  })
);

router.get(
  "/:id/edit",
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    if (!campground) {
      req.flash("error", "Campground not Found.");
      return res.redirect("/campgrounds");
    }
    return res.render("campgrounds/edit", { campground });
  })
);

router.put(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {
      ...req.body.campground,
    });
    req.flash("success", "Successfully updated this ground for camping.");
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Campground.findByIdAndDelete(id, req.body);
  req.flash("success", "Successfully deleted campground.");
  res.redirect("/campgrounds");
  // res.send("easter")
});

module.exports = router;
