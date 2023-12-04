function add(a, b) {
  return a + b;
}
function substract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  if (b === 0) return 'lmao'
  else return a / b;
}
function operate(a, b, operator) {
  return operator(a, b)
}

// my stuff

function updateInput(a = '', b = '', op = '') {
  if (a !== '') input.dataset.a += a;
  if (b !== '') input.dataset.b += b;
  if (op !== '') input.dataset.op = op;
  updateInputDisplay();
}

function clearInput() {
  input.dataset.a = '';
  input.dataset.b = '';
  input.dataset.op = '';
}

function updateInputDisplay() {
  input.value = input.dataset.a + getOperatorSymbol(input.dataset.op) + input.dataset.b;
  display.textContent = input.value;
}

function getOperatorSymbol(operator) {
  if (operator === 'add') return '+';
  else if (operator === 'substract') return '-';
  else if (operator === 'multiply') return 'x';
  else if (operator === 'divide') return '÷';
  else return '';
}

function solve() {
  let num1 = input.dataset.a;
  let num2 = input.dataset.b;
  let op = input.dataset.op;
  if (num1 !== '' && num2 !== '' && op !== '') {
    const result = operate(+num1, +num2, window[op]);
    input.value = result;
    display.textContent = result;
    clearInput()
    if (result !== 'lmao') {
      input.dataset.a = result;
    }
  }
}

const input = document.querySelector('#input');
const display = document.querySelector('#display');
const btnNumbers = document.querySelectorAll('button.num');
const btnOperators = document.querySelectorAll('button.operator');
const btnEqual = document.querySelector('#equal');
const btnClear = document.querySelector('#clear');

btnClear.addEventListener('click', () => {
  clearInput();
  updateInputDisplay()
})

btnNumbers.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (input.dataset.op === '') updateInput(btn.textContent, '', '');
    else updateInput('', btn.textContent, '');
  })
});

btnOperators.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (input.dataset.a === '') updateInput('0', '', btn.id);
    updateInput('', '', btn.id);
  })
});

btnEqual.addEventListener('click', () => {
  solve();
});