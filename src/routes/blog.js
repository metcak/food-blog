const express = require("express");
const { ensureLoggedIn } = require("connect-ensure-login");
const blogRouter = express.Router();
const Blog = require("../../models/blogModel");
var multer = require("multer");

blogRouter.use("/Yeni-Blog-Ekle", ensureLoggedIn("/signin"), blogRouter);

blogRouter.get("/Yeni-Blog-Ekle", async (req, res) => {
  res.render("../views/blog/newBlog.ejs");
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// blogRouter.get("ckfinder/ckfinder.html", async (req, res) => {
//   res.render("ckfinder/ckfinder.html");
// });
// blogRouter.post(
//   "ckfinder/core/connector.php?command=QuickUpload&type=Files",
//   upload.single("upload"),
//   async (req, res) => {
//     res.render(
//       "ckfinder/core/vendor/connector.php?command=QuickUpload&type=Files"
//     );
//   }
// );

blogRouter.post("/Yeni-Blog-Ekle", upload.single("blogImage"), (req, res) => {
  const blog = req.body.data.blog;
  const blogTitle = req.body.data.blogTitle;
  const blogSubtitle = req.body.data.blogSubtitle;
  const blogCategories = req.body.data.blogCategories;
  const blogTime = req.body.data.blogTime;
  const blogImage = "uploads/" + req.body.data.blogImage;

  const newBlog = {
    blog: blog,
    blogTitle: blogTitle,
    blogSubtitle: blogSubtitle,
    blogCategories: blogCategories,
    blogTime: blogTime,
    blogImage: blogImage,
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
    const blogs = await Blog.find();
    res.render(`blog/singleBlog`, { blog: blog, blogs: blogs });
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
