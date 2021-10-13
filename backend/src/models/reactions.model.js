import mongoose from "mongoose";

const reactionSchema = mongoose.Schema({
    interaction: {
        type:Number,
        required: true,
        trim:true,
        enum: {
            values: [1, 2, 3, 4, 5],
            message: '{VALUE} is not supported'
          }
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
export const ReactionsModel = mongoose.model('Reactions', reactionSchema)