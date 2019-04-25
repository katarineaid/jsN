console.log(calc("1", "2", "+", "3"));


function calc(firstNumber, secondNumber, operation, result) {
  firstNumber = parseInt(firstNumber);
  secondNumber = parseInt(secondNumber);
  result = parseInt(result);

  const funcOperation = {
    "+": (x, y) => x + y,
    "-": (x, y) => x - y,
    "*": (x, y) => x * y,
    "/": (x, y) => x / y,
  };

  const func = funcOperation[operation];

  return func(firstNumber, secondNumber) === result

}