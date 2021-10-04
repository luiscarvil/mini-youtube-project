import http from 'http'
import express from 'express'
import  mongooseConection from '../db/mongoose.js'
import {config} from '../utils/index.js'

export default class Api {
    constructor(){
        this.app = express()
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
    }

    initializeServer() {
        const server = http.createServer(this.app)

        server.listen(parseInt(config.port), ()=>{
        const{ port, address } = server.address()
            console.log(`Start on --> ${address}:${port} `)
        })
        return server
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
