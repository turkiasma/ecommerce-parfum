const express = require("express"); 
const userRoute = require("./Routes/userRoute"); 
const connectDb=require('./Configuration/connectDb') 
const app = express(); 
const dotenv = require("dotenv"); 
dotenv.config(); 
const port = process.env.PORT; 
connectDb(); 
app.listen(port, (error) => { 
if(error){console.log("Server Failed")} 
else { 
console.log(`server is running on port ${port}`); 
} 
}); 
app.use(express.json()) 
app.use("/api", userRoute);
