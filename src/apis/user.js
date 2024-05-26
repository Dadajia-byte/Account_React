import { request } from "@/utils";

export function registerAPI(formData) {
    return request({
        url: "/user/register",
        method: "POST",
        data: formData
    })
}

export function loginAPI(formData) {
    return request({
        url: "/user/login",
        method: "POST",
        data: formData
    })
}


