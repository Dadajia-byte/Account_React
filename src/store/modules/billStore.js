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
        }
    }
})

const { setBillList } = billStore.actions
const { reducer } = billStore
export default reducer

// 异步操作
const getBillList = () => {
    return async (dispatch) => {
        const res = await axios.get('http://localhost:8888/ka')
        dispatch(setBillList(res.data))
    }
}

export { getBillList }
