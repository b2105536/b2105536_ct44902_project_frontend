import createApiClient from "./api.service";

class PublisherService {
    constructor(baseUrl = "/api/publishers") {
        this.api = createApiClient(baseUrl);
    }

    async getAll() {
        return (await this.api.get("/")).data;
    }

    async create(data) {
        return (await this.api.post("/", data)).data;
    }

    async deleteAll() {
        return (await this.api.delete("/")).data;
    }

    async get(manxb) {
        return (await this.api.get(`/${manxb}`)).data;
    }

    async update(manxb, data) {
        return (await this.api.put(`/${manxb}`, data)).data;
    }

    async delete(manxb) {
        return (await this.api.delete(`/${manxb}`)).data;
    }
}

export default new PublisherService();