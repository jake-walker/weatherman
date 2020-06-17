import axios from 'axios';

const instance = axios.create({
    baseURL: "https://inlets.jakewalker.xyz"
})

export default {
    async getLatest() {
        return (await instance.get("/")).data;
    }
}
