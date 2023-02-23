import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


export const LineChart = (props) => {
    const {
        chartData,
        title,
        size
    } = props

    const options = {
        responsive: true,
        plugins: {
            legend: {
                // position: 'top',
                display: false
            },
            title: {
                display: true,
                text: title || '',
            },
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: labels.map(() => Math.floor(Math.random() * 10E5)),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: labels.map(() => Math.floor(Math.random() * 10E5)),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    }


    const isMobile = window.innerWidth < 800

    const chartHeight = isMobile ? 300 : size ? size : '30vw'
    const chartWidth = isMobile ? window.outerWidth * 0.9 : size ? size * 1.25 : '40vw'

    return <Line options={options} data={data} height={chartHeight} width={chartWidth}/>
}
