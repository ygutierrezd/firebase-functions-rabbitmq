import * as amqp from 'amqplib';
import RabbitConfig from './rabbit_config';

let channel: amqp.ConfirmChannel;

const PublicadorRabbit = async <T>(rabbitConfig: RabbitConfig, body: T): Promise<boolean> => {
  let openRabbit = amqp.connect(rabbitConfig.conexion)
  var resultado = openRabbit.then(async function (conexion) {
    try {
      channel = await conexion.createConfirmChannel()
      await channel.assertQueue(rabbitConfig.queue, rabbitConfig.assertQueue)
      let resultadoPersistencia = await persistirMensaje(rabbitConfig, body)
      console.log(`cierre conexión rabbit con respuesta => ${resultadoPersistencia}`);
      (await openRabbit).close();
      return resultadoPersistencia
    } catch (ex) {
      console.warn(`Error durante publicación del mensaje => ${ex}`);
      (await openRabbit).close();
      console.warn('cierre conexión rabbit por error');
      return false
    }
  }).catch(async (ex) => {
    console.log(`Error durante la conexión => ${ex}`);
    return false;
  })
  return resultado
}

const persistirMensaje = async (rabbitConfig: RabbitConfig, body: any): Promise<boolean> => {
  return new Promise((resolve) => {
    channel.sendToQueue(rabbitConfig.queue, Buffer.from(JSON.stringify(body)), { persistent: true }, (err, ok) => {
      console.log('Mensaje confirmado')
      if (err !== null) {
        console.log(`fallo la persistencia del mensaje ${err}`);
        resolve(false)
      }
      else {
        resolve(true)
      }
    });
  })
}

export default PublicadorRabbit;