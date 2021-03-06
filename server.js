const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const expressSession = require("express-session");
const { ensureLoggedIn } = require("connect-ensure-login");
const Admin = require("./models/adminModel");

const app = express();
const port = 5000;

// Static Files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/img", express.static(__dirname + "public/img"));
app.use("/js", express.static(__dirname + "public/js"));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Database
mongoose
  .connect("mongodb://localhost/fdmdrsnBlog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

// Templating Engine
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.urlencoded({ extended: true }));

// Passport Config
app.use(
  expressSession({
    secret: "bu bizim güvenlik cümlemizdir",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Admin.authenticate()));
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

//app.use("/admin", ensureLoggedIn("/signin"), adminRouter);

// Share current user infos withhin all routes
// app.use((req, res, next) => {
//   res.locals.currentUser = req.user;
//   next();
// });

// Routes
const homeRouter = require("./src/routes/home");
const adminRouter = require("./src/routes/admin");
const blogRouter = require("./src/routes/blog");
const categoryRouter = require("./src/routes/category");
const aboutRouter = require("./src/routes/about");
const uploadRouter = require("./src/routes/upload");

app.use("/", homeRouter);
app.use("/", adminRouter);
app.use("/", blogRouter);
app.use("/", categoryRouter);
app.use("/", aboutRouter);
app.use("/", uploadRouter);

// Listen on port 5000
app.listen(port, () => console.log(`Listening on port ${port}`));
