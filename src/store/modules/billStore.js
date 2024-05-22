// 账单列表相关store
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const billStore = createSlice({
    name: 'bill',
    initialState: {
        billList: []
    },
    reducers: {
        // 同步修改
        setBillList(state, action) {
            state.billList = action.payload
        },
        addBill(state, action) {
            state.billList.push(action.payload)
        }
    }
})

const { setBillList, addBill } = billStore.actions
const { reducer } = billStore
export default reducer

// 异步操作
const getBillList = () => {
    return async (dispatch) => {
        const res = await axios.get('http://localhost:8888/ka')
        dispatch(setBillList(res.data))
    }
}
const addBillList = (data) => {
    return async (dispatch) => {
        const res = await axios.post('http://localhost:8888/ka', data)
        dispatch(addBill(res.data))
    }
}

export { getBillList, addBillList }
