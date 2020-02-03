const multer = require('multer');
const limits = {
  fileSize: 1024*1024*10
}
const mimeTypes = [
  'application/vnd.ms-excel',
  'application/msexcel',
  'application/x-msexcel',
  'application/x-ms-excel',
  'application/x-excel',
  'application/x-dos_ms_excel',
  'application/xls',
  'application/x-xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
];

const filterMimeType = (req, file, cb) => {
  if(!mimeTypes.includes(file.mimetype)) {
    cb(new Error("Invalid file format!"));
  } else {
    cb(null, true);
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + ".xlsx")
  }
})

const upload = multer({
  storage,
  fileFilter: filterMimeType,
  limits: limits
}).single('excelFile');

module.exports = upload;