import { Router } from "express";
const homeRouter = Router();
import Blog from "../../models/blogModel.js";
import { getObjectSignedUrl } from "../../s3.js";

homeRouter.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: "desc" });
    const views = await Blog.find().sort({ views: -1 });
    for (let blog of blogs) {
      blog.blogImage = await getObjectSignedUrl(blog.blogImage);
    }
    for (let view of views) {
      view.blogImage = await getObjectSignedUrl(view.blogImage);
    }
    res.status(200).render("home", { blogs: blogs, views: views });
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

homeRouter.get("/ads.txt", async (req, res) => {
  res.status(200).sendFile("ads.txt");
});

export default homeRouter;
