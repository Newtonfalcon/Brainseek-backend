import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { agent } from "./research.js"
import { connectDb } from "./libs/connectDb.js"
import authRoute from "./routes/auth.route.js"
import chatRouter from "./routes/chat.route.js"
import { authMiddleware } from "./libs/auth.middleware.js"
import messageRouter from "./routes/message.route.js"
dotenv.config()



const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: "http://172.23.123.249:3000", credentials:true}))



const port = process.env.PORT || 7116

connectDb()
app.listen(port, ()=>{
      console.log(`Server is running on port ${port}`)
})



app.use('/api/auth', authRoute)
app.use('/api/chat',authMiddleware, chatRouter)
app.use('/api/message',authMiddleware, messageRouter)

app.post('/', async (req, res)=>{


      try {

            const {prompt, thread_id} = req.body
            const data = await agent.invoke({
                   messages: [
                  {
                  role:"user",
                  content:prompt
                        }
      ]
}, {
      configurable: {thread_id:thread_id}
})



      return res.status(201).json(data.messages.at(-1)?.content || "No response from agent")
            
      } catch (error) {
            res.status(500).json({error: error.message})
            
      }
     

})

