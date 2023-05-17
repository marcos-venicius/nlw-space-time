import axios from 'axios'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', async request => {
    const bodySchema = z.object({
      code: z.string({
        required_error: 'o código não existe',
        invalid_type_error: 'formato de código inválido'
      })
    })

    const { code } = bodySchema.parse(request.body)

    const accessTokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      null,
      {
        params: {
          code,
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET
        },
        headers: {
          Accept: 'application/json'
        }
      }
    )

    const { access_token } = accessTokenResponse.data

    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })

    const userSchema = z.object({
      id: z.number(),
      login: z.string(),
      name: z.string(),
      avatar_url: z.string().url()
    })

    const githubUser = userSchema.parse(userResponse.data)

    let user = await prisma.user.findUnique({
      where: {
        githubId: githubUser.id
      }
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          githubId: githubUser.id,
          avatarUrl: githubUser.avatar_url,
          login: githubUser.login,
          name: githubUser.name
        }
      })
    }

    const token = app.jwt.sign(
      {
        id: user.id,
        name: user.name,
        avatarUrl: user.avatarUrl
      },
      {
        sub: user.id,
        expiresIn: '30 days'
      }
    )

    return {
      token
    }
  })
}
