
import React, { useEffect } from 'react'
import './index.scss'
import { Avatar, List, NavBar, Switch } from 'antd-mobile'
import {
    UnorderedListOutline,
    PayCircleOutline,
} from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserInfo } from '@/store/modules/user'
const Setting = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchUserInfo())
    }, [dispatch])
    const userInfo = useSelector(state => state.user.userInfo)
    function handleClick() {
        // ...
    }
    return (
        <div className='settingContainer'>
            <NavBar onBack={() => navigate(-1)}>设置</NavBar>
            <List>
                <List.Item
                    prefix={<Avatar src={userInfo.avatar || 'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'} />}
                    description={userInfo.brief}
                >
                    {userInfo.name}
                </List.Item>
            </List>

            <List mode='card' header='账单细节'>
                <List.Item prefix={<UnorderedListOutline />} onClick={() => { }}>
                    账单
                </List.Item>
                <List.Item prefix={<PayCircleOutline />} onClick={() => { }}>
                    收支分析
                </List.Item>
            </List>
            <List mode='card' header='我的信息'>
                <List.Item clickable>
                    个人信息
                </List.Item>
                <List.Item extra='未设置' clickable>
                    设置手机号
                </List.Item>
                <List.Item extra='未关联' clickable>
                    关联账号
                </List.Item>

            </List>
            <List mode='card' header='其他'>
                <List.Item extra={<Switch defaultChecked />}>日间模式</List.Item>
                <List.Item extra='未开启' clickable>
                    大字号模式
                </List.Item>
                <List.Item onClick={handleClick}>帮助中心</List.Item>
                <List.Item>
                    退出登录
                </List.Item>
            </List>
        </div>

    )
}

export default Setting