import '@fastify/jwt'

declare module '@Fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: string
      name: string
      avatarUrl: string
    }
  }
}
