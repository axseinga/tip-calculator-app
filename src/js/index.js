import("./../sass/main.scss");

import Calculator from "./calc.js";

document.addEventListener("DOMContentLoaded", init);

function init() {
    const calculator = new Calculator();
    const resetButton = document.querySelector(".calc-output__reset");
    resetButton.addEventListener("click", calculator.reset);
    const billBtn = document.querySelector(".calc-input__input-bill");
    billBtn.addEventListener("keyup", () => {
        calculator.calculate(calculator.getPct());
    });
    const peopleBtn = document.querySelector(".calc-input__input-people");
    peopleBtn.addEventListener("keyup", () => {
        calculator.calculate(calculator.getPct());
    });
    const radioInputsBtns = document.querySelectorAll(".calc-input__selection");
    Array.from(radioInputsBtns).forEach((input) =>
        input.addEventListener("click", () => {
            calculator.calculate(calculator.getPct());
        })
    );
    const customInputBtn = document.querySelector(".calc-input__textarea");
    customInputBtn.addEventListener("keyup", () => {
        calculator.customButton();
        const value = customInputBtn.value;
        calculator.calculate(value);
    });
}
