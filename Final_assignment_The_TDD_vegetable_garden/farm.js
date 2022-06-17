//Get the tests running with jest first. So write the code needed to make the tests pass, see functions => a, b, c.

// a. Get yield for plant () 
const getYieldForPlant = (crop, environmentFactors) => {
	let result = 0;
	if (!environmentFactors) {
		return crop.yield;
	}
	Object.keys(environmentFactors).forEach((key) => {
		let cropFactorKey = environmentFactors[key];
		let cropFactor = crop.factors[key];

		result += (crop.yield / 100) * cropFactor[cropFactorKey];
	});
	return crop.yield + result;
};

// b. Get yield for crop ()  
const getYieldForCrop = (input, environmentFactors) => {
	let result = 0;
	let total = input.crop.yield * input.numCrops;

	if (!environmentFactors) {
		return total;
	}
	Object.keys(environmentFactors).forEach((key) => {
		let cropFactorKey = environmentFactors[key];
		let cropFactor = input.crop.factors[key];

		result += (input.crop.yield / 100) * cropFactor[cropFactorKey];
	});
	return result * input.numCrops + total;
};

// c. Get total of yield () 
const getTotalYield = ({ crops }) => {
	return crops
		.map((item) => item.crop.yield * item.numCrops)
		.reduce((a, b) => a + b);
};

// 1. calculate the cost for a crop: getCostsForCrop.
const getCostsForCrop = (input) => {
	if (!Array.isArray(input)) {
		let { numCrops, costs } = input;
		return numCrops * costs;
	}
	return input.map((item) => {
		let totalCosts = {
			name: item.crop.name,
			'total costs': item.numCrops * item.costs,
		};
		return totalCosts;
	});
};

// 2. calculate the revenue for a crop (without environmental factors): getRevenueForCrop.
const getRevenueForCrop = (input) => {
	if (!Array.isArray(input)) {
		const { yield: quantity } = input.crop;
		const { numCrops, price } = input;
		return quantity * numCrops * price;
	}
	return input.map((item) => {
		const { yield: quantity } = item.crop;
		const { numCrops, price } = item;
		let totalCosts = {
			name: item.crop.name,
			revenue: numCrops * quantity * price,
		};
		return totalCosts;
	});
};

// 3. calculate the profit for a crop (without environmental factors): getProfitForCrop.
const getProfitForCrop = (input) => {
	const { yield: quantity } = input.crop;
	const { numCrops, costs, price } = input;
	const totalCosts = numCrops * costs;
	let factor = 0;

	Object.keys(input.factors).forEach((key) => {
		factorKey = input.crop.factors[key];
		factorValue = factorKey[input.factors[key]];
		factor += factorValue;
	});

	let totalYield =
		((numCrops * quantity) / 100) * factor + numCrops * quantity;
	return totalYield * price - totalCosts;
};

// 4. calculate the profit for multiple crops (without environmental factors): getTotalProfit.
const getTotalProfit = (input) => {
	let output = [];
	input.forEach((item) => {
		const { yield: quantity, name } = item.crop;
		const { numCrops, costs, price } = item;
		const totalCosts = numCrops * costs;
		const totalyield = quantity * numCrops;
		let factorTotal = 0;

		Object.keys(item.factors).forEach((key) => {
			const factorKey = item.crop.factors[key];
			const factorValue = factorKey[item.factors[key]];
			factorTotal += factorValue;
		});
		const totalWithFactors =
			(totalyield / 100) * factorTotal + totalyield;

		output.push({
			name: name,
			profit: totalWithFactors * price - totalCosts,
		});
	});
	return output;
};

module.exports = {
	getYieldForPlant,
	getYieldForCrop,
	getTotalYield,
	getCostsForCrop,
	getRevenueForCrop,
	getProfitForCrop,
	getTotalProfit,
};