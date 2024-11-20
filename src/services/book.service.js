import createApiClient from "./api.service";

class BookService {
    constructor(baseUrl = "/api/books") {
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

    async get(masach) {
        return (await this.api.get(`/${masach}`)).data;
    }

    async update(masach, data) {
        return (await this.api.put(`/${masach}`, data)).data;
    }

    async delete(masach) {
        return (await this.api.delete(`/${masach}`)).data;
    }
}

export default new BookService();