import FileModel from "../db/users";
// import express from "express";
import multer from "multer";

// const Storage = multer.diskStorage({
//   destination:"uploads",
//   filename:(req, file,cb)=>{
//     cb(null, file.originalname)
//   }
// })

// export const upload = multer({
//   storage: Storage,
// }).single("testImage");
export const uploadd = async (req: express.Request,res: express.Response) => {
  try {
    
    const newer = new FileModel({
      name:req.body.name,
      image:{
        data:req.file.filename, 
        contentType:'image/jpeg'
      }
    });
    await newer.save().then(()=>res.send('success'))
    
  } catch (error) {
    console.log(error)
    
  }
}

import { UserModel, deleteUserById, getUserById, getUsers } from "../db/users";
import express from "express";

export const getAllUser = async (req: express.Request,res: express.Response) => {
  try {
    const users = await getUsers();
    if (!users) {
      return res.sendStatus(400);
    }
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteUser = async(req: express.Request , res: express.Response)=>{
    try {
        const { id } = req.params;

        const deletedUser = await deleteUserById(id);
        return res.status(200).json(deletedUser);

    } catch (error) {
        console.log(error)
        return res.sendStatus(400)

    }

}

export const updateUser = async(req: express.Request , res: express.Response)=>{
    try {
        const {id} = req.params;
        const { email , password , username} = req.body ;

        const user = await getUserById(id)
        // another option for the above code
        // const user = await UserModel.findById(req.params.id)
        user.email = email,
        user.authentication.password = password

        user.username = username,

        await user.save()
        return res.status(200).json(user).end()

    } catch (error) {
         console.log(error);
         return res.sendStatus(400);

    }
}
