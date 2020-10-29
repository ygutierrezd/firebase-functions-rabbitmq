import { Options } from "amqplib";

export default interface RabbitConfig {
    conexion: string
    assertQueue?: Options.AssertQueue
    queue: string
}