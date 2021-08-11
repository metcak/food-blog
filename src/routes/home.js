const express = require("express");
const homeRouter = express.Router();
const Blog = require("../../models/blogModel");

homeRouter.get("/", async (req, res) => {
  // res.render("home", { data: data });
  try {
    const blogs = await Blog.find().sort({ date: "desc" });
    res.render("home", { blogs: blogs });
  } catch (err) {
    res.status(500).json(err);
  }
});
homeRouter.get("/tarifler", async (req, res) => {
  res.render("recipes");
});
homeRouter.get("/kahvalti", async (req, res) => {
  res.render("breakfast");
});
homeRouter.get("/aksam-yemegi", async (req, res) => {
  res.render("dinner");
});
homeRouter.get("/tatlilar", async (req, res) => {
  res.render("desserts");
});
homeRouter.get("/signin", async (req, res) => {
  res.render("../views/admin/signin.ejs");
});

module.exports = homeRouter;
