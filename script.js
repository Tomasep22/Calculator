  function add (...args) {
    let sum = 0;
	for (let i = 0; i < args.length; i++) {
		sum += Number(args[i]);
	}
	return sum;
	}

  function subtract (...args) {
	let sub = 0;
	for (let i = 0; i < args.length - 1; i++) {
		sub += (Number(args[i] - Number(args[i+1])));
	    }
	return sub;
	}

  function sum (...args) {
	let add = 0;
	for (let i = 0; i < args.length; i++) {
		const sumArray = args[i].reduce((total, value) => {
		return total += value
		},0);
	return add += sumArray;
		}
	return add;	
	}

  function multiply (...args) {
	let multi = 1;
	for (let i = 0; i < args.length; i++) {
	const sumArray = args[i].reduce((total, value) => {
	return total *= value
	},1);
	return multi *= sumArray;
	}
	return multi;	
	}

  function power(...args) {
	let exp = 0;
	for (let i = 0; i < args.length - 1; i++) {
		exp += (Number(args[i] ** Number(args[i+1])));
		}
		return exp;
	}

  function factorial(n) {
	if (n == 0) return 1;
	let product = 1;
	for(let i = n; i > 0; i--) {
		product *= i
	}
	return product;

}