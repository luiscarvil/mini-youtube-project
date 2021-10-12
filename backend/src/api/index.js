import http from 'http'
import express from 'express'
import  mongooseConection from '../db/mongoose.js'
import {config} from '../utils/index.js'
import * as routes from '../routes/index.js'
import helmet from 'helmet'
import { CustomError } from '../errors/custom.error.js'

export default class Api {
    constructor(){
        this.app = express()

        this.initializeMiddlewares()
        this.initializeRoutes()
    }
    initializeRoutes(){
        this.app.get('/mini-youtube', async(req, res)=>{
            res.status(200).json({
                title: 'API mini youtube',
                version: '1.0.0',
                path: '/mini-youtube'
            })
        })
        this.mountRoutes()
        this.app.use(this.errorHandler)
    }
    mountRoutes() {
        // versioned routes
        const {routesV1} = routes
        for (const route in routesV1) {
          //console.log(`Router ${route} mounted `)
          this.app.use('/mini-youtube', routesV1[route])
        }
    
        this.#mountDefaultRoute()
    
      }
      jsonErrorHandler = async (err, req, res, next) => {
        res.status(500).send({ error: err });
      }
      createMorganTokens(){
        morgan.token('body', function (req, res) {
            return JSON.stringify(req.body)
          })
      }
      initializeMiddlewares(){
          //this.createMorganTokens()
          this.app.use(express.json())
          this.app.use(express.urlencoded({
              extended:true
          }))
          // Helmet secure  Express apps by setting various HTTP headers
          this.app.use(helmet())
      }
    initializeServer() {
        const server = http.createServer(this.app)

        server.listen(parseInt(config.port), ()=>{
        const{ port, address } = server.address()
            console.log(`Start on --> ${address}:${port} `)
        })
        return server
    }
    #mountDefaultRoute = () => {
        this.app.all('*', (req, res) => {
          const message = `${req.method} to ${req.get('host')}${req.originalUrl} not found`
          res.status(404).send({message})
        })
      }


      errorHandler(err, req, res, next) {
        // atrapar el id de la request
      if (!err){
          next()
      }
      if (err instanceof CustomError) {
            console.log('CustomError :', err)
            return res.status(err.code).send({ ...err.serialize(), requestId: req?.requestId })
          }
      
          //res.status(500).send({message: 'To Do error handler...'})
      
          console.log('Error without handle =>', err)
      
          return res.status(500).send({
            err: err.message,
            message: 'Error inesperado.',
            data: null,
            requestId: req?.requestId
          })
      
  }
      
/* 
    setEnvironment = () =>{
        switch (process.env.ENVIRONMENT){
            case ('production'):
                process.env.DOMAIN = process.env.PROD_APP_DOMAIN
                console.log(`domain :: ${process.env.APP_DOMAIN}`)
                break;
            default:
                throw new Error('process.env.ENVIRONMENT not found')


        } */
        
}
