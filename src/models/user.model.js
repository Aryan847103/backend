import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        //agar hum searching enable krenge toh index:true krenge,but ye expensive hota hain
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullName:{
        type:String,
        required:true,
        trim:true,
        index:true,
    },
    avatar:{
        // cloudinary URL
        type:String,
        required:true,
    },
    coverImage:{
        type:String,
    },
    watchHistory:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Video",
        }
    ],
    password:{
        type:String,
        required:[true,'Password is Required'],
    },
    refreshToken:{
        type:String
    }
},{
   timestamps:true 
});

// kind of plugins hain, save ki jagh aur bhi fxns hote hain
//Documentation me padh sakte hain middlwares ke
userSchema.pre("save", async function (next) {
    // yaha pe password ko string me hi pass krna hota hain
    if(!this.isModified("password")) return next();

    this.password=bcrypt.hash(this.password,10)
    next()
})

// these are custom methods which we are creating for checking weather the password is correct or not

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken=async function (){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        userName:this.userName,
        fullName:this.fullName,
    },process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    })
}

userSchema.methods.generateRefreshToken=async function (){
    return jwt.sign({
        _id:this._id,
    },process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    })
}


export const User=mongoose.model("User",userSchema);