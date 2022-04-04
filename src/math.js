const calculateTip = (total, tipPercent = 0.25) => total + (total * tipPercent);

const fahrenheitToCelsius = (temp) => {
    return (temp - 32) / 1.8;
};

const celsiusToFahrenheit = (temp) => {
    return (temp * 1.8) + 32;
};

async function add(a, b) {
	return new Promise((resoleve, reject) => {
		setTimeout(() => {
			resoleve(a + b);
		},2000);
	});
}

export { 
	calculateTip ,
	fahrenheitToCelsius,
	celsiusToFahrenheit,
	add,	
};