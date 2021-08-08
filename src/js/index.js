import("./../sass/main.scss");

import Calculator from "./calc.js";

document.addEventListener("DOMContentLoaded", init);

function init() {
    const calculator = new Calculator();
    const resetButton = document.querySelector(".calc-output__reset");
    resetButton.addEventListener("click", calculator.reset);
    const billBtn = document.querySelector(".calc-input__input-bill");
    billBtn.addEventListener("keyup", () => {
        calculate(calculator);
    });
    const peopleBtn = document.querySelector(".calc-input__input-people");
    peopleBtn.addEventListener("keyup", () => {
        calculate(calculator);
    });
    const radioInputs = document.querySelectorAll(".calc-input__selection");
    Array.from(radioInputs).forEach((input) =>
        input.addEventListener("click", () => {
            calculate(calculator);
        })
    );
}

function calculate(calculator) {
    const bill = calculator.getBill();
    const pct = calculator.getPct();
    const people = calculator.getPeople();
    const tip = calculator.calcTip(bill, pct, people);
    const total = calculator.calcTotal(bill, pct, people);
    calculator.displayTip(tip);
    calculator.displayTotal(total);
}
