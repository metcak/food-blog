import { Router } from "express";
import passport from 'passport';
const adminRouter = Router();
import { ensureLoggedIn } from "connect-ensure-login";
import Admin from "../../models/adminModel.js";

let adminActions = [
  {
    actionId: 1,
    actionName: "addNewBlog",
    displayName: "Yeni Blog ekle",
  } /* ,
  {
    actionId: 2,
    actionName: "changeAboutImage",
    displayName: "Hakkimdaki resmi degistir",
  },
  {
    actionId: 3,
    actionName: "changeAboutText",
    displayName: "Hakkimdaki yaziyi degistir",
  },
  {
    actionId: 4,
    actionName: "changeLogo",
    displayName: "Logo degistir",
  }, */,
];
adminRouter.use("/admin", ensureLoggedIn("/signin"), adminRouter);

adminRouter.get("/admin", async (req, res) => {
  res.render("admin/admin", { adminActions: adminActions });
});

adminRouter.get("/signin", async (req, res) => {
  res.render("admin/signin");
});

adminRouter.post(
  "/signin",
  passport.authenticate("local", { failureRedirect: "/signin" }),
  function (req, res) {
    res.redirect("/admin");
  }
);

adminRouter.get("/signup", async (req, res) => {
  res.render("admin/signup");
});
adminRouter.post("/signup", async (req, res) => {
  let newAdmin = new Admin({ username: req.body.username });

  Admin.register(newAdmin, req.body.password, (err, admin) => {
    if (err) {
      res.redirect("/signup");
      console.log("error");
    }
    passport.authenticate("local")(req, res, () => {
      res.redirect("/");
    });
  });
});
adminRouter.get("/logout", (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

export default adminRouter;
