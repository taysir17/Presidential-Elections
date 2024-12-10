const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); 
  },
  filename: (req, file, cb) => {
    const date = Date.now();
    const fileExtension = path.extname(file.originalname);
    const filename = `${date}${fileExtension}`; 
    cb(null, filename);
    req.filename = filename; 
  },
});

// Set up multer with file size limit
const upload = multer({
  storage: storage,
  limits: {
    // 100MB
    fileSize: 100 * 1024 * 1024, 
  },
});

module.exports = { upload };
