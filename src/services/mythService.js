import mythRepisitory from "../repositories/mythRepisitory.js"

export default {
    async create(parsedData, ownerId) {
        return await mythRepisitory.create(parsedData, ownerId);
    },

    async getAll() {
        return await mythRepisitory.getAll();
    },

    async getById(mythId) {
        return await mythRepisitory.getById(mythId);
    },

    async deleteOne(mythId, userId) {
        return await mythRepisitory.deleteOne(mythId, userId);
    },

    async updateOne(parsedData, mythId, userId) {
        return await mythRepisitory.updateOne(parsedData, mythId, userId);
    },

    async getLatest() {
        return await mythRepisitory.getLatest();
    },

    async like(mythId, userId) {
        return mythRepisitory.like(mythId, userId);
    },

    async report() {
        return await mythRepisitory.report();
    }
}