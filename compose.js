const fn = compose([
  x => x - 8,
  x => x ** 2,
  (x, y) => (y > 0) ? (x + 3) : (x - 3)

]);

function compose(fns) {

  return function (...variable) {

    const reducer = (prev, curr) => {
      return [curr(...prev)]
    };

    const result = fns.reduceRight(reducer, variable);


    return result[0];
  };
};
console.log(fn("3", -1));