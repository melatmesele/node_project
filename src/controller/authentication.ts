import { createUser, getUserByEmail, usersModel } from '../db/users';
import express from 'express'
import jwt from 'jsonwebtoken'
import { authentication, random } from '../helper/index';
import nodemailer from "nodemailer";
export const emailSend =async (req:express.Request , res:express.Response) => {
    try {
        const { sendTo, subject, text } = req.body;
        if(!subject || !text){
            console.log("please fill the subject or text please")
        }
        if(!sendTo){
            console.log("please fill the reciever ")
        }
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "melat.mesele@aait.edu.et",
            pass: "akmnhm@123!",
          },
        });
        
        const mailOption = {
          from: "melat.mesele@aait.edu.et",
          to: `${sendTo}`,
          subject: `${subject}`,
          text: `${text}`,
          attachments: [{
            filename:"melat.txt",
            content:"your beloved mel loves youuu soooooooooo muchhhhhh"
          }]
        };

        transporter.sendMail(mailOption, function (err: any, data: any) {
          if (err) {
            console.log("Error:", err);
          } else {
            console.log("Data:", data);
          }
        });
        return res.status(200).json(mailOption)


        
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
        
    }
    
    
}
export const login = async (req: express.Request, res: express.Response) => {
    try {
        const {email , password } = req.body
        if(!email || !password){
            return res.sendStatus(400)
        }
       
        const user = await getUserByEmail(email).select('+authentication.salt + authentication.password');
        if(!user){
            return res.sendStatus(400)
        }
        const expectedHash = authentication(user.authentication.salt , password);
        if(user.authentication.password !== expectedHash){
            return res.sendStatus(403)
        }
        const salt = random();
        
        user.authentication.sessionToken = authentication(salt , user._id.toString());
        await user.save();
        
        res.cookie("melat-auth", user.authentication.sessionToken, {
          domain: "localhost",
          path: "/",
        });
        return res.status(200).json(user).end()
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
        
    }
};
export const signIn = async (req: express.Request, res: express.Response) => {
    try {
        const {email , password} = req.body;
        if(!email || !password ){
            console.log("please enter email or password")
        }
        else{
            if(email === (await usersModel.findOne({email})).email &&
               password === (await usersModel.findOne({email})).password
            ){
                // creating access token

                const accessToken = jwt.sign({
                  ehfmail: (await usersModel.findOne({ email })).email,
                  name: (await usersModel.findOne({email})).name
                }, "SECRETACCESSTOKEN" , {expiresIn :'1m'});

                // creating refresh token
                const refreshToken = jwt.sign({
                  name: (await usersModel.findOne({ email })).email

                } , "SECRETREFRESHTOKEN" , {expiresIn:'1d'});

            res.cookie("jwt", refreshToken, {
              httpOnly: true,
              sameSite: "none",
              secure: true,
              maxAge: 24 * 60 * 60 * 1000,
            });
            return res.json(accessToken)
            }
            else{
                return res.status(406).json({message:"invalid credentials"})
            }

        }

    } catch (error) {
        return res.status(400)
        
    }
};


export const register  = async(req:express.Request , res:express.Response)=>{
    try {
        const {email , password , username} = req.body

        if(!email || !password || !username){
            return res.sendStatus(400);
        }
        const existingUser = await getUserByEmail(email);
        if (existingUser){
            return res.sendStatus(400)
        }
        
        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication:{
                salt,
                password: authentication(salt,password)
            }

        });
        return res.status(200).json(user).end()
        
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
        
    }
}