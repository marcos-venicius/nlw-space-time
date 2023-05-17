import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'

const app = fastify()

app.register(cors, {
  origin: true
})

app.register(memoriesRoutes)
app.register(authRoutes)

const PORT = process.env.PORT || 3333

app
  .listen({
    port: Number(PORT)
  })
  .then(host => {
    console.log(`‣ 🚀 ${host.replace('[::1]', 'localhost')}`)
  })
