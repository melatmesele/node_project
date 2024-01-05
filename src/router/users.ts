import { isAuthenticated, isOwner } from "../middleware/index";
import { deleteUser, getAllUser,updateUser } from "../controller/users";

// import { validateFile } from "../middleware/middleware";
import { createSessionHandler } from "../controller/sessionHandler";
import { uploadd } from "../controller/users";
import {upload} from "../middleware/fileUpload";

import express from "express";
import multer from "multer";
import { qrcode } from "../controller/qrcode";
import {
  sendEmailWithOTP,
  verifyOtp,getAllotp,
} from "../controller/otpGeneration";

// const upload = multer({ dest: "uploads/" });
export default (router: express.Router)=>{
    router.get("/user", isAuthenticated, getAllUser),
    router.delete("/user/:id", isAuthenticated,isOwner, deleteUser);
    router.patch('/user/:id' , updateUser)
    // router.post("/upload", upload.single("file"), validateFile, uploadFile);
    router.post("/upload", upload , uploadd);
    router.post("/api/session" , createSessionHandler)
    router.post("/qrCode", qrcode);
    router.post("/otp", sendEmailWithOTP);
    router.get("/otpuser", getAllotp);
    router.post("/verifyOtp", verifyOtp);
    

   
  
}