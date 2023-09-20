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

  const defaults = Chart.defaults

  defaults.elements.line.tension = 0.5
  defaults.elements.point.radius = 0
  defaults.maintainAspectRatio = false
  defaults.font.family = 'IBM Plex Mono'
  defaults.color = '#94a3b8'
  defaults.interaction.mode = 'index'
  defaults.interaction.intersect = false
  defaults.plugins.tooltip.displayColors = false
  defaults.scale.grid.drawTicks = false
  // defaults.scale.grid.tickBorderDash = [6, 6]
  defaults.scales.time.time.tooltipFormat = 'Pp'
  defaults.scales.time.time.minUnit = 'day'
  defaults.scales.time.ticks.maxRotation = 0
  // defaults.scales.linear.min = 0
  defaults.scales.linear.ticks.format = {
    notation: 'compact',
    maximumFractionDigits: 2,
  }
  defaults.borderColor = 'rgba(255, 255, 255, 0.1)'
  defaults.animation = false
  defaults.datasets.line.borderColor = '#C5FF46'
  defaults.datasets.line.borderWidth = 2
  defaults.datasets.bar.backgroundColor = '#5D6575'
  defaults.datasets.bar.barPercentage = 0.85
  defaults.datasets.bar.borderRadius = 4
}
