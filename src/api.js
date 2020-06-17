import axios from 'axios';

const instance = axios.create({
    baseURL: "https://inlets.jakewalker.xyzd"
})

export default {
    async getLatest() {
        return (await instance.get("/")).data;
    }
}
