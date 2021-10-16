import  mongoose from "mongoose";

const videoSchema = mongoose.Schema({
    title: {
        type: String,
        required:true,
        trim:true
    },
    description: {
        type: String,
        required:true,
        trim:true
    },
    thumbnail:{
        type:String,
        required:true,
        trim:true,
        default: 'https://developers.google.com/web/updates/images/generic/play-outline.png?hl=es'
    },
    video_key:{
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
