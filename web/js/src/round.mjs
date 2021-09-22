const round = (num = 0) => {
	return Math.round((num + Number.EPSILON) * 100) / 100;
};

export default round;
