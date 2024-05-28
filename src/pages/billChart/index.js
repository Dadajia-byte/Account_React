import React, { useEffect, useMemo } from 'react';
import Chart from "@/components/Chart";
import { processData } from "@/utils/index";
import { useSelector } from 'react-redux';
import { getBillList } from '@/store/modules/billStore';
import { useDispatch } from 'react-redux';
import { NavBar } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
const Test = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getBillList())
    }, [dispatch])
    const data = useSelector(state => state.bill.billList);
    // 无条件使用 useMemo。在 useMemo 内部处理空数据的情况或通过额外的变量处理。
    const { dailyData, monthlyData, incomeByCategory, expenseByCategory } = useMemo(() => {
        if (!data || !data.length) {
            // 返回一些默认的空结构或按适当的方式处理
            return { dailyData: {}, monthlyData: {}, incomeByCategory: {}, expenseByCategory: {} };
        }
        return processData(data);
    }, [data]);

    if (!data.length) {
        return <div>Loading...</div>;
    }


    const generateOptions = (categories, incomeData, expenseData, balanceData, type) => ({
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ["收入", "支出", "结余"]
        },
        xAxis: {
            type: 'category',
            data: categories
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '收入',
                type: type,
                data: incomeData
            },
            {
                name: '支出',
                type: type,
                data: expenseData
            },
            {
                name: '结余',
                type: type,
                data: balanceData
            }
        ]
    });

    const dailyCategories = Object.keys(dailyData);
    const dailyIncome = dailyCategories.map(date => dailyData[date].income);
    const dailyExpense = dailyCategories.map(date => dailyData[date].expense);
    const dailyBalance = dailyCategories.map(date => dailyData[date].balance);

    const monthlyCategories = Object.keys(monthlyData);
    const monthlyIncome = monthlyCategories.map(month => monthlyData[month].income);
    const monthlyExpense = monthlyCategories.map(month => monthlyData[month].expense);
    const monthlyBalance = monthlyCategories.map(month => monthlyData[month].balance);

    const incomePieOptions = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            data: Object.keys(incomeByCategory)
        },
        series: [
            {
                name: '收入',
                type: 'pie',
                radius: '50%',
                data: Object.keys(incomeByCategory).map(key => ({
                    value: incomeByCategory[key],
                    name: key
                }))
            }
        ]
    };

    const expensePieOptions = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            data: Object.keys(expenseByCategory)
        },
        series: [
            {
                name: '支出',
                type: 'pie',
                radius: '50%',
                data: Object.keys(expenseByCategory).map(key => ({
                    value: expenseByCategory[key],
                    name: key
                }))
            }
        ]
    };
    return (

        <>
            <NavBar onBack={() => navigate(-1)} >
                账单图表
            </NavBar>
            <Chart options={generateOptions(dailyCategories, dailyIncome, dailyExpense, dailyBalance, 'line')} style={{ height: "400px", width: '100%' }} />
            <Chart options={generateOptions(monthlyCategories, monthlyIncome, monthlyExpense, monthlyBalance, 'line')} style={{ height: "400px", width: '100%' }} />
            <Chart options={generateOptions(dailyCategories, dailyIncome, dailyExpense, dailyBalance, 'bar')} style={{ height: "400px", width: '100%' }} />
            <Chart options={generateOptions(monthlyCategories, monthlyIncome, monthlyExpense, monthlyBalance, 'bar')} style={{ height: "400px", width: '100%' }} />
            <Chart options={incomePieOptions} style={{ height: "400px", width: '50%', display: 'inline-block' }} />
            <Chart options={expensePieOptions} style={{ height: "400px", width: '50%', display: 'inline-block' }} />
        </>)
};

export default Test;
