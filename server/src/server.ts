import 'dotenv/config'
import jwt from '@fastify/jwt'

import fastify from 'fastify'
import multipart from '@fastify/multipart'
import cors from '@fastify/cors'
import fastifyStatic from '@fastify/static'
import { memoriesRoutesV1 } from './routes/v1/memories'
import { authRoutesV1 } from './routes/v1/auth'
import { fileUploadRoutes } from './routes/v1/file-upload'
import { resolve } from 'node:path'

const app = fastify()

app.register(fastifyStatic, {
    root: resolve(__dirname, '..', 'uploads'),
    prefix: '/uploads'
})
app.register(cors, {
    origin: true
})
app.register(multipart)
app.register(jwt, {
    secret: String(process.env.JWT_SECRET)
})

app.register(fileUploadRoutes, { prefix: '/api/v1' })
app.register(memoriesRoutesV1, { prefix: '/api/v1' })
app.register(authRoutesV1, { prefix: '/api/v1' })

const PORT = process.env.PORT || 3333

app
    .listen({
        port: Number(PORT),
        host: '0.0.0.0'
    })
    .then(host => {
        console.log(`‣ 🚀 ${host.replace('[::1]', 'localhost')}`)
    })
