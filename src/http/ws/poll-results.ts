import { FastifyInstance } from "fastify";
import { voting } from "../../utils/voting-pub-sub";
import z from "zod";

export async function pollResults(app: FastifyInstance) {
    /* app.get('/polls/:pollId/results', { websocket: true }, (connection, request) => {
        connection.socket.on('message', (message: string) => {
            connection.socket.send('you send: ' + message)
        }) */
        app.get('/polls/:pollId/results', { websocket: true }, (connection, request) => {
            // Inscrever apenas nas mensagens publicadas no canal com o Id da enquete ('pollId')
            const  getPollParams = z.object({
                pollId: z.string().uuid(),
            })
            const { pollId } = getPollParams.parse(request.params)

            voting.subscribe(pollId, (message) => {
                connection.socket.send(JSON.stringify(message))
            })
        })

} 