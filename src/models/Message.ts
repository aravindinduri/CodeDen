import mongoose, { Schema, model, models } from "mongoose";
export interface IMessage {
    _id?: mongoose.Types.ObjectId,
    belongsTo: Schema.Types.ObjectId,
    role: String,
    reactComponent: String
    content: String,
    createdAt: Date,
    updatedAt: Date
};

export const MessagesSchema = new Schema<IMessage>(
    {
        belongsTo: {
            type: Schema.Types.ObjectId,
            ref: "Conversation"
        },
        role: { type: String, required: true },
        reactComponent: {
            type: String,
        },
        content: { type: String }
    },
    {
        timestamps: true
    }
);

const Message = models?.Message || model<IMessage>("Message", MessagesSchema);
export default Message;