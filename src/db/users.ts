import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    file:{
        data:Buffer,
        contentType :String
    }

})
const users = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
});
export const usersModel = mongoose.model("users",users)


export const FileModel = mongoose.model("File", fileSchema);
export default FileModel;


const UserSchema = new mongoose.Schema({
    username: {type: String ,required:true },
    email :{ type:String , required:true},
    authentication :{
        password: {type :String , required:true , select:false },
        salt :{type:String , select:false},
        sessionToken :{type: String , select:false}
    },
});



export const UserModel = mongoose.model("User" , UserSchema);

export const getUsers = ()=> UserModel.find();
export const getUserByEmail = (email:string)=>UserModel.findOne({email});
export const getUserBySessionToken = (sessionToken:string)=>UserModel.findOne({
    'authentication.sessionToken':sessionToken
});

export const getUserById = (id:string)=>UserModel.findById(id);
//the following code takes user data as an input creates user document , saves to the database , return saved user as a plain javascript object
export const createUser = (values : Record<string , any>)=> new UserModel(values).save().then((user)=>user.toObject());


export const deleteUserById = (id:string)=> UserModel.findByIdAndDelete({_id:id});
export const UpdateUserById = (id:string , values:Record<string ,any>)=> UserModel.findByIdAndUpdate(id , values)