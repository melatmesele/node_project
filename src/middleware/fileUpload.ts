import multer from "multer";
import { Request } from "express";
const Storage = multer.diskStorage({
//   destination: (req: Request, file: Express.Multer.File, cb: Function) => {
//     cb(null, "uploads/");
//   },
// the above code can be writen as 
  destination: "fileUpload",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
export const upload = multer({ storage: Storage }).single("here");
// import multer, { FileFilterCallback } from "multer";
// import { Request } from "express";

// const storage = multer.diskStorage({
//   destination: (req: Request, file: Express.Multer.File, cb: Function) => {
//     cb(null, "uploads/");
//   },
//   filename: (req: Request, file: Express.Multer.File, cb: Function) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix);
//   },
// });

// const fileFilter = (
//   req: Request,
//   file: Express.Multer.File,
//   cb: FileFilterCallback
// ) => {
//   if (file.mimetype.startsWith("image/")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only image files are allowed"));
//   }
// };

// const upload = multer({ storage, fileFilter });

// export default upload;
