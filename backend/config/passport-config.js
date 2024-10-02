// import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import User from '../models/user.models.js';

// passport.serializeUser((user, done) => {
//     done(null, user.id); // Store user id in the session
// });

// passport.deserializeUser(async (id, done) => {
//     const user = await User.findById(id);
//     done(null, user); // Restore user object from id
// });

// console.log('Configuring Google Strategy...');
// // Configure the Google strategy for use by Passport
// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "/auth/google/callback"
// }, async (accessToken, refreshToken, profile, done) => {
//     // Check if user already exists in our db
//     const existingUser = await User.findOne({ : profile.id });
//     if (existingUser) {
//         return done(null, existingUser); // User already exists, log them in
//     }

//     // If not, create a new user
//     const newUser = await new User({
//         fullname: profile.displayName,
//         email: profile.emails[0].value,
//         image: profile._json.picture,
//         bio: "", // Default bio
//         username: "", // Default username
//         onboarded: false, // Initial onboarding status
//         hasPassword: false, // Initially set to false
//     }).save();
    
    
//     done(null, newUser);
// }));

// export default passport;
