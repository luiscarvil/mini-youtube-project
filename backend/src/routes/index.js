import { videosRouter } from "./videos.routes.js";
import { authRouter} from "./auth.routes.js"
import { reactionRouter} from './reactions.routes.js'

export const routesV1 = {
    videosRouter,
    authRouter,
    reactionRouter
}