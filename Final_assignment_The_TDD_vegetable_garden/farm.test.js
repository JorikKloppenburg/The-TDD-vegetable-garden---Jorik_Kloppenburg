const {
	getYieldForPlant,
	getYieldForCrop,
	getTotalYield,
	getCostsForCrop,
	getRevenueForCrop,
	getProfitForCrop,
	getTotalProfit,
} = require('./farm');


//
// a. Get yield for plant 
// Include environmental factors in calculating the yield (in kilograms) 
// of a plant in this function: getYieldForPlant, use the following data structures:
describe('a. - getYieldForPlant', () => {
	test('Get yield for plant - no environment factors', () => {
		const corn = {
			name: 'corn',
			yield: 30,
		};
		expect(getYieldForPlant(corn)).toBe(30);
	});
	test('Get yield for plant - with environment factors', () => {
		const corn = {
			name: 'corn',
			yield: 30,
			factors: {
				sun: {
					low: -50,
					medium: 0,
					high: 50,
				},
				wind: {
					low: 0,
					medium: -30,
					high: -60,
				},
			},
		};

		const environmentFactors = {
			sun: 'medium',
			wind: 'high',
		};
		expect(getYieldForPlant(corn, environmentFactors)).toBe(12);
	});
});
// b. Get yield for crop 
// calculate the yield in kilograms of a crop getYieldForCrop, include environmental factors in your calculation. 
describe('b. - getYieldForCrop', () => {
	test('Get yield for crop - no environment factors', () => {
		const corn = {
			name: 'corn',
			yield: 3,
		};
		const input = {
			crop: corn,
			numCrops: 10,
		};
		expect(getYieldForCrop(input)).toBe(30);
	});
	test('Get yield for crop - with environment factors', () => {
		const corn = {
			name: 'corn',
			yield: 3,
			factors: {
				sun: {
					low: -50,
					medium: 0,
					high: 50,
				},
				wind: {
					low: 0,
					medium: -30,
					high: -60,
				},
			},
		};
		const environmentFactors = {
			sun: 'medium',
			wind: 'high',
		};
		const input = {
			crop: corn,
			numCrops: 10,
		};

		expect(getYieldForCrop(input, environmentFactors)).toBe(12);
	});
});

// c. Get total of yield  
//calculate the total yield of multiple crops getTotalYield, include environmental factors in your calculation.
describe('c. - getTotalYield', () => {
	test('Calculate total yield with multiple crops', () => {
		const corn = {
			name: 'corn',
			yield: 3,
		};
		const pumpkin = {
			name: 'pumpkin',
			yield: 4,
		};
		const crops = [
			{ crop: corn, numCrops: 5 },
			{ crop: pumpkin, numCrops: 2 },
		];
		expect(getTotalYield({ crops })).toBe(23);
	});

	test('Calculate total yield with 0 amount', () => {
		const corn = {
			name: 'corn',
			yield: 3,
		};
		const crops = [{ crop: corn, numCrops: 0 }];
		expect(getTotalYield({ crops })).toBe(0);
	});
});

// 1. calculate the cost for a crop: getCostsForCrop
describe('1. - getCostsForCrop', () => {
	test('calculate costs for a crops', () => {
		const corn = {
			name: 'corn',
			yield: 3,
		};
		const input = { crop: corn, numCrops: 10, costs: 2 };
		expect(getCostsForCrop(input)).toBe(20);
	});
	test('Calculate the costs for multiple Crops', () => {
		const corn = {
			name: 'corn',
			yield: 3,
		};
		const pumpkin = {
			name: 'pumpkin',
			yield: 4,
		};
		const input = [
			{ crop: corn, numCrops: 10, costs: 2 },
			{ crop: pumpkin, numCrops: 20, costs: 5 },
		];
		const output = [
			{ name: 'corn', 'total costs': 20 },
			{ name: 'pumpkin', 'total costs': 100 },
		];
		expect(getCostsForCrop(input)).toEqual(output);
	});
});

