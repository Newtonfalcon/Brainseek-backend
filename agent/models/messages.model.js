import mongoose from "mongoose";
import {Schema, model} from "mongoose";

const messageSchema = new Schema({
      chatId:{
            type:mongoose.Types.ObjectId,
            ref:"Chat",
          
      },
      role:{
            enum:["user","assistant","system"],
            type:String,
            required:true,
      },
      content:{
            type:String,
            required:true,
      },
      thread_id:{
            type:String
      }
}, {timestamps:true})

const Message = model("Message", messageSchema);

export default Message;