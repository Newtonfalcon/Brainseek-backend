import { setToken } from "../libs/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const register = async(req, res)=>{
      const {name, email, password} = req.body;
      try {
            if(!name || !email || !password){
                  return res.status(400).json({error: "All fields are required"});
            }

            const existingUser = await User.findOne({email});
            if(existingUser){
                  return res.status(400).json({error: "User already exists"});
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = new User({name, email, password: hashedPassword});
            setToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({name: newUser.name, email: newUser.email, id: newUser._id});
      } catch (error) {
            res.status(500).json({error: error.message});
      }
}