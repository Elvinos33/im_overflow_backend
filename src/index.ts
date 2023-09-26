import { Elysia, t } from "elysia";
import { PrismaClient } from '@prisma/client'
import { swagger } from '@elysiajs/swagger'
import {cors} from '@elysiajs/cors'

const db = new PrismaClient()

const app = new Elysia()
    .use(cors())
    .use(swagger())
    .post(
        '/signUp',
        async ({ body }) => db.user.create({
            data: body
        }),
        {
            body: t.Object({
                username: t.String(),
                password: t.String({
                    minLength: 8
                })
            })
        }
    )
    .post(
        '/createPost',
        async ({ body }) => db.post.create({
            data: body
        }),
        {
            body: t.Object({
                title: t.String(),
                content: t.String(),
                tags: t.Array(
                    t.String()
                )
            })
        }
    )
    .post(
        '/createTag',
        async ({ body }) => db.tag.create({
            data: body
        }),
        {
            body: t.Object({
                title: t.String(),
            })
        }
    )

    .get(
        '/getPosts',
        async () => db.post.findMany()
    )
    .get(
        '/getTags',
        async () => db.tag.findMany()
    )
    .listen(8000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type  App = typeof app
