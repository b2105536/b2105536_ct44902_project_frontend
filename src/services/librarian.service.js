import createApiClient from "./api.service";

class LibrarianService {
    constructor(baseUrl = "/api/librarians") {
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

    async get(msnv) {
        return (await this.api.get(`/${msnv}`)).data;
    }

    async update(msnv, data) {
        return (await this.api.put(`/${msnv}`, data)).data;
    }

    async delete(msnv) {
        return (await this.api.delete(`/${msnv}`)).data;
    }
}

export default new LibrarianService();