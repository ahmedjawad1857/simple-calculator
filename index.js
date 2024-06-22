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
      display.value = string;
    } else if (buttonValue === "=") {
      try {
        // Replace percentage symbol with appropriate division
        string = string.replace(/(\d+)%/g, "($1/100)");
        string = eval(string);

        if (string === Infinity || string === -Infinity) {
          string = "Infinity";
        }
      } catch (err) {
        string = "Error";
      }
      display.value = string;
    } else {
      if (display.value === "Error" || display.value === "Infinity") {
        string = "";
      }

      let lastChar = string.slice(-1);

      // Validate operator sequences
      if (["+", "-", "*", "/"].includes(buttonValue)) {
        if (["+", "-", "*", "/"].includes(lastChar)) {
          // Allow valid combinations like *- or /-
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
        // Prevent adding '00' at the start of a number
        if (string === "" && buttonValue === "0") {
          return; // Ignore the input if it's leading zero
        }

        if (string === "0" && buttonValue === "0") {
          return; // Prevents '00' at the start
        }

        // Prevent 00 after an operator like +00, -00, *00, /00
        if (
          ["+", "-", "*", "/"].includes(lastChar) &&
          buttonValue === "0" &&
          string.slice(-2) === "0" + buttonValue
        ) {
          return;
        }

        string += buttonValue;
      }

      display.value = string;
    }
  });
});
