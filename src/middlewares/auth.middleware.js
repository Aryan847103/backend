// its just verify the user 

import { ApiError } from "../utils/apiErrors.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT= asyncHandler (async(req,res,next) =>{
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");
    if(!token){
      throw new ApiError(401,"Unauthorized request")
    }
  
    const decodedtToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
  
    const user = await User.findById(decodedtToken?._id).select("-password -refreshToken");
  
    if(!user){
      throw new ApiError(401,"Invalid Access Token")
    }
  
    req.user=user;
    next();
  } catch (error) {
        throw new ApiError(401,error?.message || "Invalid Access Token")
  }
})