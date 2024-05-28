import { memo, useEffect, useRef } from "react";
import * as echarts from 'echarts'
const Chart = memo(({ options, style }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    function renderChart() {
        try {
            // `echarts.getInstanceByDom` 可以从已经渲染成功的图表中获取实例，其目的就是在 options 发生改变的时候，不需要重新创建图表，而是复用该图表实例，提升性能
            let chartInstance = echarts.getInstanceByDom(chartRef.current);
            if (!chartInstance) {
                chartInstance = echarts.init(chartRef.current);
                chartInstanceRef.current = chartInstance;
            }
            chartInstance.setOption(options)
        } catch (e) {
            // console.error(e);
            if (chartInstanceRef.current) {
                chartInstanceRef.current.dispose();
                chartInstanceRef.current = null;
            }
        }
    }
    // 定义窗口大小发生改变执行的回调函数
    function resizeHandler() {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.resize();
        }
    }
    // 页面初始化时，开始渲染图表
    useEffect(() => {
        renderChart();
        return () => {
            // 销毁图表实例，释放内存
            if (chartInstanceRef.current) {
                chartInstanceRef.current.dispose();
            }
        };
    }, []);
    // 监听窗口大小改变
    useEffect(() => {
        window.addEventListener("resize", resizeHandler);
        return () => window.removeEventListener("resize", resizeHandler);
    }, []);
    return (
        <>
            <div style={style} ref={chartRef} />
        </>
    )
}
)
export default Chart