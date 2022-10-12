const express = require("express");
const homeRouter = express.Router();
const Blog = require("../../models/blogModel");
const { getObjectSignedUrl } = require('../../s3');

homeRouter.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: "desc" });
    for (let blog of blogs) {
      blog.blogImage = await getObjectSignedUrl(blog.blogImage);
    }
    res.status(200).render("home", { blogs: blogs });
  } catch (err) {
    res.status(500).json(err);
  }
});
homeRouter.get("/tarifler", async (req, res) => {
  res.status(200).render("recipes");
});
homeRouter.get("/duenya", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: "desc" });
    for (let blog of blogs) {
      blog.blogImage = await getObjectSignedUrl(blog.blogImage);
    }
    res.status(200).render("world", { blogs: blogs });
  } catch (err) {
    res.status(500).json(err);
  }
});
homeRouter.get("/kahvalti", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: "desc" });
    for (let blog of blogs) {
      blog.blogImage = await getObjectSignedUrl(blog.blogImage);
    }
    res.status(200).render("breakfast", { blogs: blogs });
  } catch (err) {
    res.status(500).json(err);
  }
});
homeRouter.get("/aksam-yemegi", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: "desc" });
    for (let blog of blogs) {
      blog.blogImage = await getObjectSignedUrl(blog.blogImage);
    }
    res.status(200).render("dinner", { blogs: blogs });
  } catch (err) {
    res.status(500).json(err);
  }
});
homeRouter.get("/tatlilar", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: "desc" });
    for (let blog of blogs) {
      blog.blogImage = await getObjectSignedUrl(blog.blogImage);
    }
    res.status(200).render("desserts", { blogs: blogs });
  } catch (err) {
    res.status(500).json(err);
  }
});
homeRouter.get("/signin", async (req, res) => {
  res.status(200).render("../views/admin/signin.ejs");
});

module.exports = homeRouter;
