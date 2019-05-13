const object = {
  a: 2,
  b: '2',
  c: false,
  g: [
    { a: { j: undefined } },
    { a: 2, b: '2', c: true, g: [{ a: { j: undefined } }] },
  ],
};

const other = {
  a: 2,
  b: '2',
  c: false,
  g: [
    { a: { j: undefined } },
    { a: 2, b: '2', c: false, g: [{ a: { j: undefined } }] },
  ],
};


console.log(equalsSimple(object, other));

function equalsSimple(obj, oth) {

  const objOwnPropertyNames = Object.getOwnPropertyNames(obj);
  const objOwnPropertySymbols = Object.getOwnPropertySymbols(obj);

  const objKeys = [...objOwnPropertyNames, ...objOwnPropertySymbols];

  const othOwnPropertyNames = Object.getOwnPropertyNames(oth);
  const othOwnPropertySymbols = Object.getOwnPropertySymbols(oth);

  const othKeys = [...othOwnPropertyNames, ...othOwnPropertySymbols];

  if (objKeys.length === othKeys.length) {

    if (objKeys.join('') === othKeys.join('')) {

      const resp = objKeys.map((key) => {

        if (obj[key] instanceof Array) {
          return equalsSimple(obj[key], oth[key])
        }

        if (typeof obj[key] === 'object') {
          return equalsSimple(obj[key], oth[key])
        }

        if (!(obj[key] instanceof Array) && typeof obj[key] !== 'object' && obj[key] === oth[key]) {
          return true
        }

        return false

      });

      if (!resp.includes(false)) {
        return true
      }

      return false
    }
    return false
  }
  return false
}