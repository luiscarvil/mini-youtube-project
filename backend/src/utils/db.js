import mongoose from 'mongoose'
import { UsersModel, VideosModel, ReactionsModel } from '../models/index.js'
import jwt from 'jsonwebtoken'


// examples test databasea
const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: "Luis carvajal ",
    email:'luiscarvajal0015@gmail.com',
    password: "helloworld",
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]

}
const videosOne = {
    _id: new mongoose.Types.ObjectId(),
    title: "funny video  ",
    description: "test video",
    video_url: "https://mini-youtube-videos.s3.amazonaws.com/241410827_1201302453701846_7459286196516264355_n.mp4",
    user_owner: userOneId
}

const reactionsOne = {
    _id: new mongoose.Types.ObjectId(),
    interaction: true,
    video_id: videosOne._id,
    user_id: userOne._id
}
export const setUpDatabase = async () =>{
    await UsersModel.deleteMany(),
    await VideosModel.deleteMany(),
    await ReactionsModel.deleteMany(),
    await new UsersModel(userOne).save()
    await new VideosModel(videosOne).save()
    await new ReactionsModel(reactionsOne).save()
    return "done"
}

//console.log(await setUpDatabase())