import fastify from 'fastify'

const app = fastify()

const PORT = process.env.PORT || 3333

app
  .listen({
    port: Number(PORT),
  })
  .then((host) => {
    console.log(`‣ 🚀 ${host.replace('[::1]', 'localhost')}`)
  })
