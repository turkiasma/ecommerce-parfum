const express = require("express"); 
const userRoute = express.Router(); 
const { 
getUsers, 
postUser, 
putUser, 
deleteUser, 
getOneUser, 
} = require("../Controllers/userController"); 
 
userRoute.get("/users", getUsers); 
userRoute.get("/users/:id", getOneUser); 
userRoute.post("/users", postUser); 
userRoute.put("/users/:id", putUser); 
userRoute.delete("/users/:id", deleteUser); 
 
module.exports = userRoute;