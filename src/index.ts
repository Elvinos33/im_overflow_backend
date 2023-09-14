import { Elysia, t } from "elysia";
import { PrismaClient } from '@prisma/client'
import { swagger } from '@elysiajs/swagger'

const db = new PrismaClient()

const app = new Elysia()
    .use(swagger())
    .post(
        '/sign-up',
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
    .listen(8000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
