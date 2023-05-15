import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

const app = fastify()
const prisma = new PrismaClient()

const PORT = process.env.PORT || 3333

app.get('/users', async () => {
  const users = await prisma.user.findMany()

  return users
})

app
  .listen({
    port: Number(PORT),
  })
  .then((host) => {
    console.log(`‣ 🚀 ${host.replace('[::1]', 'localhost')}`)
  })
