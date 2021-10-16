import fs from 'fs'
import jwt from 'jsonwebtoken'
const JWT_OPTIONS = {
    expiresIn: '12h',
    algorithm: 'RS512',
    noTimestamp: true
  }
  const JWT_VERIFY_OPTIONS = {
    algorithms: ['RS512']
  }
export class JWTService {

    constructor(expiresIn) {
      this.JWT_OPTIONS = JWT_OPTIONS
      this.JWT_OPTIONS.expiresIn = expiresIn || JWT_OPTIONS.expiresIn
      
      this.RSA = {
        key: fs.readFileSync(`${process.cwd()}/src/keys/jwtRS256.key`, 'utf-8'),
        pub: fs.readFileSync(`${process.cwd()}/src/keys/jwtRS256.key.pub`, 'utf-8')
      }
    }
  
    async sign(data) {
      return new Promise((resolve, reject) => {
        jwt.sign(data, this.RSA.key, JWT_OPTIONS, (err, token) => {
          if (err) { reject(err) }
  
          resolve(token)
        })
      })
    }
  
    async verify(token) {
      // console.log(token)
      return new Promise((resolve, reject) => {
        jwt.verify(token, this.RSA.pub, JWT_VERIFY_OPTIONS, (err, decoded) => {
          if (err) { reject(err) }
          resolve(decoded)
        })
      })
    }
  
  }