// 2. calculate the revenue for a crop (without environmental factors): getRevenueForCrop.
// calculate the income of a crop getRevenueForCrop, include environmental factors in your calculation.
describe('2. - getRevenueForCrop', () => {
	test('calculate revenue for a crop - no environment factors:', () => {
		const corn = {
			name: 'corn',
			yield: 3,
		};
		const input = { crop: corn, numCrops: 10, price: 3 };
		expect(getRevenueForCrop(input)).toBe(90);
	});

	test('calculate revenue for multiple crops - no environment factors:', () => {
		const corn = {
			name: 'corn',
			yield: 3,
		};
		const pumpkin = {
			name: 'pumpkin',
			yield: 4,
		};
		const avocado = {
			name: 'avocado',
			yield: 5,
		};
		const input = [
			{ crop: corn, numCrops: 10, price: 3 },
			{ crop: pumpkin, numCrops: 20, price: 5 },
			{ crop: avocado, numCrops: 50, price: 10 },
		];
		const output = [
			{ name: 'corn', revenue: 90 },
			{ name: 'pumpkin', revenue: 400 },
			{ name: 'avocado', revenue: 2500 },
		];
		expect(getRevenueForCrop(input)).toEqual(output);
	});
});

// 3. calculate the profit for a crop (without environmental factors): getProfitForCrop.
// calculate the profit of a crop getProfitForCrop, include environmental factors in your calculation.
describe('3. - GetProfitForCrop', () => {
	test('Get the profit for a single crop - with environment factors', () => {
		const corn = {
			name: 'corn',
			yield: 3,
			factors: {
				sun: {
					low: -50,
					medium: 0,
					high: 50,
				},
				wind: {
					low: 0,
					medium: -30,
					high: -60,
				},
			},
		};
		const environmentFactors = {
			sun: 'medium',
			wind: 'high',
		};
		const input = {
			crop: corn,
			factors: environmentFactors,
			numCrops: 10,
			costs: 2,
			price: 3,
		};
		expect(getProfitForCrop(input)).toBe(16);
	});
});

// 4. calculate the profit for multiple crops (without environmental factors): getTotalProfit.
// calculate the profit for multiple crops getTotalProfit, include environmental factors in your calculation.
describe('4. - getProfitGorCrop', () => {
	test('calculate the total profit for multiple crops - with environment factors:', () => {
		const corn = {
			name: 'corn',
			yield: 3,
			factors: {
				sun: {
					low: -50,
					medium: 0,
					high: 50,
				},
				wind: {
					low: 0,
					medium: -30,
					high: -60,
				},
			},
		};

		const pumpkin = {
			name: 'pumpkin',
			yield: 4,
			factors: {
				sun: {
					low: -50,
					medium: 0,
					high: 50,
				},
				wind: {
					low: 0,
					medium: -30,
					high: -60,
				},
			},
		};
		const carrots = {
			name: 'carrots',
			yield: 5,
			factors: {
				sun: {
					low: -50,
					medium: 0,
					high: 50,
				},
				wind: {
					low: 0,
					medium: -30,
					high: -60,
				},
			},
		};
		const avocado = {
			name: 'avocado',
			yield: 50,
			factors: {
				sun: {
					low: -50,
					medium: 0,
					high: 50,
				},
				wind: {
					low: 0,
					medium: -30,
					high: -60,
				},
			},
		};
		const environmentFactors = {
			corn: {
				sun: 'medium',
				wind: 'low',
			},
			pumpkin: {
				sun: 'low',
				wind: 'high',
			},
			carrots: {
				sun: 'medium',
				wind: 'high',
			},
			avocado: {
				sun: 'low',
				wind: 'medium',
			},
		};

		const input = [
			{
				crop: corn,
				numCrops: 10,
				costs: 2,
				price: 3,
				factors: environmentFactors.corn,
			},
			{
				crop: pumpkin,
				numCrops: 200,
				costs: 2,
				price: 10,
				factors: environmentFactors.pumpkin,
			},
			{
				crop: carrots,
				numCrops: 500,
				costs: 2,
				price: 4,
				factors: environmentFactors.carrots,
			},
			{
				crop: avocado,
				numCrops: 100,
				costs: 2,
				price: 6,
				factors: environmentFactors.avocado,
			},
		];
		const output = [
			{ name: 'corn', profit: 70 },
			{ name: 'pumpkin', profit: -1200 },
			{ name: 'carrots', profit: 3000 },
			{ name: 'avocado', profit: 5800 },
		];

		expect(getTotalProfit(input)).toEqual(output);
	});
});