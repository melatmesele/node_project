// // first we should have to install  a package called two-step-auth

import express from "express"
// import otpGenerator from "otp-generator"
// import nodemailer from "nodemailer"

// export const otp = async(req: express.Request , res:express.Response)=>{
//     try {
//         const { email } = req.body
//         // const otp = otpGenerator()
//         const otp: string = otpGenerator.generate(6, {
//           digits: true,
//         //   alphabets: false,
//         //   upperCase: false,
//         //   specialChars: false,
//         });

//         const sendEmail = nodemailer.createTransport({
//             service:"gmail",
//             auth:{
//                 user:"melat.mesele@aait.edu.et",
//                 pass:"akmnhm@123!"
//             }
//         })
//         const mailOption={
//             from:"melat.mesele@aait.edu.et",
//             to: email,
//             text:`your Otp is ${otp}`

//         }
//         sendEmail.sendMail(mailOption, function (err: any, data: any) {
//           if (err) {
//             console.log("Error:", err);
//           } else {
//             console.log("Data:", data);
//           }
//         });
//         return res.status(200).json(mailOption);


        
//     } catch (error) {
//         console.log(error)
//     }
// }
import speakeasy from "speakeasy";
import nodemailer from "nodemailer";
import { otpModel } from "../db/index";

  
  const secret = speakeasy.generateSecret({ length: 20 }); // Generate a secret key
  //totp is time based one time password
  const otp = speakeasy.totp({
    secret: secret.base32,
    encoding: "base32",
    digits: 6,
    step: 60,
  });

  


// async function sendEmailWithOTP(email: string, otp: string): Promise<void> {
export const sendEmailWithOTP = async(req: express.Request , res:express.Response)=>{
    const {email} = req.body
    
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
        user:"melat.mesele@aait.edu.et",
        pass:"akmnhm@123!"
        },
    });

  const mailOptions = {
    from: "melat.mesele@aait.edu.et",
    to: email,
    subject: "OTP Verification",
    text: `Your OTP for email verification is: ${otp} please use this code to kiss your lover`,
  };

  await transporter.sendMail(mailOptions);
  new otpModel({otp , email}).save().then((user)=>user.toObject());
//   console.log(ottp)

 
  return res.status(200).json(mailOptions);

//   console.log("OTP sent to email:", email);
}
export const getAllotp = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await otpModel.find();
    if (!users) {
      return res.sendStatus(400);
    }
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const verifyOtp = async(req: express.Request , res:express.Response)=>{
    try {
        const {email , otp} = req.body;
        // if (!email) return res.status(400).json({ message: "your otp is expired" });
        if(!await((otpModel.findOne({ email })))) return res.status(400).json({ message: "your otp is expired" });
        // const a =  (await otpModel.findOne({ email })).otp
        // console.log(a)
        if(otp !== (await (otpModel.findOne({ email }))).otp) return res.status(400).json({message:"your otp is not correct"})
        if(otp == (await (otpModel.findOne({ email }))).otp) return res.status(200).json({ message: "your otp is correct" });
        
    } catch (error) {
        console.log(error)
    }
}