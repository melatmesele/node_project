import express from 'express'
import { emailSend, login  ,register } from '../controller/authentication'
export default (router: express.Router)=>{
    router.post('/auth/register', register) // register function  is handling this request
    router.post('/auth/login' , login )
    router.post('/sendEmail' ,emailSend )
}