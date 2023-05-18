import 'dotenv/config'
import jwt from '@fastify/jwt'

import fastify from 'fastify'
import cors from '@fastify/cors'
import { memoriesRoutesV1 } from './routes/v1/memories'
import { authRoutesV1 } from './routes/v1/auth'

const app = fastify()

app.register(cors, {
  origin: true
})
app.register(jwt, {
  secret: String(process.env.JWT_SECRET)
})

app.register(memoriesRoutesV1, { prefix: '/api/v1' })
app.register(authRoutesV1, { prefix: '/api/v1' })

const PORT = process.env.PORT || 3333

app
  .listen({
    port: Number(PORT)
  })
  .then(host => {
    console.log(`‣ 🚀 ${host.replace('[::1]', 'localhost')}`)
  })
