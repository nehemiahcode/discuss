import { v2 as cloudinary } from 'cloudinary';
import { configDotenv } from 'dotenv';

configDotenv();  // Load environment variables

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  // Your cloud name from Cloudinary dashboard
  api_key: process.env.CLOUDINARY_API_KEY,        // Your API key
  api_secret: process.env.CLOUDINARY_API_SECRET,  // Your API secret
});

export default cloudinary;
