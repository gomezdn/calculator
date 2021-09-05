///////////////////////////////////////////////////////////////////////////////////////
                                    //  MATH FUNCTIONS //

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(num1, operator, num2) {
    switch(operator) {
        case "+":
            return add(num1, num2);
            break;
        case "-":
            return subtract(num1, num2);
            break;
        case "*":
            return multiply(num1, num2);
            break;
        case "/":
            return divide(num1, num2);
            break;
    }
}

                // MATH FUNCTIONS///

//////////////////////////////////////////////////////////////////////////////////////////////////////////

                // DOM MANIPULATION //


const allButtons = document.querySelectorAll("input");
const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector("#clearBtn");
const deleteButton = document.querySelector("#delBtn");
const resultButton = document.querySelector("#resultBtn");
const floatButton = document.querySelector("#floatBtn");
const mainDisplay = document.querySelector("#mainDisplay");
const secondDisplay = document.querySelector("#secondDisplay");



allButtons.forEach(button => button.addEventListener("click", () => {  // adds click animation
    button.classList.add("buttonClicked");
}))
allButtons.forEach(button => button.addEventListener("transitionend", () => {  // removes click animation
    button.classList.remove("buttonClicked")
}))

let displayErasable;  // main display overwritability
let memory = [];  // calculator buffer for operating in the right moment
let float;        // main display with decimals or not
let regExpNum = /[0-9]/
let regExpOp = /[*+\-/]/

floatButton.addEventListener("click", toggleFloat)
clearButton.addEventListener("click", clear)
deleteButton.addEventListener("click", backspace)
resultButton.addEventListener("click", displayResult)

digitButtons.forEach(button => button.addEventListener("click", () => numberDisplaying(button.value)))
operatorButtons.forEach(button => button.addEventListener("click", () => operationalLogic(button.value)))
window.addEventListener("keydown", (e) => {  // adds support for keyboard
    if (regExpOp.test(e.key)) {
        operationalLogic(e.key)
    } else if (regExpNum.test(e.key) && !e.key.startsWith("F")) {
        numberDisplaying(e.key)
    } else if (e.key == "Enter") {
        displayResult()
    } else if (e.key == "Backspace") {
        backspace()
    } else if (e.key == ".") {
        toggleFloat()
    } else if (e.key == "Escape") {
        clear()
    }
})

function numberDisplaying(number) {      // manages the displaying of entered numbers
    if (displayErasable) {
        mainDisplay.innerText = "";
        displayErasable = false;
    }   
    mainDisplay.innerText += number;
}

function operationalLogic(operator) {
    if (!memory[0] && mainDisplay.innerText == "") {return}
    if (!memory[1]) {     // if no operator has been saved yet, it saves the first operand and an operator
        secondDisplay.innerText += " " + mainDisplay.innerText + " " + operator
        memory[0] = mainDisplay.innerText;
        memory[1] = operator;
        displayErasable = true;
    } else if (!displayErasable) {   // if an operation has recently been done, main display gets overwritten
        secondDisplay.innerText += " " + mainDisplay.innerText + " " + operator;  // when a number is entered
        mainDisplay.innerText = operate(+memory[0], memory[1], +mainDisplay.innerText);
        memory = [mainDisplay.innerText, operator]
        displayErasable = true;
    } else if (displayErasable) {   // if no oepration has been done yet, it toggles the operator for that
        memory[1] = operator;   //  future operation
        secondDisplay.innerText = removeLastChar(secondDisplay.innerText) + " " + operator
    }
}

function displayResult()  {      // displays result if values are present when pressing = 
    if (memory[0] && memory[1] && !displayErasable) {
        secondDisplay.innerText = "";
        mainDisplay.innerText = operate(+memory[0], memory[1], +mainDisplay.innerText);
        memory = [mainDisplay.innerText];
        displayErasable = true;
    }
}

function backspace() {  // it deletes one char at a time from the main display
    if ((memory[0] && displayErasable)) {return}
    if (mainDisplay.innerText.length > 1) {     //  until only a 0 is displayed
        mainDisplay.innerText = mainDisplay.innerText.slice(0, mainDisplay.innerText.length-1)
    } else if (mainDisplay.innerText.length == 1) {
        mainDisplay.innerText = "0";
        displayErasable = true;
    }
}

function toggleFloat() {   // puts or removes float point from main display
    if (!/[.]/.test(mainDisplay.innerText) && mainDisplay.innerText != "" && !displayErasable) {
        mainDisplay.innerText += ".";
    }
}

function clear() {   // clears display
    secondDisplay.innerText = "";
    mainDisplay.innerText = "";
    memory = [];
}
            // DOM MANIPULATION //

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // AUXILIAR FUNCTIONS //

function removeLastChar(string) {
    return string.slice(0, string.length-1)
}

