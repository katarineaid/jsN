console.log(flatten([1, 2, {}, [3, [4], 5], [6, "seven"]]));

function flatten(arr) {

  return arr.reduce((prev, curr) => {
    if (curr instanceof Array) {
      let mass = [...prev];
      const nested = flatten(curr);
      mass = [...mass, ...nested];
      return mass;
    } else {
      prev.push(curr);
      return prev
    }
  }, []);

}