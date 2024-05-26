import { createSlice } from "@reduxjs/toolkit";
import { getToken, setToken as _setToken, removeToken } from "@/utils/token";
import { loginAPI } from "@/apis/user";

const userStore = createSlice({
    name: 'login',
    initialState: {
        token: getToken() || '',
        userId: '',
    },
    reducers: {
        // 同步修改
        // token操作
        setToken(state, action) {
            state.token = action.payload
            _setToken(action.payload)
        },
        clearUserInfo(state) {
            state.token = ''
            removeToken()
        }
    }
})
const { setToken, clearUserInfo } = userStore.actions

// 异步操作
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        const res = await loginAPI(loginForm)
        if (res.code === 200) {
            dispatch(setToken(res.token))
        }
        return res
    }
}


const reducer = userStore.reducer
export default reducer

export { setToken, fetchLogin, clearUserInfo }