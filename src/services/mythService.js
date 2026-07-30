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
    }
}