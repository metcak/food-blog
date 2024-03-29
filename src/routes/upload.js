import { Router } from "express";
const uploadRouter = Router();
import multipart from "connect-multiparty";
const multipartMiddleware = multipart();
import { readFile, writeFile } from "fs";

uploadRouter.post("/uploads", multipartMiddleware, function (req, res) {
  readFile(req.files.upload.path, function (err, data) {
    var newPath =
      "/Users/burcukepsutlu/Projects/food-blog/uploads/" + req.files.upload.name;
    writeFile(newPath, data, function (err) {
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
          .json(
            "Uploaded"
          );
      }
    });
  });
});
export default uploadRouter;
