import { BaseService } from "./base.service.js";

export class ReactionsService extends BaseService {
    constructor(body, params, query) {
        super(body, params, query);
    }

    createReaction = async () => {
        const { user_id, video_id, interaction } = this.body
        const reactionForm = {
            _id: this.mongooseId,
            video_id,
            user_id,
            interaction,
            user_owner: this.mongooseId
        }
        return this.model.ReactionsModel(reactionForm).save()
    }

    findReactionAndUpdate = async () => {
        const { user_id, video_id, interaction } = this.body
        return this.model.ReactionsModel.findOneAndUpdate({user_id, video_id}, {interaction})
    }


    findReactionsByVideo = async () => {
        const { video_id} = this.params
        return this.model.ReactionsModel.find({video_id})
    }
    findReactionsByUser = async () => {
        const { video_id, user_id} = this.params
        return this.model.ReactionsModel.findOne({video_id, user_id})
    }
}