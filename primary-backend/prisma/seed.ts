import { PrismaClient } from "@prisma/client";
const prismaCleint = new PrismaClient();

async function main() {
    await prismaCleint.availableTrigger.create({
        data: {
            id: "webhook",
            name: "Webhook",
            image: "",
        }
    })
    await prismaCleint.availableTrigger.create({
        data: {
            id: "send-sol",
            name: "Send Solana",
            image: ""
        }
    })
    await prismaCleint.availableAction.create({
        data: {
            id: "send-sol",
            name: "Send Solana",
            image: ""
        }
    })
}