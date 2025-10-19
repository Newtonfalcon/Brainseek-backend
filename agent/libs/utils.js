import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();


export function setToken(userid, res) {
      const token = jwt.sign({id:userid}, process.env.SESSION_SECRET, {expiresIn: '7d'})

      res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"? true : false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })

      
}