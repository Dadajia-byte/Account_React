import { Button, Form, Input, NavBar } from 'antd-mobile'
import { useState } from 'react'
import './index.scss'
import github from './imgs/github-logo.png'
import wx from './imgs/wx.png'
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const navigate = useNavigate()
    const [visible, setVisible] = useState(false)

    const login = () => {
        navigate('/')
    }
    return (
        <div className='login'>
            {/* 顶部导航区 */}
            <NavBar backArrow={false}>
                账号登录
            </NavBar>
            {/* 表单区 */}
            <Form layout='horizontal'>
                <Form.Item label='账号'>
                    <Input placeholder='请输入账号'></Input>
                </Form.Item>
                <Form.Item label='密码' >
                    <div className='pwd'>
                        <Input placeholder='请输入密码' type={visible ? 'text' : 'password'} />
                        <div className='eye'>
                            {!visible ? (
                                <EyeInvisibleOutline onClick={() => setVisible(true)} />
                            ) : (
                                <EyeOutline onClick={() => setVisible(false)} />
                            )}
                        </div>
                    </div>
                </Form.Item>
            </Form>
            {/* 登录按钮 */}
            <Button block color='primary' className='summitButton' size='large' onClick={() => login()}>登录</Button>
            {/* 底部其他登录方式 */}
            <footer className='footer'>
                <span className='other'>其他登录方式</span>
                <div className='login-type'>
                    <img src={github} alt='github图标'></img>
                    <img src={wx} alt='微信图标'></img>
                </div>
            </footer>
        </div>
    )
}

export default Login