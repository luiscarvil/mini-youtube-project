import { Router } from 'express'
import multer from 'multer'
import { VideosController } from '../controllers/videos.controller.js'
import { validRequest, authMiddleware } from '../middleware/index.js'

import { /* videoIdValidator, */ filterValidator, createVideoValidator } from '../validators/index.js'

export const videosRouter = Router()
const prefix = '/videos'
const controller = new VideosController()

const multerUsg = multer()
// TODO validar formatos de video permitidos con multer

videosRouter.post(`${prefix}/upload-video`,authMiddleware.verify, multerUsg.single('file'), createVideoValidator, validRequest,controller.uploadFile)
/* 
videosRouter.get(`${prefix}/searchById/:_id`, videoIdValidator, validRequest,  controller.streamVideo) */

/* videosRouter.get(`${prefix}/searchAll`, controller.searchAll)
 */

// TODO agregar paginador para este endpoint
videosRouter.get(`${prefix}/searchByWord/:filter`, authMiddleware.verify, filterValidator, validRequest, controller.searchByWords)

videosRouter.put(`${prefix}/update-thumbnails`, multerUsg.single('file'), controller.uploadVideoThumbnails)