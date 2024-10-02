import express from "express";
import session from "express-session"; // Import express-session
import { configDotenv } from "dotenv";
import { connectDB } from "./config/db.js";
import ProducRoutes from "./routes/product.routes.js";
import cookieParser from "cookie-parser";
import AuthRoutes from "./routes/auth.routes.js";
import cors from "cors";
import { frontendBaseUrl } from "./config/envurl.js";

configDotenv(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;



app.use(express.json());
app.use(cors({
    origin: "https://discuss-2jf5.onrender.com",  // Replace with your frontend domain
    credentials: true,  // Allow sending cookies
}));

app.use(cookieParser());

// Define your routes
app.use("/api/products", ProducRoutes);
app.use("/auth", AuthRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});
