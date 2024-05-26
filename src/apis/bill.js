import { request } from "@/utils";

export function getBillListAPI() {
    return request({
        url: "/bill/getList",
        method: "GET"
    })
}

export function addBillListAPI(data) {
    return request({
        url: `/bill/addList`,
        method: "POST",
        data
    })
}