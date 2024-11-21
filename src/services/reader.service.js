import createApiClient from "./api.service";

class ReaderService {
    constructor(baseUrl = "/api/readers") {
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

    async get(madocgia) {
        return (await this.api.get(`/${madocgia}`)).data;
    }

    async update(madocgia, data) {
        return (await this.api.put(`/${madocgia}`, data)).data;
    }

    async delete(madocgia) {
        return (await this.api.delete(`/${madocgia}`)).data;
    }
}

export default new ReaderService();