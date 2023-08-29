import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  TimeScale,
  Tooltip,
} from 'chart.js'
import 'chartjs-adapter-date-fns'

export const initChartJS = () => {
  Chart.register(
    Tooltip,
    LineController,
    LineElement,
    PointElement,
    TimeScale,
    LinearScale,
    CategoryScale,
    BarController,
    BarElement,
  )

  Chart.defaults.elements.line.tension = 0.5
  Chart.defaults.elements.point.radius = 0
  Chart.defaults.maintainAspectRatio = false
  Chart.defaults.font.family = 'Montserrat'
  Chart.defaults.color = '#94a3b8'
  Chart.defaults.interaction.mode = 'index'
  Chart.defaults.interaction.intersect = false
  Chart.defaults.plugins.tooltip.displayColors = false
  Chart.defaults.scale.grid.display = false
  Chart.defaults.scales.time.time.tooltipFormat = 'Pp'
  Chart.defaults.borderColor = 'transparent'
  Chart.defaults.animation = false
  Chart.defaults.datasets.line.borderColor = '#C5FF46'
  Chart.defaults.datasets.bar.backgroundColor = '#C5FF46'
  Chart.defaults.datasets.bar.barPercentage = 0.6
}
