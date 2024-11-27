const User = require("../models/User"); 
const getUsers = async (request, response) => { 
try {  
const users = await User.find(); 
if (users && users.length > 0) { 
response.status(200).json({ users: users }); 
} else { 
response.status(404).json({ msg: "No users found" }); 
} 
} catch (error) { 
console.error(error); 
response.status(500).json({ msg: "Error on getting users" }); 
} 
}; 
const getOneUser = async (req, res) => { 
    const id = req.params.id; 
    try { 
    const foundUser = await User.findById(id); 
    if (foundUser) { 
    res.status(200).json({ user: foundUser }); 
    } else { 
    res.status(404).json({ msg: "No user found with the given ID" }); 
    } 
    } catch (error) { 
    res.status(500).json({ msg: "Error on retrieving the user" }); 
    } 
    }; 
    const postUser = async (request, response) => { 
    const user = request.body; 
    try { 
    const foundUser = await User.findOne({ email: user.email }); 
    if (foundUser) { 
    response.status(400).json({ msg: "user already exist" }); 
    } else { 
    const newUser = new User(user) 
    console.log(newUser) 
    await newUser.save(); 
    response.status(200).json({ user: newUser, msg: " user successfully added" 
    }); 
    }} 
    catch (error) { 
    console.error(error); 
    response.status(500).json({ msg: "error on adding user" }); 
    } 
    }; 
    const putUser = async (req, res) => { 
        const id=req.params.id; 
        const user=req.body 
        console.log(user) 
        try { 
        await User.findByIdAndUpdate(id,user) 
        res.status(200).json({ msg: "update success" }); 
        } catch (error) { 
        res.status(500).json({ msg: "error on updating user" }); 
        } 
        }; 
        const deleteUser = async (req, res) => { 
        const id = req.params.id; 
        try { 
        await User.findByIdAndDelete(id) 
        res.status(200).json({ msg: "delete done" }); 
        } catch (error) { 
        res.status(500).json({ msg: "error on deleting user" }); 
        } 
        }; 
        module.exports = { getUsers, postUser, putUser, deleteUser, getOneUser };    