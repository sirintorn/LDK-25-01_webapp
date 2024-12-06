import React, { useRef, useEffect } from 'react';
import {
    Chart,
    BarController, // Register the bar chart controller
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register required Chart.js components
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

interface BarChartProps {
    data: Chart.ChartData<'bar'>;
    options?: Chart.ChartOptions<'bar'>;
}

const BarChart: React.FC<BarChartProps> = ({ data, options }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart<'bar'> | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            chartInstance.current = new Chart(chartRef.current, {
                type: 'bar',
                data,
                options,
            });
        }

        return () => {
            chartInstance.current?.destroy();
        };
    }, [data, options]);

    return <canvas ref={chartRef} />;
};

export default BarChart;
