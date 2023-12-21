import axios, {AxiosRequestConfig} from "axios";
import {API_URL} from "../routes/Url";

export const request = async (url: string, type: string = "get", data: any = undefined) => {
    try {
        const token = localStorage.getItem("token");

        if (!token) throw new Error("No connected")

        const conf = {
            method: type || "get",
            url: `${API_URL}/${url}`,
            data,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        const result = await axios(conf)

        if (!result.data) throw new Error("Request not pass")

        return result.data
    } catch
        (e: any) {
        console.error(e.message)
    }
}

export const dowloadFile = async (url: string) => {
    try {
        const token = localStorage.getItem("token");

        if (!token) throw new Error("No connected")

        const conf: AxiosRequestConfig = {
            responseType: 'blob',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        const result = await axios.get(`${API_URL}/${url}`, conf)

        if (!result.data) throw new Error("Request not pass")

        return result.data
    } catch
        (e: any) {
        console.error(e.message)
    }
}