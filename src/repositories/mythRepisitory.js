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
            },
            include: {
                likeBy: true
            }
        });
    },

    async deleteOne(mythId, userId) {
        return await prisma.myth.delete({
            where: {
                id: mythId,
                ownerId: userId
            }
        })
    },

    async updateOne(parsedData, mythId, userId) {
        return await prisma.myth.update({
            where: {
                id: mythId,
                ownerId: userId
            },
            data: {
                ...parsedData
            }
        });
    },

    async getLatest() {
        return prisma.myth.findMany({
            select: {
                id: true,
                name: true,
                origin: true,
                image: true
            },
            orderBy: {
                createdAt: "desc"
            },
            take: 3
        })
    },

    async like(mythId, userId) {
        return await prisma.myth.update({
            where: {
                id: mythId
            },
            data: {
                likeBy: {
                    connect: {
                        id: userId
                    }
                }
            }
        });
    }
}