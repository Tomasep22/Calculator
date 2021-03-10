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
let empty = false;
let reset = true
let end = false;
let lastPressed = false;
display.textContent = [0];

function clear() {
    if(lastPressed && lastPressed.classList.value.includes('active')) lastPressed.classList.remove('active');
    reset = true;
    num1 = false;
    num2 = false;
    operator = false;
    lastResult = false;
    return display.textContent = [0];
}



  function populateDisplay() {
      this.classList.add("scale");
      setTimeout(() => {this.classList.remove("scale")},100);
    if(this.classList.value.includes('number') && typeof(num2) == "number" && lastResult && !reset){
        reset = true
        clear()
    }
    if(this.classList.value.includes('number') && typeof(num1) !== "number") {
    if(display.textContent == [0] || display.textContent == "0") display.textContent = "";    
    display.textContent += this.textContent;
    num1 = display.textContent;
    }
    if(this.classList.value.includes('operator')) {
        if(lastResult) {
        num1 = lastResult;
        }
        num1 = Number(num1)
    if(num1 && num2 && operator && !end) {
        calculate()
        num1 = lastResult;
    }
        operator = this.dataset.func;
        reset = true;
        empty = false
        end = false;

    }
    if(typeof(num1) == "number") {
        if(this.classList.value.includes('number') && operator) {
            if(!empty) {
                empty = !empty
                display.textContent = "";
            }
            if(display.textContent == [0] || display.textContent == "0") display.textContent = "";
            display.textContent += this.textContent;
            num2 = display.textContent;
        }
    }
  }

  function calculate() {
    if (operator == "add") {
        num2 = Number(num2)
        reset = false
        add(num1, num2);
 

    }
    if(operator == "subtract") {
        num2 = Number(num2)
        reset = false
        subtract(num1, num2);

    }
    if(operator == "multiply") {
        num2 = Number(num2)
        reset = false
        multiply(num1, num2);

    }
    if(operator == "divide") {
        num2 = Number(num2)
        reset = false
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

    function handlePressedOpColor () {
        if(lastPressed && this !== lastPressed) lastPressed.classList.remove('active');
        this.classList.add("active")
        lastPressed = this;
    }

operators.forEach(pressed => pressed.addEventListener('click', handlePressedOpColor));

buttons.forEach(button => button.addEventListener('click', populateDisplay));
AC.addEventListener('click', clear);
equal.addEventListener('click', () => {
    if(!num2 || (!operator && num2)) {
        clear();
        return;
    }
    if(lastPressed && lastPressed.classList.value.includes('active')) lastPressed.classList.remove('active');
    end = true;
    calculate()
    num1 = lastResult;
});