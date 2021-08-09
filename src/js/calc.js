export default class Calculator {
    calculate(calcPctFn) {
        const bill = Number(this.getBill());
        const pct = Number(calcPctFn);
        const people = Number(this.getPeople());
        const tip = this.calcTip(bill, pct, people);
        const total = this.calcTotal(bill, pct, people);
        this.displayTip(tip);
        this.displayTotal(total);
    }

    getBill() {
        const billInput = document.querySelector(".calc-input__input-bill");
        const bill = billInput.value;
        if (bill === "" || bill === NaN || bill === "undefined") {
            return 0;
        } else {
            return bill;
        }
    }

    getPct() {
        const radioInputs = document.querySelectorAll(".calc-input__selection");
        const [inputChecked] = Array.from(radioInputs).filter(
            (input) => input.checked === true
        );
        if (inputChecked) {
            const pct = inputChecked.getAttribute("value");
            return pct;
        }
        if (!inputChecked) {
            const fieldset = document.querySelector(
                ".calc-input__tip-percentage"
            );
            const custom = fieldset.lastElementChild.lastElementChild.value;
            if (custom !== "") {
                return custom;
            } else return 0;
        }
    }

    getPeople() {
        const peopleInput = document.querySelector(".calc-input__input-people");
        const people = peopleInput.value;
        if (people === "") {
            return 0;
        } else {
            return people;
        }
    }

    customButton() {
        const radioInputs = document.querySelectorAll(".calc-input__selection");
        radioInputs.forEach((input) => (input.checked = false));
    }

    calcTip(bill, pct, people) {
        if (pct === 0 || people === 0) {
            return 0;
        } else {
            const tip = (bill * pct) / 100 / people;
            const tipRound = Math.round(tip * 100) / 100;
            return tipRound;
        }
    }

    calcTotal(bill, pct, people) {
        if (bill === 0) {
            const total = 0;
            return total;
        }

        if (people === 0 || people === "") {
            const total = +bill;
            return total;
        }

        if (pct === 0 && people > 0) {
            const total = +bill / +people;
            const totalRound = Math.round(total * 100) / 100;
            return totalRound;
        }
        if (people === 0 && pct > 0) {
            const total = 0;
            return total;
        }

        if (pct === 0 && people === 0) {
            const total = 0;
            return total;
        } else {
            const tip = this.calcTip(+bill, +pct, +people);
            const total = bill / people + +tip;
            const totalRound = Math.round(total * 100) / 100;
            return totalRound;
        }
    }

    convertToDisplay(num) {
        const newNum = num.toFixed(
            Math.max(((num + "").split(".")[1] || "").length, 2)
        );
        return newNum;
    }

    displayTip(tip) {
        const tipDisplay = this.convertToDisplay(tip);
        const tipAmountDisplay = document.querySelector(
            ".calc-output__tip-display"
        );
        tipAmountDisplay.innerText = `$${tipDisplay}`;
    }

    displayTotal(total) {
        const totalDisplay = this.convertToDisplay(total);
        const totalAmountDisplay = document.querySelector(
            ".calc-output__total-display"
        );
        totalAmountDisplay.innerText = `$${totalDisplay}`;
    }

    reset() {
        const billInput = document.querySelector(".calc-input__input-bill");
        const radioCustomInput = document.querySelector(
            ".calc-input__textarea"
        );
        const peopleInput = document.querySelector(".calc-input__input-people");
        const radioInputs = document.querySelectorAll(".calc-input__selection");
        const totalAmountDisplay = document.querySelector(
            ".calc-output__total-display"
        );
        const tipAmountDisplay = document.querySelector(
            ".calc-output__tip-display"
        );
        billInput.value = "";
        radioInputs.forEach((input) => (input.checked = false));
        radioCustomInput.value = "";
        peopleInput.value = "";
        tipAmountDisplay.innerText = "$0.00";
        totalAmountDisplay.innerText = "$0.00";
    }
}
