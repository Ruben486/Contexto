import cloudinary from "cloudinary";

// Configuration 
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

export const uploadImage  = async filePath => {
   return await cloudinary.v2.uploader.upload(filePath,{
      folder: 'posts'
   })
}
export const removeImage = async (id) => {
  return await cloudinary.v2.uploader.destroy(id)

}
