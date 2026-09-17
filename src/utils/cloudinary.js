/*we are following 2 steps
pehle hum local server pr file store krenge and then hum usko Cloudinary par upload krwa denge
and jaise hi file upload hogi hum usko apne server se delete kr denge*/

import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});
    

const uploadOnCloudinary=async (localFilepath)=>{
    try {
        if(!localpath) return null;
        //upload file on Cloudinary
        const response=await cloudinary.uploader.upload(localFilepath,{
            resource_type:"auto",
        })
        console.log("File is Uploaded Succesfully on Cloudinary",response.url);
        return response

    } catch (error) {
        //removing the local saved temporary files which is saved on local server due to error
        fs.unlinkSync(localFilepath);
        return null;
    }
}

export {uploadOnCloudinary};