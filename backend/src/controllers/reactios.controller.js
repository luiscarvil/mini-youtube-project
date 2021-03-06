import { BaseController } from "./base.controller.js";

export class ReactionsController extends BaseController{
    constructor() {
        super();
    }
    createReaction = async ( req, res, next) => {
        const body = req.body
        const user = req.user.user_session
        try{
           
            const reactionService = new this.services.ReactionsService(body)
            const existReaction = await reactionService.findReactionAndUpdate(user)
            if (!existReaction){
            await reactionService.createReaction(user)
            }
            res.send({ message: `se ha agregado la valoración: ${body.interaction}`, error: null })
        }catch(err){
            console.log(err)
            next(err)
        }
    }
    reactionsByVideo = async (req, res, next) => {
        const params = req.params
        let totalReactions = 0
        try{
            const reactionService = new this.services.ReactionsService(null, params)
            const reactions = await reactionService.findReactionsByVideo()
            reactions.map(value => {
                totalReactions += value.interaction 
            })
            totalReactions = Math.round(totalReactions/reactions.length)
            res.send({reactions, total: totalReactions?totalReactions:0})
        }catch(err){
            console.log(err)
            next(err)
        }
    }
    reactionsByUser = async (req, res, next) => {
        const params = req.params
        try{
            const reactionService = new this.services.ReactionsService(null, params)
            const reactions = await reactionService.findReactionsByUser()
            res.send(reactions)
        }catch(err){
            console.log(err)
            next(err)
        }
    }
}