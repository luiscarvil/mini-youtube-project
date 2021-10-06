import { Router } from 'express'
import multer from 'multer'
import { VideosController } from '../controllers/videos.controller.js'

export const videosRouter = Router()
const prefix = '/videos'
const controller = new VideosController()

const multerUsg = multer()

videosRouter.post(`${prefix}/upload-video`, multer.single('file'), controller.uploadFile)
