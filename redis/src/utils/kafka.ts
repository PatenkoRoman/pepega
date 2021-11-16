import { Consumer, Kafka, Producer } from 'kafkajs';

export const kafka = new Kafka({
  clientId: 'user',
  brokers: ['kafka:29092'],
});

let producer: Producer;
let consumer: Consumer;
export const getProducer = async () => {
  if (!producer) {
    producer = await kafka.producer();
    await producer.connect();
  }
  return producer;
};

export const getConsumer = async () => {
  if (!consumer) {
    consumer = kafka.consumer({ groupId: 'balance-changed' });
    await consumer.connect();
    await consumer.subscribe({ topic: 'balance-changed', fromBeginning: true });
  }
  return consumer;
};
