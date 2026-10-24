import { asyncHandler } from "../utils/asyncHandler.js";
import { apiErrors } from "../utils/apiErrors.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {

    //get user details
    //detail validation
    //check if already exist:username,email
    //check for images,check for avatar
    //upload them in cloudinary
    //create user Object(mongo takes obj) -create entry in DB
    //remove password and refresh token field from response
    //check for user creation 
    //return response

    //form or json
    const {fullName,email,username,password}=req.body
    console.log("email:",email);


    if (
        !fullName?.trim() ||
        !email?.trim() ||
        !username?.trim() ||
        !password?.trim()
        ) {
            throw new apiErrors(400, "All fields are required");
        }

    const existedUser = User.findOne({
        $or: [{ username }, { email }]
        });

    if (existedUser) {
        throw new apiErrors(409, "User with email or username already exists");
    }
    //req.files is provided by multer not express

    const avatarLocalPath=req.files?.avatar[0]?.path;
    const coverImageLocalPath=req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new apiErrors(400,"Avatar file is required");
    }

    const avatar=await uploadOnCloudinary(avatarLocalPath);
    const coverImage=await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new apiErrors(400,"Avatar file is required"); 
    }

    const user=await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })

    const createdUser=User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new apiErrors(500,"Something went wrong while registering user");
    }

    //hum bina Apiresponse ko use kiye bhi created user ko bhej sakte the
    //just code acha lage isiliye Apiresponse use hua hai
    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered Succesfully")
    )
});

export {registerUser};