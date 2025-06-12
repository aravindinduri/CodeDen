import mongoose, { Schema, model, models } from "mongoose";


export interface IMessage {
    _id ? : mongoose.Types.ObjectId,
    content : String,
    createdAt : Date,
    updatedAt : Date
};

export const MessagesSchema = new Schema<IMessage>(
    {
        content : {type : String}
    },
    {
        timestamps : true
    }
);

const Message = models?.Message || model<IMessage>("Message",MessagesSchema);
export default Message;