import { signJwt, verifyJwt } from "../utils/jwt.utils"
import { getUser } from "../db/index"
import { Request, Response } from "express"
import users from "router/users"
import jwt from "jsonwebtoken"
import { getUserByEmail } from "../db/users"
// login handler
export function createSessionHandler(req:Request , res:Response){
    const { email } = req.body
    const user = getUser(email);
    if(!user ){
        return res.send(401).send("invalid email or password")
    }


    // create access token
const accessToken = jwt.sign({email:user.email} , "1h")

res.cookie("accessToken", accessToken ,{
    maxAge:300000,
    httpOnly:true
})
return res.send(verifyJwt(accessToken).payload)
    // set access token in cookie
    // send user back

// get session handler
// logout handler
}