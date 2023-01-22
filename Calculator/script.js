class Calculator{
    constructor(prevOperandTextElement, currentOperandTextElement)
    {
        this.prevOperandTextElement = prevOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
        
    }

    clear()
    {
        this.currentOperand = ''
        this.prevOperand = ''
        this.operation = undefined
    }
    delete()
    {
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }
    appendNumber(number)
    {
        if(number === '.' && this.currentOperand.includes('.'))
        {
            return
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperation(operation)
    {
        this.operation = operation
        if(this.currentOperand === '') return
        if(this.prevOperand !== '')
        {
            this.compute()
        }
        this.prevOperand = this.currentOperand.toString() + ' ' + operation
        this.currentOperand = ''
    }
    compute()
    {
        let computation
        const previous = parseFloat(this.prevOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(previous) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = current + previous;
                break;
            case '-':
                computation = previous - current;
                break;
            case '*':
                computation= previous * current;
                break;
            case '÷':
                computation = previous / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation
        this.operation = undefined;
        this.prevOperand = '';
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }
    updateDisplay()
    {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.prevOperandTextElement.innerText =
                `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`
        } else {
            this.prevOperandTextElement.innerText = ''
        }
        
    }
}

const numberButton = document.querySelectorAll('[data-number]');
const operationButton = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const AllClearButton = document.querySelector('[data-clear]');
const prevOperandTextElement = document.querySelector('[data-prev-text]')
const currentOperandTextElement = document.querySelector('[data-current-text]')

const calculator = new Calculator(prevOperandTextElement,currentOperandTextElement)


numberButton.forEach(button => {

    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })

})

operationButton.forEach(button => {
    button.addEventListener('click', ()=> {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click' , ()=>{
    calculator.compute()
    calculator.updateDisplay()
 
})
AllClearButton.addEventListener('click' , ()=>{
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click', ()=>{
    calculator.delete()
    calculator.updateDisplay()
})