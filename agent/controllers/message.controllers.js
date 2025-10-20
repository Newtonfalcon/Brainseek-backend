import Chat from "../models/chats.model.js";
import Message from "../models/messages.model.js";

export const postMessage = async (req, res) => {
      const {role, content, thread_id} = req.body;
      const chatId = req.params.id

      try {
            
            if(!role || !content, !chatId){
                  return res.status(400).json({message: "Role and content are required"});
            }

            let message = await new Message({
                 
                  role,
                  content,
                  thread_id,
                  chatId
            })
            
            await message.save();

           
            return res.status(201).json(message);

      } catch (error) {
            return res.status(500).json({message: error.message});
      }


}

export const getMessage = async (req, res) => {
      const messageId = req.params.id
      try {
            if (!messageId) {
                  return res.status(400).json({message: "no message-Id "})
            }


            const message = await Message.find({chatId:messageId})
            if (!message) {
                  return res.status(400).json({message: "no message found"})
            }

            return res.status(200).json(message)



      } catch (error) {
            return res.status(500).json({message: error.message})
      }
}


export const updateMessage = async (req, res) => {
      const {role, content} = req.body;
      const chatId = req.params.id


      try {
            
            if(!role || !content, !chatId){
                  return res.status(400).json({message: "empty data fields"});
            }

            let message =await Message.findOneAndUpdate(
                   {chatId},{
                 
                  role,
                  content,
                 
                 
            })
            
       

           
            return res.status(201).json(message);

      } catch (error) {
            return res.status(500).json({message: error.message});
      }



      

}