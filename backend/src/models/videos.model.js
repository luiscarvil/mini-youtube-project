import  mongoose from "mongoose";

export const videoSchema = mongoose.Schema({
    title: {
        type: String,
        required:true,
        trim:true
    },
    description: {
        type: String,
        trim:true
    },
    video_url:{
        type:String,
        required:true,
        trim:true,
        //unique true,
    },
    user_owner: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
},{
    timestamps: true,
}
)
export const VideosModel = mongoose.model('Videos', videoSchema)
