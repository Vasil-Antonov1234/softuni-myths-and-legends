import { prisma } from "../lib/prisma.js";

export default {
    async create(parsedData, ownerId) {
        return await prisma.myth.create({
            data: {
                ...parsedData,
                ownerId
            }
        });
    }
}