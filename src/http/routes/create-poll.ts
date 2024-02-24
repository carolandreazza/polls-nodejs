import { FastifyInstance } from "fastify"
import z from "zod"
import { prisma } from "../../lib/prisma"

export async function createdPoll(app: FastifyInstance) {
    app.post('/polls', async (request, reply) => {
        const  createdPollBody = z.object({
            title: z.string(),
            options: z.array(z.string()),
        })

        const { title, options } = createdPollBody.parse(request.body)

        const poll = await prisma.poll.create({
            data: {
                title,
                options: {
                    createMany: {
                        data: options.map(option => {
                            return { title: option }
                        }),

                    }
                }
            }
        })

        
        return reply.status(201).send({ pollId: poll.id})
    })
}

