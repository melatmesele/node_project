// import { Request, Response, NextFunction } from "express";

// export function validateFile(req: Request, res: Response, next: NextFunction) {
//   try {
//     const file = req.file;
//     if (!file) {
//       res.status(400).json({ error: "No file uploaded" });
//       return;
//     }

//     // Perform additional validation or processing on the file here
//     // For example, you can check the file size, type, or perform virus scanning

//     // If the file is valid, you can attach additional information to the request object
//     req.fileInfo = {
//       filename: file.filename,
//       originalname: file.originalname,
//       mimetype: file.mimetype,
//       size: file.size,
//     };

//     next();
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
