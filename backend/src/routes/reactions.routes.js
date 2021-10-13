import { Router } from 'express'
import { ReactionsController } from '../controllers/index.js'
import { validRequest } from '../middleware/index.js'
import {createReactionValidator, findReactionsValidator} from '../validators/index.js'

export const reactionRouter = Router()

const prefix = '/reactions'
const controller = new ReactionsController()

reactionRouter.post(`${prefix}/create-update`,  createReactionValidator, validRequest, controller.createReaction)

reactionRouter.get(`${prefix}/find-reactions/:video_id`,findReactionsValidator, validRequest, controller.reactionsByVideo)

reactionRouter.get(`${prefix}/user-reactions/:video_id/:user_id`,findReactionsValidator, validRequest, controller.reactionsByUser)