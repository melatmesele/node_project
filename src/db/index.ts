import mongoose from "mongoose";

const users = [{
    email: "melatmmmm@gmail.com",
    password :"password123456",
    name :"melat mesele"

}];

export const sessions: Record<
string , {sessionId:string ,email:string , valid:boolean }
> = {};

// get session
export function getSession (sessionId:string){
    const session = sessions[sessionId];
    return session && session.valid ? session : null
}
// invalidate session

export function invalidateSession (sessionId:string){
    const session = sessions[sessionId];
    if(session){
        session.valid = false
    }
    return session

}

export function createSession(email:string , name:string ){
    const sessionId = String(Object.keys(sessions).length + 1)
    const session = {sessionId , email , valid:true, name};
    sessions[sessionId] = session
    return session

}

export  function getUser(email:string){
    return users.find((user)=>user.email === email)
}

// database for qrcode
const qrdata = new mongoose.Schema({
    name:{type:String},
    age :{type:String},
    department :{type:String}
})

export const qrmodel = mongoose.model("qrcode" , qrdata)

            //database for  otp
const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: "1m" }, // Set expiration time to 5 minutes
});
export const otpModel = mongoose.model("otp" , otpSchema)