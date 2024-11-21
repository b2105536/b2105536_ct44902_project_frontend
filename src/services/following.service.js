import createApiClient from "./api.service";

class FollowingService {
    constructor(baseUrl = "/api/flg_records") {
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

    async get(identifier) {
        return (await this.api.get(`/${identifier}`)).data;
    }

    async update(identifier, data) {
        return (await this.api.put(`/${identifier}`, data)).data;
    }

    async delete(identifier) {
        return (await this.api.delete(`/${identifier}`)).data;
    }
}

export default new FollowingService();