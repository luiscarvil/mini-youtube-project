import { JWTService, SessionService } from '../services/index.js'
import { AuthError } from '../errors/auth.error.js'
import moment from 'moment'


class JWTMiddleware {

  async verify(req, res, next) {

    const token = req.headers.authorization //  req.get('Authorization')
    if (!token) {

      return next(new AuthError())
    }

   
    try {
      const service = new JWTService()
      const sessionService = new SessionService()
      const session = {
        ...(await service.verify(token))
      }
     // console.log("here the req", session)
     const dateNow = moment()
     console.log(session)
      const sessionExist = await sessionService.get(session.session)
      console.log("dads",sessionExist)
      if (!sessionExist){
          next(new AuthError())
      }
      const sessionDate = moment(sessionExist.expiration)
      if (sessionDate < dateNow){
          await sessionService.delete(sessionExist._id)
          next(new AuthError())
        }
        req.user = sessionExist
        console.log("here",req.user)
       // console.log("here", sessionDate, dateNow, sessionId)
      next()
      
    } catch (e) {
      console.log(e)

      next(new AuthError())

    }
  }
}

export const authMiddleware = new JWTMiddleware()