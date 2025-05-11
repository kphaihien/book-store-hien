const multer=require("multer")
const path = require("path")
const fs = require("fs");
const removeVietnamese = require("../middlewares/removeVietnamese");


const uploadDir = "public/";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/'); // Thư mục lưu ảnh
    },
    filename: (req, file, cb) => {
        // const book=req.body.book_name
        // .toLowerCase()
        // .replace(/[^a-z0-9]+/g, '-') // Chuyển thành slug
        // .replace(/(^-|-$)/g, '');
        const book_name=removeVietnamese(req.body.book_name)
        const uniqueSuffix=Date.now()
        cb(null, `${ book_name}-${ uniqueSuffix }-${path.extname(file.originalname) }`); // Tên file: timestamp + đuôi file
    },
});

const uploadImage = multer({
    storage,
    fileFilter: (req, file, cb) => {
        // Chỉ cho phép các định dạng ảnh
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb('Lỗi: chỉ được lưu ảnh');
        }
    },
});

module.exports={uploadImage} 