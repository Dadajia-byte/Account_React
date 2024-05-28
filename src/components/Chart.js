import { useEffect, useRef } from "react";
import * as echarts from 'echarts'
function Chart({ options }) {
    const chartRef = useRef(null);
    const chartInstance = null;
    function renderChart() {
        try {
            // `echarts.getInstanceByDom` 可以从已经渲染成功的图表中获取实例，其目的就是在 options 发生改变的时候，不需要重新创建图表，而是复用该图表实例，提升性能
            const renderedInstance = echarts.getInstanceByDom(chartRef.current);
            if (renderedInstance) {
                chartInstance = renderedInstance;
            } else {
                chartInstance = echarts.init(chartRef.current);
            }
            chartInstance.setOption(options)
        } catch (e) {
            // console.error(e);
            chartInstance && chartInstance.dispose();
        }
    }
    // 定义窗口大小发生改变执行的回调函数
    function resizeHandler() {
        chartInstance.resize();
    }
    // 页面初始化时，开始渲染图表
    useEffect(() => {
        renderChart();
        return () => {
            // 销毁图表实例，释放内存
            chartInstance && chartInstance.dispose();
        };
    }, []);
    // 监听窗口大小改变
    useEffect(() => {
        window.addEventListener("resize", resizeHandler);
        return () => window.removeEventListener("resize", resizeHandler);
    }, []);
    return (
        <>
            <h2>折线图+柱状图</h2>
            <div style={{ height: "200px", width: '300px' }} ref={chartRef} />
        </>
    )
}

export default Chart