import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
  moduleName: { type: String, required: true },
  domainName: { type: String, required: true },
  basePath: { type: String, required: true },
  path: { type: String, required: true },
  filename: { type: String, required: true },
});

const ImageModal = mongoose.model("Images", imageSchema);
export { ImageModal as Images };
