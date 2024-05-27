import { createSlice } from "@reduxjs/toolkit";
import { getToken, setToken as _setToken, removeToken } from "@/utils/token";
import { loginAPI, userInfoAPI } from "@/apis/user";

const userStore = createSlice({
    name: 'login',
    initialState: {
        token: getToken() || '',
        userInfo: {}
    },
    reducers: {
        // 同步修改
        // token操作
        setToken(state, action) {
            state.token = action.payload
            _setToken(action.payload)
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload
        },
        clearUserInfo(state) {
            state.token = ''
            state.userInfo = {}
            removeToken()
        }
    }
})
const { setToken, clearUserInfo, setUserInfo } = userStore.actions

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

const fetchUserInfo = () => {
    return async (dispatch) => {
        const res = await userInfoAPI()
        console.log(res);
        if (res.code === 200) {
            dispatch(setUserInfo(res.data.userInfo))
        }
    }
}

const reducer = userStore.reducer
export default reducer

export { setToken, fetchLogin, clearUserInfo, fetchUserInfo }