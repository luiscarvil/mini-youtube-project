import { Router } from 'express'
import multer from 'multer'
import { VideosController } from '../controllers/videos.controller.js'
import { validRequest } from '../middleware/index.js'

import { videoIdValidator, filterValidator } from '../validators/index.js'

export const videosRouter = Router()
const prefix = '/videos'
const controller = new VideosController()

const multerUsg = multer()
// TODO validar formatos de video permitidos con multer
videosRouter.post(`${prefix}/upload-video`, multerUsg.single('file'), controller.uploadFile)

videosRouter.get(`${prefix}/searchById/:_id`, videoIdValidator, validRequest,  controller.streamVideo)

videosRouter.get(`${prefix}/searchAll`, controller.searchAll)

videosRouter.get(`${prefix}/searchByWord/:filter`,filterValidator, validRequest, controller.searchByWords)

videosRouter.put(`${prefix}/update-thumbnails`, multerUsg.single('file'), controller.uploadVideoThumbnails)