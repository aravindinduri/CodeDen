import mongoose, { Schema ,models,model} from "mongoose";
import { IMessage } from "./Message";

export interface IConversation {
    _id?: mongoose.Types.ObjectId,
    messages?: [IMessage]
    createdAt: Date,
    updatedAt: Date,
}

const ConversationSchema = new Schema<IConversation>({
    messages: [
        {
            type : mongoose.Types.ObjectId,
            ref : "Message"
        }
    ]
},
    { timestamps: true }
)

const Conversation  = models?.Conversation || model<IConversation>("Conversation",ConversationSchema);
export default Conversation;