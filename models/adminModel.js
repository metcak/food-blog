import { Schema, model } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const AdminSchema = new Schema({
  username: String,
  password: String,
});

AdminSchema.plugin(passportLocalMongoose);

export default model("Admin", AdminSchema);
