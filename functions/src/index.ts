import * as functions from 'firebase-functions';
import PublicadorRabbit from './utilidades/utilidad_rabbit';
import RabbitConfig from './utilidades/rabbit_config';


interface IDatos {
    id: number
    name: string
}

const rabbitConfig: RabbitConfig = {
    conexion: 'amqp://guest:guest@localhost',
    queue: 'QueuePrueba',
    assertQueue: {
        durable: true,
        arguments: { 'x-queue-type': 'classic' }
    }
}
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest(async ({ body }, resp) => {
    let data: IDatos = body.data
    console.log(data)
    let respuesta = await PublicadorRabbit<IDatos>(rabbitConfig, data)
    functions.logger.info("Hello logs!", { structuredData: true });
    resp.send(respuesta)
});
