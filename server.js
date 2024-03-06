import express, { json, urlencoded } from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import expressSession from "express-session";
import { ensureLoggedIn } from "connect-ensure-login";
import Admin from "./models/adminModel.js";
import { config } from "dotenv";
import compression from "compression";
import { connectDatabase } from "./db.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config();

const app = express();
const port = process.env.port || 5001;

// Compress all HTTP responses
app.use(compression());

//  Static Files
app.use(express.static("public"));
app.use("/css", express.static(path.join(__dirname, "public/css")));
app.use("/img", express.static(path.join(__dirname, "public/img")));
app.use("/js", express.static(path.join(__dirname, "public/js")));
app.use("/ckfinder", express.static(path.join(__dirname, "public/ckfinder")));
app.use("/uploads", express.static("uploads"));

// Database
connectDatabase()
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

// mongoose
//   .connect(`${mongoUri}`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true
//   })
//   .then((x) => {
//     console.log(
//       `Connected to Mongo! Database name: "${x.connections[0].name}"`
//     );
//   })
//   .catch((err) => {
//     console.error("Error connecting to mongo", err);
//   });

// Templating Engine
app.set("view engine", "ejs");
app.set("views", "./src/views");

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
import homeRouter from "./src/routes/home.js";
import adminRouter from "./src/routes/admin.js";
import blogRouter from "./src/routes/blog.js";
import categoryRouter from "./src/routes/category.js";
import aboutRouter from "./src/routes/about.js";
import uploadRouter from "./src/routes/upload.js";

app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/", homeRouter);
app.use("/", adminRouter);
app.use("/", blogRouter);
app.use("/", categoryRouter);
app.use("/", aboutRouter);
app.use("/", uploadRouter);

// Listen on port 5001
app.listen(port, () => console.log(`Listening on port ${port}`));
