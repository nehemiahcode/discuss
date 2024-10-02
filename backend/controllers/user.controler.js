import cloudinary from "../bucket/cloudinaryConfig.js";
import { frontendBaseUrl } from "../config/envurl.js";
import { createSecretToken } from "../createToken.js";
import User from "../models/user.models.js";
import bcrypt from "bcrypt";
const storage = multer.memoryStorage();
const upload = multer({ storage });
import multer from "multer";

export const signUpUser = async (req, res) => {
  const { email, fullname, password } = req.body;

  try {
    // Check for required fields
    if (!fullname || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }

    // Check if user already exists
    const isUserAvailable = await User.findOne({ email });
    if (isUserAvailable) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists!" });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
      email,
      fullname,
      password: hashPassword,
      bio: "",
      image: "",
      username: "",
      onboarded: false,
      isAdmin: false,
    });

    return res.status(201).json({
      message: "User signed up successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.error(error.message); // Use console.error for logging errors
    return res.status(500).json({
      success: false,
      message: "Failed to create user",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Create token with full user details
    const token = createSecretToken({
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      isAdmin: user.isAdmin,
    });

    // Set cookie (if needed) and return token in the response
    res.cookie("token", token, { httpOnly: true }); // You can keep this if you are using cookies
    return res.status(200).json({
      message: "Logged in successfully!",
      user: { id: user._id, fullname: user.fullname, email: user.email, isAdmin: user.isAdmin },
      token, // Return token in response for API calls
    });
  } catch (error) {
    return res.status(500).json({ message: "Error logging in.", error: error.message });
  }
};

// export const googleCallBackRoute = (req, res) => {
//   // On successful login, generate JWT and store it in cookies
//   const token = createSecretToken(req.user._id); // Fixed `red.user` to `req.user`
//   res.cookie("token", token, { httpOnly: true });

//   res.redirect(`${frontendBaseUrl}/${req.user._id}`); // Redirect to frontend after successful login
// };

export const logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Logout failed" });
    }
    res.clearCookie("token"); // Clear the JWT cookie
    res.status(200).json({ success: true, message: "Logged out successfully" });
    res.redirect(`${frontendBaseUrl}}`);
  });
};


export const updateUser = async (req, res) => {
  // Check if the user is authenticated
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  // Use multer to handle the image upload
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "File upload error" });
    }

    // Extract the fields from the request body
    const { username, bio, onboarded } = req.body;

    // Prepare the update data object
    const updateData = {};
    if (username) updateData.username = username;
    if (bio) updateData.bio = bio;
    if(onboarded) updateData.onboarded = true;
    try {
      // If there's an image file, upload it to Cloudinary
      if (req.file) {
        const cloudinaryResult = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream({ folder: "users" }, (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              reject(new Error("Failed to upload image to Cloudinary"));
            } else {
              resolve(result);
            }
          });

          // Use the buffer to upload to Cloudinary
          stream.end(req.file.buffer); // Use the buffer instead of the file path
        });

        // Add the image URL to the update data
        updateData.image = cloudinaryResult.secure_url;
      }

      // Find the user by ID and update their profile
      const updatedUser = await User.findByIdAndUpdate(req.params.userId, updateData, {
        new: true, // Return the updated user document
      });

      // If the user is not found, return a 404 error
      if (!updatedUser) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      // Respond with the updated user data
      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      console.log("Error while updating user profile:", error.message);
      return res.status(500).json({
        success: false,
        message: "Failed to update profile",
        error: error.message,
      });
    }
  });
};



export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (user) {
      return res.status(200).json({
        success: true,
        message: "User fetched successfully",
        user, // Send the user data
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get user",
      error: error.message, // Include the error message for debugging
    });
  }
};

export const getAllUsers = async (req, res) => {
  const { users } = req.body;
  try {
    const allUsers = await User.find(users);
    if (allUsers) {
      res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        users: allUsers,
      });
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Failed to fetch all users",
      error: error.message,
    });
  }
};

// export const deleteUsers = async (req, res) => {
//   const {isAdmin,} = req.body
//   if(!req.user.isAdmin)
//     try {

//     } catch (error) {

//     }
// }
