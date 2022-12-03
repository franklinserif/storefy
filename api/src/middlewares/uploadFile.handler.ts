/**
 * module for uploads middlewares
 * @module middlewares/uploads
 */
import path from "path";
import multer from "multer";

/**
 * Setup for handler file and name the file
 */
const storage = multer.diskStorage({
  destination: function (_req, file, cb) {
    if (typeof file?.fieldname === "undefined") {
      cb(new Error("image is required"), "");
    }

    cb(null, "temp");
  },
  filename: function (req, file, cb) {
    file.originalname = `${Date.now()}-${file?.originalname}`;
    req.file = file;
    cb(null, file?.originalname);
  },
});

/**
 * setup storage and extension name, only image
 */
const upload = multer({
  storage: storage,
  fileFilter: function (_req, file, callback) {
    const ext = path.extname(file?.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
});

const uploadHandler = upload.single("image");
export default uploadHandler;
