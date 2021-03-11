const calculator = document.querySelector('.container')
const buttons = calculator.querySelectorAll('button')
const operators = calculator.querySelectorAll('.operator');
const display = calculator.querySelector('.display');
const numbers = calculator.querySelectorAll('.number');
const AC = calculator.querySelector('.clear');
const equal = calculator.querySelector('.assigment');
const dot = calculator.querySelector('.dot');
const del = calculator.querySelector('.delete');

let num1;
let operator;
let num2;
let lastResult = false;
let empty = false;
let reset = true
let end = false;
let lastPressed = false;
let noDot = true;
let lastButtonAll;
display.textContent = [0];

function clear() {
    if(lastPressed && lastPressed.classList.value.includes('active')) lastPressed.classList.remove('active');
    reset = true;
    num1 = false;
    num2 = false;
    operator = false;
    lastResult = false;
    lastPressed = false
    noDot = true;

    return display.textContent = [0];
}



  function populateDisplay(key) {
      let currentButton = this;
    if(this == window) {
        currentButton = key;
    }
    if (lastButtonAll && lastButtonAll.classList.value.includes("operator") && currentButton.classList.value.includes('operator') && currentButton !== lastButtonAll) {
        operator = currentButton.dataset.func
         return;
    }
      lastButtonAll = currentButton;
      currentButton.classList.add("scale");
      setTimeout(() => {currentButton.classList.remove("scale")},100);
    if(currentButton.classList.value.includes('number') && typeof(num2) == "number" && lastResult && !reset){
        reset = true
        clear()
    }
    if(currentButton.classList.value.includes('number') && typeof(num1) !== "number") {
    if(display.textContent == [0] || display.textContent == "0") display.textContent = "";    
    display.textContent += currentButton.textContent;
    num1 = display.textContent;
    }
    if(currentButton.classList.value.includes('operator')) {
        if(lastResult) {
        num1 = lastResult;
        }
        num1 = Number(num1)
    if(num1 && num2 && operator && !end) {

        calculate()
        num1 = lastResult;
    }
        operator = currentButton.dataset.func;
        reset = true;
        empty = false
        end = false;

    }
    if(typeof(num1) == "number") {
        if(currentButton.classList.value.includes('number') && operator) {
            if(!empty) {
                empty = !empty
                display.textContent = "";
            }
            if(display.textContent == [0] || display.textContent == "0") display.textContent = "";
            display.textContent += currentButton.textContent;
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
    if(!Number.isInteger(sum)) {
    sum = sum.toFixed(2);
    }
    lastResult = sum;
	return display.textContent = sum;
	}

  function subtract (...args) {
	let sub = 0;
	for (let i = 0; i < args.length - 1; i++) {
		sub += (Number(args[i] - Number(args[i+1])));
	    }
        if(!Number.isInteger(sub)) {
           sub = sub.toFixed(2);
            }
        lastResult = sub;
	return display.textContent = sub;
	}

function multiply (...args) {
    let multi = 0;
    for (let i = 0; i < args.length - 1; i++) {
        multi += (Number(args[i] * Number(args[i+1])));
        }
        if(!Number.isInteger(multi)) {
            multi = multi.toFixed(2);
            }
            lastResult = multi;
    return display.textContent = multi;
    }

    function divide (...args) {
        if (args[1] == 0) {
            lastResult = "ERROR"
            return display.textContent = "ERROR"
        } else {
        let divi = 0;
        for (let i = 0; i < args.length - 1; i++) {
            divi += (Number(args[i] / Number(args[i+1])));
            }
        if(!Number.isInteger(divi)) {
         divi = divi.toFixed(2);
        }
                lastResult = divi;
        return display.textContent = divi;
        }
    }

    function handlePressedOpColor (key) {
        let pressedOp = this
        if (pressedOp == window) pressedOp = key
        if(lastPressed && pressedOp !== lastPressed) lastPressed.classList.remove('active');
        pressedOp.classList.add("active")
        lastPressed = pressedOp;
    }


function equalButton() {
    if(!num2 || (!operator && num2)) {
        return;
    }
    if(lastPressed && lastPressed.classList.value.includes('active')) lastPressed.classList.remove('active');
    end = true;
    calculate()
    num1 = lastResult;
}

function dotButton() {
    if(!display.textContent.includes('.')) {
        display.textContent += '.';
        noDot = false;
    } else {
        return;
    }
}

function delButton() {
    if(num1 === lastResult && typeof(num2) === 'number') return;
    const str = String(display.textContent);
    const arr = str.split("")
    const newArr = arr.pop();
    let newStr = arr.join("");

    if(newStr == '') {
        newStr = '0'
    }
    if(str == num1 && typeof(num1 == "string")) {
    num1 = newStr
    }
    if(str == num2 && typeof(num2 == "string")) {
    num2 = newStr
    }
    return display.textContent = newStr;
}

function keyboardComp(e) {
    const key = calculator.querySelector(`button[data-key="${e.keyCode}"]`);
    if (key == equal) equalButton()
    if (key == dot) dotButton()
    if(key == del) delButton()
    if(key == AC) clear()
    if(key.classList.value.includes('operator')) handlePressedOpColor(key)
    if (!key) return;
    populateDisplay(key);    
}


dot.addEventListener('click', dotButton)

del.addEventListener('click', delButton)

operators.forEach(pressed => pressed.addEventListener('click', handlePressedOpColor));

buttons.forEach(button => button.addEventListener('click', populateDisplay));
AC.addEventListener('click', clear);


equal.addEventListener('click', equalButton);


window.addEventListener('keydown', keyboardComp);

