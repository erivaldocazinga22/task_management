const multer  = require("multer");
const path  = require("path");

const upload = multer({ storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "./public/uploads/users");
    },
    filename: function (req, file, callback) {
      const extension = path.extname(file.originalname);
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      callback(null, `task_management-${uniqueSuffix}${extension}`);
    }
  }),
  fileFilter: function (req, file, callback) {
      if (!file.originalname.match(/\.(jpg|jpeg|png|svg|webp)$/)) {
          return callback(new Error('Only image files are allowed!'), false)
      }
      callback(null, true)
  }
})

module.exports = upload;