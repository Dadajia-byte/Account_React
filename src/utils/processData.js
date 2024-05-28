function processData(data) {
    const dailyData = {};
    const monthlyData = {};
    const incomeByCategory = {};
    const expenseByCategory = {};

    data.forEach(item => {
        const date = item.date.split('T')[0];
        const month = date.slice(0, 7);

        // 日数据处理
        if (!dailyData[date]) {
            dailyData[date] = { income: 0, expense: 0, balance: 0 };
        }
        if (item.type === 'income') {
            dailyData[date].income += item.money;
        } else {
            dailyData[date].expense += item.money;
        }
        dailyData[date].balance = dailyData[date].income + dailyData[date].expense;

        // 月数据处理
        if (!monthlyData[month]) {
            monthlyData[month] = { income: 0, expense: 0, balance: 0 };
        }
        if (item.type === 'income') {
            monthlyData[month].income += item.money;
        } else {
            monthlyData[month].expense += item.money;
        }
        monthlyData[month].balance = monthlyData[month].income + monthlyData[month].expense;

        // 分类数据处理
        if (item.type === 'income') {
            if (!incomeByCategory[item.useFor]) {
                incomeByCategory[item.useFor] = 0;
            }
            incomeByCategory[item.useFor] += item.money;
        } else {
            if (!expenseByCategory[item.useFor]) {
                expenseByCategory[item.useFor] = 0;
            }
            expenseByCategory[item.useFor] += item.money;
        }
    });

    return { dailyData, monthlyData, incomeByCategory, expenseByCategory };
}

// const { dailyData, monthlyData, incomeByCategory, expenseByCategory } = processData(data);

export { processData }