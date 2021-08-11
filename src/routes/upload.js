const express = require("express");
const uploadRouter = express.Router();
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();
const fs = require("fs");

uploadRouter.post("/uploads", multipartMiddleware, function (req, res) {
  fs.readFile(req.files.upload.path, function (err, data) {
    var newPath =
      "/Users/mcakmak/BlogProjects/Food_Blog/uploads/" + req.files.upload.name;
    fs.writeFile(newPath, data, function (err) {
      if (err) console.log({ err: err });
      else {
        /* html = "";
        html += "<script type='text/javascript'>";
        html += "    var funcNum = " + req.query.CKEditorFuncNum + ";";
        html += '    var url     = "/uploads/' + req.files.upload.name + '";';
        html += '    var message = "Uploaded file successfully";';
        html += "";
        html +=
          "    window.parent.CKEDITOR.tools.callFunction(funcNum, url, message);";
        html += "</script>";

        res.send(html); */
        console.log(req.files.upload.originalFilename);
        let fileName = req.files.upload.name;
        let url = "/uploads/" + fileName;
        let msg = "Upload successfully";
        let funcNum = req.query.CKEditorFuncNum;
        console.log({ url, msg, funcNum });
        res
          .status(201)
          .send(
            "<script>window.parent.CKEDITOR.tools.callFunction('" +
              funcNum +
              "','" +
              url +
              "','" +
              msg +
              "');</script>"
          );
      }
    });
  });
});
module.exports = uploadRouter;
