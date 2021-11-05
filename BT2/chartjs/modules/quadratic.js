import { updateChart, quadraticSolve, calcXRange, XoAxis, YoAxis } from './utils.js'


const quadratic = (a, b, c, step, chart, color) => {

	let labels = []
	let data = []

	const fx = math.evaluate('f(x) = a*x^2 + b*x + c', { a: a, b: b, c: c })

	let changePoint = -b / (2.0 * a)
	let points = [...quadraticSolve(a, b, c), changePoint].sort((lhs, rhs) => lhs - rhs)

	let minX = Math.min(...points) - 2
	let maxX = Math.max(...points) + 2

	let maxY = -Infinity,
		minY = Infinity
	for (let x = minX; x <= maxX; x += step) {
		labels.push(x)

		let y = fx(x)
		data.push(y)

		maxY = Math.max(maxY, y)
		minY = Math.min(minY, y)
	}


	updateChart(chart, labels, data, color, () => {
		chart.options.plugins = {
			annotation: {
				annotations: {
					XoAxis,
					YoAxis
				}
			},
			legend: {
				display: false
			}
		}

		chart.options.scales = {
			x: {
				display: true,
				title: {
					display: true,
					//text: 'Month'
				},
				min: minX > 1 ? -1 : minX - 1,
				max: maxX + 1,
				grid: {
					display: false
				}
			},
			y: {
				display: true,
				title: {
					display: true,
					//text: 'Value'
				},
				min: minY > 1 ? -1 : minY - 1,
				max: maxY + 1,
				grid: {
					display: false
				}
			}
		}

		chart.update()
	})

}

export default quadratic