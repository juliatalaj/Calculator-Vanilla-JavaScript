class Calculator {
  constructor(previousNumber, currentNumber) {
    this.currentNumber = currentNumber;
    this.previousNumber = previousNumber;
    this.clear();
  }

  clear() {
    this.currentOperation = "";
    this.previousOperation = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperation = this.currentOperation.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperation.includes(".")) return;
    this.currentOperation =
      this.currentOperation.toString() + number.toString();
  }

  updateResult() {
    this.currentNumber.innerText = this.currentOperation;

    if (this.operation != null) {
      this.previousNumber.innerText = this.previousOperation + this.operation;
    } else {
      this.previousNumber.innerText = "";
    }
  }

  chooseOperation(operation) {
    if (this.currentOperation === "") return;

    if (this.previousOperation !== "") {
      this.calculate();
    }

    this.operation = operation;
    this.previousOperation = this.currentOperation;
    this.currentOperation = "";
  }

  calculate() {
    let calculation;

    const previous = parseFloat(this.previousOperation);
    const current = parseFloat(this.currentOperation);

    if (isNaN(previous) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        calculation = previous + current;
        break;
      case "−":
        calculation = previous - current;
        break;
      case "×":
        calculation = previous * current;
        break;
      case "÷":
        if (
          this.currentOperation === "0" ||
          this.currentOperation === Infinity
        ) {
          return (this.currentOperation = "Error!");
        } else {
          calculation = previous / current;
        }
        break;
      default:
        return;
    }
    this.currentOperation = calculation;
    this.operation = undefined;
    this.previousOperation = "";
  }
}

const previousNumber = document.querySelector(".previous-number");
const currentNumber = document.querySelector(".current-number");
const clearBtn = document.querySelector(".clear-btn");
const deleteBtn = document.querySelector(".delete-btn");
const divideBtn = document.querySelector(".divide-btn");
const numbers = document.querySelectorAll(".number");
const multiplyBtn = document.querySelector(".multiply-btn");
const subtractBtn = document.querySelector(".subtract-btn");
const addBtn = document.querySelector(".add-btn");
const equalsBtn = document.querySelector(".equals-btn");
const operators = document.querySelectorAll(".operator");
const zero = document.querySelector(".zero");

const calculator = new Calculator(previousNumber, currentNumber);

for (const number of numbers) {
  number.addEventListener("click", () => {
    calculator.appendNumber(number.innerText);
    calculator.updateResult();
  });
}

for (const operator of operators) {
  operator.addEventListener("click", () => {
    calculator.chooseOperation(operator.innerText);
    calculator.updateResult();
  });
}

equalsBtn.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateResult();
});

clearBtn.addEventListener("click", () => {
  calculator.clear();
  calculator.updateResult();
});

deleteBtn.addEventListener("click", () => {
  calculator.delete();
  calculator.updateResult();
});
