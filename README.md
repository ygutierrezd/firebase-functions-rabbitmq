# firebase-functions-rabbitmq
Api mediante firebase functions para la persistencia y confirmación de mensajes en RabbitMQ

# Instalación de paquetes npm
1. cd functions
2. npm install

# RabbitMQ
<strong> Opción 1 </strong> <br>
Instalación del servidor de RabbitMQ local y habilitar el cliente web.
<br>
<strong> Opción 2 - Docker </strong> <br>
docker run -d --name admin-rabbit -p 15672:15672 -p 5672:5672 rabbitmq:3-management

# Ejecución

firebase serve





