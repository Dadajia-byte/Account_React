import { Button, DatePicker, Input, NavBar, Toast } from 'antd-mobile'
import Icon from '@/components/Icon'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '@/constants'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { addBillList } from '@/store/modules/billStore'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'

const New = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // 控制支出收入状态
    const [type, setType] = useState('pay')
    const [money, setMoney] = useState(0)
    const moneyChange = (value) => {
        setMoney(value)
    }
    // 收集账单类型
    const [useFor, setUseFor] = useState('')



    // 控制时间显示
    const [dateVisible, setDateVisible] = useState(false)
    const [date, setDate] = useState(new Date())
    const dateConfirm = (date) => {
        setDate(date)
        setDateVisible(false)
    }

    const saveBill = () => {
        // 收集表单数据
        const data = {
            type: type,
            money: type === 'pay' ? -money : +money,
            date: date,
            useFor: useFor
        }
        if (useFor === '') {
            Toast.show({
                icon: 'fail',
                content: '请选择账单类型',
                duration: 1000
            })
            return
        }
        if (money == 0) {
            Toast.show({
                icon: 'fail',
                content: '请输入金额',
                duration: 1000
            })
            return
        }

        dispatch(addBillList(data))
        // 这里应该要成功后再判断
        Toast.show({
            icon: 'success',
            content: '记账成功',
            duration: 1000
        })
    }
    return (
        <div className="keepAccounts">
            <NavBar className="nav" onBack={() => navigate(-1)}>
                记一笔
            </NavBar>

            <div className="header">
                <div className="kaType">
                    <Button
                        shape="rounded"
                        className={classNames(type === "pay" ? 'selected' : '')}
                        onClick={() => setType('pay')}
                    >
                        支出
                    </Button>
                    <Button
                        className={classNames(type === "income" ? 'selected' : '')}
                        shape="rounded"
                        onClick={() => setType('income')}
                    >
                        收入
                    </Button>
                </div>

                <div className="kaFormWrapper">
                    <div className="kaForm">
                        <div className="date" >
                            <Icon type="calendar" className="icon" />
                            <span className="text" onClick={() => setDateVisible(true)}>
                                {dayjs(date).format('YYYY-MM-DD')}
                            </span>
                            <DatePicker
                                className="kaDate"
                                title="记账日期"
                                max={new Date()}
                                visible={dateVisible}
                                onCancel={() => setDateVisible(false)}
                                onClose={() => setDateVisible(false)}
                                onConfirm={dateConfirm}
                            />
                        </div>
                        <div className="kaInput">
                            <Input
                                className="input"
                                placeholder="0.00"
                                type="number"
                                value={money}
                                onChange={moneyChange}
                            />
                            <span className="iconYuan">¥</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="kaTypeList">
                {billListData[type].map(item => {
                    return (
                        <div className="kaType" key={item.type}>
                            <div className="title">{item.name}</div>
                            <div className="list">
                                {item.list.map(item => {
                                    return (
                                        <div
                                            className={classNames(
                                                'item',
                                                useFor === item.type ? 'selected' : ''
                                            )}
                                            key={item.type}
                                            onClick={() => setUseFor(item.type)}

                                        >
                                            <div className="icon">
                                                <Icon type={item.type} />
                                            </div>
                                            <div className="text">{item.name}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="btns">
                <Button className="btn save" onClick={saveBill}>
                    记 账
                </Button>
            </div>
        </div>
    )
}

export default New