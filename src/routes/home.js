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
homeRouter.get("/duenya", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: "desc" });
    res.render("world", { blogs: blogs });
  } catch (err) {
    res.status(500).json(err);
  }
});
homeRouter.get("/kahvalti", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: "desc" });
    res.render("breakfast", { blogs: blogs });
  } catch (err) {
    res.status(500).json(err);
  }
});
homeRouter.get("/aksam-yemegi", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: "desc" });
    res.render("dinner", { blogs: blogs });
  } catch (err) {
    res.status(500).json(err);
  }
});
homeRouter.get("/tatlilar", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: "desc" });
    res.render("desserts", { blogs: blogs });
  } catch (err) {
    res.status(500).json(err);
  }
});
homeRouter.get("/signin", async (req, res) => {
  res.render("../views/admin/signin.ejs");
});

module.exports = homeRouter;
