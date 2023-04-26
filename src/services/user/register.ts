import axios from "axios"

const auth = axios.create({
    baseURL:"./api/auth"
});