import type { Kafka, Consumer } from "kafkajs";

export const createConsumer = (kafka: Kafka, groupId: string) => {
  const consumer: Consumer = kafka.consumer({ groupId });

  const connect = async () => {
    await consumer.connect();
  };

  const subscribe = async (
    topics: {
      topicName: string;
      topicHandler: (message: any) => void;
    }[]
  ) => {
    await consumer.subscribe({
      topics: topics.map((topic) => topic.topicName),
      fromBeginning: true,
    });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const topicConfig = topics.find((t) => t.topicName === topic);
          if (topicConfig) {
            const value = message.value?.toString();

            if (value) {
              await topicConfig.topicHandler(JSON.parse(value));
            }
          }
        } catch (error) {
          console.log("Error processing message", error);
        }
      },
    });
  };

  const disconnect = async () => {
    await consumer.disconnect();
  };

  return { connect, subscribe, disconnect };
};
