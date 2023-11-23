import { Router } from "express";
import { ensureLoggedIn } from "connect-ensure-login";
const aboutRouter = Router();
import About from "../../models/aboutModel.js";
import Blog from "../../models/blogModel.js";
import multer, { diskStorage } from "multer";

aboutRouter.get("/hakkimda", async (req, res) => {
  try {
    const blogs = await Blog.find();
    const abouts = await About.find();
    res.render("about", { blogs: blogs, abouts: abouts });
  } catch (err) {
    res.status(500).json(err);
  }
});

aboutRouter.use("/Resmi-Degistir", ensureLoggedIn("/signin"), aboutRouter);

aboutRouter.get("/Resmi-Degistir", async (req, res) => {
  res.render("../views/blog/newAboutImage.ejs");
});

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

aboutRouter.post("/Resmi-Degistir", upload.single("aboutImage"), (req, res) => {
  res.redirect("/Resmi-Degistir");

  /* const aboutImage = "uploads/" + req.body.aboutImageData.aboutImage;
  
  

  const newImage = {
    name: "about",
    aboutTitle: "Hakkimda",
    aboutImage: aboutImage,
    aboutText: "Hallo...",
  };
  About.create(newImage)
    .then((newImage) => {
      console.log(newImage);
      res.status(201).json(newImage);
      
    })
    .catch((err) => {
      console.log("====== ERROR =====");
      console.log(err);
      res.send(err);
    }); */
});

aboutRouter.put("/Resmi-Degistir/", async (req, res) => {
  try {
    const updatedPost = await About.findOneAndUpdate(
      { name: "about" },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

aboutRouter.delete("/api/abouts/:id", async (req, res) => {
  try {
    await About.findByIdAndDelete(req.params.id);
    res.status(200).json("About has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});
aboutRouter.get("/api/abouts", async (req, res) => {
  try {
    const about = await About.find();
    res.status(200).json(about);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default aboutRouter;
