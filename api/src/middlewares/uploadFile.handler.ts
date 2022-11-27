/**
 * module for uploads middlewares
 * @module middlewares/uploads
 */

import multer from "multer";

/**
 * Setup for handler file and name the file
 */
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "temp");
  },
  filename: function (req, file, cb) {
    file.originalname = `${Date.now()}-${file.originalname}`;
    req.file = file;
    cb(null, file?.originalname);
  },
});

const upload = multer({ storage: storage });
const uploadHandler = upload.single("image");
export default uploadHandler;
