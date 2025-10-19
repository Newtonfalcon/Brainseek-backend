import Chat from "../models/chats.model.js"

export const createChat = async (req, res) => {
      const {title} = req.body

      try {
     
            if(!title){
                  res.status(400).json({message:"no title provided by the llm"})
            }

            const chat = await Chat.create({
                  title,
                  userId: req.user._id
            })

            res.status(201).json(chat)
                  
      } catch (error) {
            return res.status(500).json({message: error.message})
      }
      
}