import amqplib from "amqplib";

let channel: amqplib.Channel;

const connectRabbitMQ = async () => {
  try {
    const connection = await amqplib.connect({
      protocol: "amqp",
      hostname: process.env.RABBITMQ_HOST!,
      port: parseInt(process.env.RABBITMQ_PORT!),
      username: process.env.RABBITMQ_USER!,
      password: process.env.RABBITMQ_PASSWORD!,
    });
    channel = await connection.createChannel();
    console.log("✅RabbitMQ connected successfully");
  } catch (error) {
    console.error("❌Error connecting to RabbitMQ:", error);
    throw error;
  }
};

export default connectRabbitMQ;
