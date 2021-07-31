import("./../sass/main.scss");

import Calculator from "./calc.js";

document.addEventListener("DOMContentLoaded", init);

function init() {
    const calculator = new Calculator();
    const resetButton = document.querySelector(".calc-output__reset");
    resetButton.addEventListener("click", calculator.reset);
    const billBtn = document.querySelector(".calc-input__input-bill");
    billBtn.addEventListener("keyup", () => {
        calculator.getTotal();
    });
}
