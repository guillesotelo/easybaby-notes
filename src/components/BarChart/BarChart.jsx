import { Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const BarChart = (props) => {

    const {
        title,
        chartData,
        position,
        size
    } = props

    const options = {
        maintainAspectRatio: false,
        indexAxis: position || 'x',
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                ticks: {
                    autoSkip: false
                }
            }
        }
    }

    const isMobile = window.innerWidth < 800

    const barHeight = isMobile ? 300 : size ? size : '30vw'
    const barWidth = isMobile ? window.outerWidth * 0.9 : size ? size * 1.25 : '40vw'

    return (
        <div className='barchart-container' style={{ width: barWidth, height: barHeight }}>
            <h4 className='chart-title'>{title || ''}</h4>
            <Bar data={chartData} height={barHeight} width={barWidth} options={options} />
        </div>
    )
}

export default BarChart
