const display = document.getElementById("Display")
const buttons = document.querySelectorAll('button')

let currResult = ''
let operator = ''
let firstOperator = ''

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const num = button.textContent
        if (!isNaN(num) || num === '.') { // Handle Decimal Points
            currResult += num
            updateDisplay()
        } else if (num === 'C') {
            currResult = ''
            operator = ''
            display.value = ''
            firstOperator = ''
        } else if (num === '+/-') {
            if (currResult) {
                currResult = (parseFloat(currResult) * -1).toString();
                updateDisplay()
            } 
        }
        else if (num === '<') {
            currResult = currResult.slice(0, -1)
            updateDisplay()
        } else if (num === '=') {
            if (firstOperator && operator && currResult) { // If there is an equation
                let total;
                const secondOperator = parseFloat(currResult)
                const firstNum = parseFloat(firstOperator)
                switch (operator) {
                    case '+':
                        total = firstNum + secondOperator;
                        break;
                    case '-':
                        total = firstNum - secondOperator;
                        break;
                    case '*':
                        total = firstNum * secondOperator;
                        break;
                    case '/':
                        total = firstNum / secondOperator;
                        break;
                    case '%':
                        total = firstNum * (secondOperator / 100)
                        break;
                }
                display.value = total;
                currResult = total.toString();
                firstOperator = ''
                operator = ''
                updateDisplay()
            }
        } else {
            if (currResult) {
                if (!firstOperator) {
                    firstOperator = currResult
                } else if (operator && currResult) {
                    let total;
                    const secondOperator = parseFloat(currResult)
                    const firstNum = parseFloat(firstOperator)
                    switch (operator) {
                        case '+':
                            total = firstNum + secondOperator;
                            break;
                        case '-':
                            total = firstNum - secondOperator;
                            break;
                        case '*':
                            total = firstNum * secondOperator;
                            break;
                        case '/':
                            total = firstNum / secondOperator;
                            break;
                        case '%':
                            total = firstNum * (secondOperator / 100)
                            break;
                    }
                    firstOperator = total.toString()
                 }
            operator = num
            currResult = ''
            updateDisplay()
        }
            
        }
    })
})

function updateDisplay() {
    if (operator) {
        display.value = `${firstOperator} ${operator} ${currResult}`
    } else if (firstOperator) {
        display.value = `${firstOperator} ${operator}`
    } else {
        display.value = currResult
    }
}