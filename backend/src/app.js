import Api from './api/index.js'
import OS from 'os'

process.env.UV_THREADPOOL_SIZE = OS.cpus().length;

const api = new Api()
api.initializeServer()