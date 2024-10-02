import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        default: "", // Default to an empty string for users who sign up via Google
    },
    bio: {
        type: String,
        default: "", // Default bio
    },
    image: {
        type: String,
        default: "", // Default image
    },
    username: {
        type: String,
        default: "", // Default username
    },
    onboarded: {
        type: Boolean,
        default: false, // Track whether the user has completed onboarding
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

const User = mongoose.model('User', userSchema);

export default User;
