import express from "express"
import cors from "cors"

import { agent } from "./research.js"

const app = express()
app.use(express.json())
app.use(cors({origin: "*"}))



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

const port = 5000

app.listen(port, ()=>{
      console.log(`Server is running on port ${port}`)
})

