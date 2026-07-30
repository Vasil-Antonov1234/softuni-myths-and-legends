import { prisma } from "../lib/prisma.js";

export default {
    async create(parsedData, ownerId) {
        return await prisma.myth.create({
            data: {
                ...parsedData,
                ownerId
            }
        });
    },

    async getAll() {
        return await prisma.myth.findMany({
            select: {
                image: true,
                name: true,
                origin: true,
                role: true,
                id: true
            }
        })
    },

    async getById(mythId) {
        return await prisma.myth.findUnique({
            where: {
                id: mythId
            }
        });
    }
}