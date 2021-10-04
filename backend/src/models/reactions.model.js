import mongoose from "mongoose";

const reactionSchema = mongoose.Schema({
    interaction: {
        type:Boolean,
        required: true,
        trim:true
    },
    video_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Videos'
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
})
reactionSchema.index({video_id:1, user_id:1}, {unique:true})
export const Reactions = mongoose.model('Reactions', reactionSchema)