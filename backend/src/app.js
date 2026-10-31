import express from "express";

const app = express(); // create an express app
 
app.use(express.json()); // parse json request body

import userRoutes from "./routes/user.route.js"; // import user routes
import postRoutes from "./routes/post.route.js"; // import post routes

app.use("/api/users", userRoutes); 
app.use("/api/posts", postRoutes); 

// http://localhost:4000/api/users/register
export default app;