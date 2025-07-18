import axios from "axios";

const instance = axios.create({
    baseURL: 'https://portfolio-api-production-9141.up.railway.app/',

})

export default instance;