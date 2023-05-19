import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { extname, resolve } from 'node:path'
import { createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'

const maxFileSize = 5 * 1024 * 1024

const pump = promisify(pipeline)

export async function fileUploadRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async request => {
    await request.jwtVerify()
  })

  // TODO: migrate to cloud flare r2
  app.post('/image-upload', async (request, response) => {
    const file = await request.file({
      limits: {
        fileSize: 5 * 1024 * 1024 // 5mb
      }
    })

    if (!file) {
      return response.status(400).send()
    }

    if (
      file.file.bytesRead > maxFileSize ||
      Number(request.headers['content-length']) > maxFileSize
    ) {
      return response.status(413).send({
        message: `your image is very powerful, we only support up to 5 megabytes.`
      })
    }

    const isImageRegex = /^image\/[a-z-A-Z]+$/
    const fileIsAnImage = isImageRegex.test(file.mimetype)

    if (!fileIsAnImage) {
      return response.status(415).send({
        message: `this type of file is not allowed`
      })
    }

    const fileId = randomUUID()
    const extension = extname(file.filename)

    const filename = fileId.concat(extension)

    const writeStream = createWriteStream(
      resolve(__dirname, '..', '..', '..', 'uploads/', filename)
    )

    await pump(file.file, writeStream)

    const fullUrl = request.protocol.concat('://').concat(request.hostname)
    const fileUrl = new URL(`/uploads/${filename}`, fullUrl)

    return fileUrl
  })
}
