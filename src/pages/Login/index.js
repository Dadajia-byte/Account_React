import { Button, Form, Input, NavBar, Toast } from 'antd-mobile'
import { useState } from 'react'
import './index.scss'
import github from './imgs/github-logo.png'
import wx from './imgs/wx.png'
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom'
import { fetchLogin, fetchRegister } from '@/store/modules/user'
import { useDispatch } from 'react-redux'
import { registerAPI } from '@/apis/user'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)
    const [registerForm] = Form.useForm()
    const [loginForm] = Form.useForm()
    const [authMode, setAuthMode] = useState(false) // false代表登录，true代表注册
    const login = async () => {
        const res = await dispatch(fetchLogin({
            account: loginForm.getFieldValue('loginAccount'),
            password: loginForm.getFieldValue('loginPassword')
        }))
        console.log(res);

        if (res.code === 200) {
            navigate('/')
            Toast.show({
                icon: 'success',
                content: res.msg,
                duration: 1000
            })
        } else if (res.code === 400) {
            Toast.show({
                icon: 'fail',
                content: res.msg,
                duration: 1000
            })
        } else {
            Toast.show({
                icon: 'fail',
                content: '未知错误，请稍后重试',
                duration: 1000
            })
        }
    }

    /* 校验 */
    const usernameValidator = (_, value) => {
        if (!value) {
            return Promise.reject(new Error('请输入账号'));
        }
        const lengthValid = value.length >= 6 && value.length <= 10;
        const patternValid = /^[A-Za-z0-9]+$/.test(value);
        if (!lengthValid) {
            return Promise.reject(new Error('账号长度必须为6到10位'));
        } else if (!patternValid) {
            return Promise.reject(new Error('账号只能包含数字或字母'));
        }
        return Promise.resolve();

    };

    const passwordValidator = (_, value) => {
        if (!value) {
            return Promise.reject(new Error('请输入密码'));
        }
        const lengthValid = value.length > 7 && value.length < 15;
        const patternValid = /^(?=.*[A-Za-z])(?=.*\d)|(?=.*[A-Za-z])(?=.*[!@#$%^&*])|(?=.*\d)(?=.*[!@#$%^&*])/.test(value);
        if (!lengthValid) {
            return Promise.reject(new Error('密码长度必须为8到14位'));
        } else if (!patternValid) {
            return Promise.reject(new Error('密码必须包含字母、数字或特殊符号其中两种'));
        }
        return Promise.resolve();
    };

    // 确认密码校验规则
    const confirmPasswordValidator = ({ getFieldValue }) => ({
        validator(_, value) {
            if (!value) {
                return Promise.reject('请再次输入密码');
            }
            if (value !== getFieldValue('registerPwd')) {
                return Promise.reject('两次输入的密码不一致');
            }
            return Promise.resolve();
        }
    });


    const register = async () => {
        try {
            const res = await registerAPI({
                account: registerForm.getFieldValue('registerAccount'),
                password: registerForm.getFieldValue('registerPwd')
            });
            if (res.code === 400) {
                Toast.show({
                    icon: 'fail',
                    content: res.msg,
                    duration: 1000
                });
                registerForm.resetFields()
            } else if (res.code === 200) {
                Toast.show({
                    icon: 'success',
                    content: res.msg,
                    duration: 1000
                });
                changeAuth();
            } else {
                Toast.show({
                    icon: 'fail',
                    content: '未知错误，请稍后重试',
                    duration: 1000
                });
            }
        } catch (error) {
            console.error('注册过程中出现错误', error);
            Toast.show({
                icon: 'fail',
                content: '系统错误，请稍后重试',
                duration: 1000
            });
        }

    }

    // 清空表单数据和数据
    const changeAuth = () => {
        registerForm.resetFields()
        loginForm.resetFields()
        setAuthMode(!authMode)
    }

    return (
        <>
            <div className='register' style={{ display: authMode ? 'block' : 'none' }}>
                {/* 顶部导航区 */}
                <NavBar backArrow={false} className='navbar'>
                    账号注册
                </NavBar>
                {/* 表单区 */}
                <Form layout='horizontal' form={registerForm}>
                    <Form.Item label='账号' name='registerAccount' rules={[{ validator: usernameValidator }]}>
                        <Input placeholder='请输入账号'></Input>
                    </Form.Item>
                    <Form.Item label='密码' name='registerPwd' rules={[{ validator: passwordValidator }]}>
                        <div className='pwd'>
                            <Input placeholder='请输入密码' validateTrigger="onChange" type={visible ? 'text' : 'password'} />
                        </div>
                    </Form.Item>
                    <Form.Item label='确认密码' name='registerCheckPwd' dependencies={['registerPwd']} rules={[confirmPasswordValidator]}>
                        <div className='pwd'>
                            <Input placeholder='请再次输入密码' type={visible ? 'text' : 'password'} />
                        </div>
                    </Form.Item>
                </Form>
                {/* 切换登录 */}
                <div className='authMode' onClick={() => changeAuth()}>
                    <span className='changeMode'>登录</span>已有账号，前去
                </div>
                {/* 注册按钮 */}
                <Button block color='primary' className='summitButton' size='large' onClick={register}>注册</Button>
            </div>
            <div className='login' style={authMode ? { display: 'none' } : { display: 'block' }}>
                {/* 顶部导航区 */}
                <NavBar backArrow={false} className='navbar'>
                    账号登录
                </NavBar>
                {/* 表单区 */}
                <Form layout='horizontal' form={loginForm}>
                    <Form.Item label='账号' name='loginAccount'>
                        <Input placeholder='请输入账号'></Input>
                    </Form.Item>
                    <Form.Item label='密码' name='loginPassword'>
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
                {/* 切换注册 */}
                <div className='authMode' onClick={() => changeAuth()}>
                    <span className='changeMode'>注册</span>没有账号，先去
                </div>
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
        </>
    )

}

export default Login