const screen = document.querySelector('.screen');
let buffer = '0';
let total = 0;
let operator = null;

document.querySelector('.cal-buttons').addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON') {
        defineButton(event.target.innerText);
    }
});

function defineButton (button) {
    if (isNaN(button)) {
        handleSymbol(button);
    } else {
        handleNumber(button)
    }
    screen.innerText = buffer;
}

function handleNumber (buttonValue) {
    if (buffer === '0') {
        buffer = buttonValue;
    } else {
        buffer += buttonValue;
    }
}

function handleSymbol (buttonValue) {
    switch (buttonValue) {
        case 'C':
            // clear all
            buffer = '0';
            operator = null;
            total = 0;
            break;
        case '←':
            // backspace
            if (buffer.length > 1) {
                buffer = buffer.slice(0, -1);
            } else {
                buffer = '0';
            }
            break;
        case '=':
            // equal
            // take the second number after make it a number and pass it to handleMath fn
            handleMath(parseInt(buffer));
            buffer = total.toString();
            operator = null;
            total = 0;
            break;
        default:
            handleOperation(buttonValue);
    }
}

function handleOperation(buttonValue) {
    let intBuffer = parseInt(buffer);
    if (total === 0) {
        total = intBuffer;
    } else {
        handleMath(intBuffer);
    }
    operator = buttonValue;
    buffer = '0';
}

function handleMath(intBuffer) {
    switch (operator) {
        case '+':
            total += intBuffer;
            break;

        case '-':
            total -= intBuffer;
            break;

        case '×':
            total *= intBuffer;
            break;

        case '÷':
            total /= intBuffer;
            break;
    }
}
