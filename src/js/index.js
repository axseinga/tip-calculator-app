import("./../sass/main.scss");

import Calculator from "./calc.js";

document.addEventListener("DOMContentLoaded", init);

function init() {
    const calculator = new Calculator();
    const resetButton = document.querySelector(".calc-output__reset");
    resetButton.addEventListener("click", calculator.reset);
    const billBtn = document.querySelector(".calc-input__input-bill");
    billBtn.addEventListener("keyup", () => {
        calculate(calculator, calculator.getPct());
    });
    const peopleBtn = document.querySelector(".calc-input__input-people");
    peopleBtn.addEventListener("keyup", () => {
        calculate(calculator, calculator.getPct());
    });
    const radioInputsBtns = document.querySelectorAll(".calc-input__selection");
    Array.from(radioInputsBtns).forEach((input) =>
        input.addEventListener("click", () => {
            calculate(calculator, calculator.getPct());
        })
    );
    const customInputBtn = document.querySelector(".calc-input__textarea");
    customInputBtn.addEventListener("keyup", () => {
        console.log("change in textarea");
        calculator.customButton();
        const value = customInputBtn.value;
        calculate(calculator, value);
    });
}

function calculate(calculator, calcPctFn) {
    const bill = calculator.getBill();
    const pct = calcPctFn;
    const people = calculator.getPeople();
    const tip = calculator.calcTip(bill, pct, people);
    const total = calculator.calcTotal(bill, pct, people);
    calculator.displayTip(tip);
    calculator.displayTotal(total);
}
