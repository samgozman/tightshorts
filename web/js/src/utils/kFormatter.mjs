// Format big numbers to K, like 10k
export default function kFormatter(num) {
	return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : (Math.sign(num) * Math.abs(num)).toFixed(1)
}