const express = require("express");
const { ensureLoggedIn } = require("connect-ensure-login");
const blogRouter = express.Router();
const Blog = require("../../models/blogModel");
const multer = require("multer");
const crypto = require("crypto");
const sharp = require('sharp');
const { uploadFile } = require('../../s3');
const { getObjectSignedUrl } = require('../../s3');
const session = require('express-session');

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex")

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

blogRouter.use("/Yeni-Blog-Ekle", ensureLoggedIn("/signin"), blogRouter);
blogRouter.use (
  session ({
      secret: "blablabla",
      resave: true,
      saveUninitialized: false,
      cookie: {}
    })
);

blogRouter.get("/Yeni-Blog-Ekle", async (req, res) => {
  res.render("../views/blog/newBlog.ejs");
});

blogRouter.post("/Yeni-Blog-Ekle", upload.single("blogImage"), async (req, res) => {
  console.log('Body: ',JSON.parse(JSON.stringify(req.body)))
  console.log('File(s): ',req.file)
  const data = JSON.parse(req.body.data);
  const blog = data.blog;
  const blogTitle = data.blogTitle;
  const blogSubtitle = data.blogSubtitle;
  const blogCategories = data.blogCategories;
  const blogTime = data.blogTime;
  const blogImageName = randomImageName();
  const buffer = await sharp(req.file.buffer).resize({height: 720, width: 1280, fit: "contain"}).toBuffer();

  await uploadFile(buffer, blogImageName, req.file.mimetype);

  const newBlog = {
    blog: blog,
    blogTitle: blogTitle,
    blogSubtitle: blogSubtitle,
    blogCategories: blogCategories,
    blogTime: blogTime,
    blogImage: blogImageName,
  };

  Blog.create(newBlog)
    .then((newBlog) => {
      console.log(newBlog);
      res.status(201).json(newBlog);
    })
    .catch((err) => {
      console.log("====== ERROR =====");
      console.log(err);
      res.send(err);
    });
});

blogRouter.post("/upload", upload.single("upload"), async (req, res) => {
  try {
    console.log('File(s): ',req.file);
    const blogImageName = randomImageName();
    const buffer = await sharp(req.file.buffer).resize({height: 225, width: 400, fit: "contain"}).toBuffer();
    
    html = "";
    html += "<script>";
    html += "var funcNum = " + req.query.CKEditorFuncNum + ";";
    html += 'var url = "https://food-blog-images.s3.eu-west-1.amazonaws.com/' + blogImageName + '";';
    html += 'var message = "Uploaded file successfully";';
    html += "";
    html +="window.parent.CKEDITOR.tools.callFunction(funcNum, url, message);";
    html += "</script>";
    res.send(html);

    await uploadFile(buffer, blogImageName, req.file.mimetype);

  } catch (err) {
    res.status(500).json(err);
  }
});

blogRouter.put("/api/blogs/:id", async (req, res) => {
  try {
    const updatedPost = await Blog.findOneAndUpdate(
      {},
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

blogRouter.delete("/api/blogs/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json("Blog has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

blogRouter.get("/api/blogs/:id", async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});
blogRouter.get("/blog/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    blog.blogImage = await getObjectSignedUrl(blog.blogImage);
    const blogs = await Blog.find();
    for (let blog of blogs) {
      blog.blogImage = await getObjectSignedUrl(blog.blogImage);
    }
    if(req.session.views) {
      req.session.views++;
      console.log(req.session.views);
      res.render(`blog/singleBlog`, { blog: blog, blogs: blogs });  
    } else {
      req.session.views = 1
      res.render(`blog/singleBlog`, { blog: blog, blogs: blogs });  
      console.log(req.session.views);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

blogRouter.get("/api/blogs", async (req, res) => {
  try {
    const post = await Blog.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = blogRouter;
