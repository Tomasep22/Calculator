const calculator = document.querySelector('.container')
const buttons = calculator.querySelectorAll('button')
const operators = calculator.querySelectorAll('.operator');
const display = calculator.querySelector('.display');
const numbers = calculator.querySelectorAll('.number');
const AC = calculator.querySelector('.clear');
const equal = calculator.querySelector('.assigment');

let num1;
let operator;
let num2;
let lastResult = false;

function clear() {
    num1 = false;
    num2 = false;
    operator = false;
    lastResult = false;
    return display.textContent = "";
}

  function populateDisplay() {
    if(this.classList.value.includes('number') && typeof(num1) !== "number") {
    display.textContent += this.textContent;
    num1 = display.textContent;
    }
    if(this.classList.value.includes('operator')) {
        if(lastResult) {
        num1 = lastResult;
        }
        num1 = Number(num1)
        operator = this.dataset.func;
        display.textContent = "";
    }
    if(typeof(num1) == "number") {
        if(this.classList.value.includes('number') && operator) {
            display.textContent += this.textContent;
            num2 = display.textContent;
        }
    }
  }

  function calculate() {
    if (operator == "add") {
        num2 = Number(num2)
        add(num1, num2);
    }
    if(operator == "subtract") {
        num2 = Number(num2)
        subtract(num1, num2);
    }
    if(operator == "multiply") {
        num2 = Number(num2)
        multiply(num1, num2);
    }
    if(operator == "divide") {
        num2 = Number(num2)
        divide(num1, num2);
    }
  }
 

  function add (...args) {
    let sum = 0;
	for (let i = 0; i < args.length; i++) {
		sum += Number(args[i]);
	}
    lastResult = sum;
	return display.textContent = sum;
	}

  function subtract (...args) {
	let sub = 0;
	for (let i = 0; i < args.length - 1; i++) {
		sub += (Number(args[i] - Number(args[i+1])));
	    }
        lastResult = sub;
	return display.textContent = sub;
	}

function multiply (...args) {
    let multi = 0;
    for (let i = 0; i < args.length - 1; i++) {
        multi += (Number(args[i] * Number(args[i+1])));
        }
            lastResult = multi;
    return display.textContent = multi;
    }

    function divide (...args) {
        let divi = 0;
        for (let i = 0; i < args.length - 1; i++) {
            divi += (Number(args[i] / Number(args[i+1])));
            }
                lastResult = divi;
        return display.textContent = divi;
        }



  function power(...args) {
	let exp = 0;
	for (let i = 0; i < args.length - 1; i++) {
		exp += (Number(args[i] ** Number(args[i+1])));
		}
		return exp;
	}



buttons.forEach(button => button.addEventListener('click', populateDisplay));
AC.addEventListener('click', clear);
equal.addEventListener('click', calculate);