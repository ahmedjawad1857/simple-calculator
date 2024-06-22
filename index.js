let display = document.getElementById("inputBox");
let buttons = document.querySelectorAll("button");
let buttonsArray = Array.from(buttons);
let string = "";

buttonsArray.forEach((item) => {
  item.addEventListener("click", function (e) {
    let buttonValue = e.target.innerHTML;

    if (buttonValue === "DEL") {
      if (display.value === "Error" || display.value === "Infinity") {
        string = "";
      } else {
        string = string.substring(0, string.length - 1);
      }
      display.value = string;
    } else if (buttonValue === "AC") {
      string = "";
      resultDisplay.textContent = "";
      display.value = string;
    } else if (buttonValue === "=") {
      try {
        string = string.replace(/(\d+)%/g, "($1/100)");
        string = eval(string);

        if (string === Infinity || string === -Infinity) {
          string = "Infinity";
        } else {
          resultCalculated = true;
          resultDisplay.textContent = string;
        }
      } catch (err) {
        string = "Format Error";
      }
      display.value = string;
    } else {
      if (display.value === "Format Error" || display.value === "Infinity") {
        string = "";
      }

      if (resultCalculated) {
        if (["+", "-", "*", "/"].includes(buttonValue)) {
          string = display.value + buttonValue;
        } else {
          string = buttonValue;
        }
        resultCalculated = false;
        resultDisplay.textContent = "";
      } else {
        let lastChar = string.slice(-1);

        if (["+", "-", "*", "/"].includes(buttonValue)) {
          if (["+", "-", "*", "/"].includes(lastChar)) {
            if (
              (buttonValue === "-" && (lastChar === "*" || lastChar === "/")) ||
              (buttonValue === "+" && (lastChar === "*" || lastChar === "/"))
            ) {
              string += buttonValue;
            } else {
              string = string.slice(0, -1) + buttonValue;
            }
          } else {
            string += buttonValue;
          }
        } else {
          if (string === "" && buttonValue === "0") {
            return;
          }

          if (string === "0" && buttonValue === "0") {
            return;
          }

          if (
            ["+", "-", "*", "/"].includes(lastChar) &&
            buttonValue === "0" &&
            string.slice(-2) === "0" + buttonValue
          ) {
            return;
          }

          string += buttonValue;
        }
      }

      display.value = string;
    }
  });
});
