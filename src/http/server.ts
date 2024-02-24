import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { createdPoll } from './routes/create-poll'
import { getPoll } from './routes/get-poll'
import { voteOnPoll } from './routes/vote-on-poll'
import fastifyWebsocket from '@fastify/websocket'
import { pollResults } from './ws/poll-results'


const app = fastify()

app.register(cookie, {
    secret: "polls-cookies-app-nlw", 
    hook: 'onRequest',
})

app.register(fastifyWebsocket)

app.register(createdPoll)
app.register(getPoll)
app.register(voteOnPoll)

app.register(pollResults)


app.listen({ port:3333 }).then(() => {
    console.log('HTTP server running!')
})

