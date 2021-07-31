export default class Calculator {
    getTotal() {
        const bill = this.getBill();
        //const pct = this.getPct();
        const people = this.getPeople();
        const total = this.calcTotal(bill, 20, people);
        this.displayTotal(total);
    }

    getBill() {
        const billInput = document.querySelector(".calc-input__input-bill");
        const bill = billInput.value;
        console.log(bill);
        return bill;
    }

    getCustomPct() {
        const radioCustomInput = document.querySelector(
            ".calc-input__textarea"
        );
        radioCustomInput.addEventListener("keyup", function () {
            const pct = radioCustomInput.value;
            console.log(pct);
            return pct;
        });
    }

    getPct() {
        const fieldset = document.querySelector(".calc-input__tip-percentage");
        fieldset.addEventListener("click", function (e) {
            const target = e.target;
            if (target.tagName === "INPUT") {
                const pct = target.getAttribute("value");
                if (pct === null) {
                    console.log(this);
                    getCustomPct();
                }
                if (pct !== null) {
                    console.log(pct);
                    return pct;
                }
            }
        });
    }

    getPeople() {
        const peopleInput = document.querySelector(".calc-input__input-people");
        const people = peopleInput.value;
        if (people <= 0) {
            console.log("za malo ludzi");
            return;
        } else {
            console.log(people);
            return people;
        }
    }

    customButton() {
        const radioInputs = document.querySelectorAll(".calc-input__selection");
        radioInputs.forEach((input) => (input.checked = false));
    }

    calcTip(bill, pct, people) {
        const tip = (bill * pct) / 100 / people;
        console.log(tip);
        return tip;
    }

    calcTotal(bill, pct, people) {
        const total = bill / people + this.calcTip(bill, pct, people);
        console.log(total);
        return total;
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
