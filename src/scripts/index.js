import { calculator } from './calculator';
import '../styles/style.scss';

const Init = () => {
    const buttonInputs = document.getElementsByClassName("button");
    const inputScreen = document.getElementById("inputScreen");
    const prevInputScreen = document.getElementById("prevInputScreen");
    let pressedEqual = false;
    Array.prototype.forEach.call(buttonInputs, (button) => {
        button.addEventListener("click", () => {
            const btnClasses = button.classList;
            if (/syntax/gi.test(inputScreen.innerHTML) || pressedEqual) {
                pressedEqual = false;
                inputScreen.innerHTML = "";
                if (inputScreen.classList.contains("errorMsg")) inputScreen.classList.toggle("errorMsg");
            }
            if (btnClasses.contains("concatable")) {
                inputScreen.innerHTML = inputScreen.innerHTML + button.innerHTML;
            }
            else if (btnClasses.contains("equalButton")) {
                prevInputScreen.innerHTML = inputScreen.innerHTML;
                let newNumber = calculator(inputScreen.innerHTML);
                if (/syntax/gi.test(newNumber)) inputScreen.classList.toggle("errorMsg")
                else newNumber = /\./.test(newNumber) ? parseFloat(newNumber).toFixed(2) : newNumber;
                inputScreen.innerHTML = newNumber;
                pressedEqual = true;
            }
            else if (btnClasses.contains("clearButton")) inputScreen.innerHTML = "";
            else if (btnClasses.contains("backspaceButton")) {
                const backspacedOp = inputScreen.innerHTML.split("");
                backspacedOp.pop();
                inputScreen.innerHTML = backspacedOp.join("");
            }
        });
    })
}

window.addEventListener('load', Init, false);
