export default class Calculator {
    constructor() {
        if (!this.vars()) return false;
        this.setupEvents();
    }

    vars() {
        this.selectors = {
            resetBtn: ".calc-output__reset",
            billBtn: ".calc-input__input-bill",
            peopleBtn: ".calc-input__input-people",
            radioInputsBtns: ".calc-input__selection",
            customInputBtn: ".calc-input__textarea",
            fieldset: ".calc-input__tip-percentage",
            tipAmountDisplay: ".calc-output__tip-display",
            totalAmountDisplay: ".calc-output__total-display",
        };

        this.resetBtn = document.querySelector(this.selectors.resetBtn);
        this.billBtn = document.querySelector(this.selectors.billBtn);
        this.peopleBtn = document.querySelector(this.selectors.peopleBtn);
        this.radioInputsBtns = document.querySelectorAll(
            this.selectors.radioInputsBtns
        );
        this.customInputBtn = document.querySelector(
            this.selectors.customInputBtn
        );
        this.fieldset = document.querySelector(this.selectors.fieldset);
        this.tipAmountDisplay = document.querySelector(
            this.selectors.tipAmountDisplay
        );
        this.totalAmountDisplay = document.querySelector(
            this.selectors.totalAmountDisplay
        );

        if (
            !this.resetBtn ||
            !this.billBtn ||
            !this.peopleBtn ||
            !this.radioInputsBtns ||
            !this.customInputBtn ||
            !this.fieldset ||
            !this.tipAmountDisplay ||
            !this.totalAmountDisplay
        )
            return false;
        return true;
    }

    setupEvents() {
        this.resetBtn.addEventListener("click", () => {
            this.reset();
        });
        this.billBtn.addEventListener("input", () => {
            this.calculate(this.getPct());
        });
        this.peopleBtn.addEventListener("input", () => {
            this.calculate(this.getPct());
        });
        Array.from(this.radioInputsBtns).forEach((input) =>
            input.addEventListener("click", () => {
                this.calculate(this.getPct());
            })
        );
        this.customInputBtn.addEventListener("input", () => {
            this.customButton();
            const value = this.customInputBtn.value;
            this.calculate(value);
        });
    }

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
        const bill = this.billBtn.value;
        if (bill === "" || bill === NaN || bill === "undefined") {
            return 0;
        } else {
            return bill;
        }
    }

    getPct() {
        const [inputChecked] = Array.from(this.radioInputsBtns).filter(
            (input) => input.checked === true
        );
        if (inputChecked) {
            const pct = inputChecked.getAttribute("value");
            return pct;
        }
        if (!inputChecked) {
            const custom =
                this.fieldset.lastElementChild.lastElementChild.value;
            if (custom !== "") {
                return custom;
            } else return 0;
        }
    }

    getPeople() {
        const people = this.peopleBtn.value;
        if (people === "") {
            return 0;
        } else {
            return people;
        }
    }

    customButton() {
        this.radioInputsBtns.forEach((input) => (input.checked = false));
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
        this.tipAmountDisplay.innerText = `$${tipDisplay}`;
    }

    displayTotal(total) {
        const totalDisplay = this.convertToDisplay(total);
        this.totalAmountDisplay.innerText = `$${totalDisplay}`;
    }

    reset() {
        this.billBtn.value = "";
        this.radioInputsBtns.forEach((input) => (input.checked = false));
        this.customInputBtn.value = "";
        this.peopleBtn.value = "";
        this.tipAmountDisplay.innerText = "$0.00";
        this.totalAmountDisplay.innerText = "$0.00";
    }
}
