import { PrismaClient } from "@prisma/client";
import { JsonObject } from "@prisma/client/runtime/library";
import {Kafka} from "kafkajs";
const TOPIC_NAME = "zap-events";

const prismaClient = new PrismaClient()


const kafka = new Kafka({
    clientId: "outbox-processor",
    brokers: ['localhost:9092'],
})

 async function main() {
    const consumer = kafka.consumer({
        groupId: "main-worker"
    });
    await consumer.connect();

    const producer =  kafka.producer();
    await producer.connect();

     await consumer.subscribe({ topic: TOPIC_NAME , fromBeginning: true });
     await consumer.run({
        eachMessage: async ({topic, partition, message}) => {
             console.log({
                partition,
                offset: message.offset,
                  value: message.value?.toString()
             });  
             if(!message.value?.toString()) {
               return;
             }

              const parsedValue = JSON.parse(message.value?.toString());
              const zapRunId =  parsedValue.zapRunId;
              const stage = parsedValue.stage;

              const zapRunDetails = await prismaClient.zapRun.findFirst({
               where: {
                  id: zapRunId,
               },
                include: {
                  zap: {
                     include: {
                        actions: {
                           include:{
                              type: true
                           }
                        }
                     }
                  }
                }
              });

               const currentAction = zapRunDetails?.zap.actions.find(x => x.sortringOrder === stage);
             
               if(!currentAction) {
                  console.log("Current action not founded");
                  return;
               }
               console.log(currentAction);
                if(currentAction?.type.id === "email") {
                  console.log("Sending out email");
                  const body = (currentAction.metadata as JsonObject)?.body;
                  const to =  (currentAction.metadata as JsonObject)?.email;

                  const zapRunMetadata = zapRunDetails?.metadata;
                  
                }
                if(currentAction?.type.id === "send-sol") {
                  console.log("Sending out solana");
                  
                }

               await new Promise(r => setTimeout(r,500));
               const zapId = message.value?.toString()   
               const lastState = (zapRunDetails?.zap.actions?.length || 1) -1;
               if(lastState !== stage) {
                  await producer.send({
                     topic: TOPIC_NAME,
                     messages: [{
                        value: JSON.stringify({
                           stage:stage + 1,
                           zapRunId
                        })
                     }]
                  })
               }
               console.log("Prosseong done");
                

               await consumer.commitOffsets([{
                topic: TOPIC_NAME,
                partition: partition,
                offset: (parseInt(message.offset) + 1).toString()
             }])
        },

     })
 }
 main();