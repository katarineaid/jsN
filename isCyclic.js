function isCyclic(obj) {
  let keys = [];
  let stack = [];
  let stackSet = new Set();
  let detected = false;

  function detect(obj, key) {
    if (obj && typeof obj != 'object') { return; }

    if (stackSet.has(obj)) { // it cyclic! Print the object and its locations.
      let oldindex = stack.indexOf(obj);
      let l1 = keys.join('.') + '.' + key;
      let l2 = keys.slice(0, oldindex + 1).join('.');
      console.log('CIRCULAR: ' + l1 + ' = ' + l2 + ' = ' + obj);
      detected = true;
      return;
    }

    keys.push(key);
    stack.push(obj);
    stackSet.add(obj);
    for (let k in obj) { //dive on the object children
      detect(obj[k], k);
    }

    keys.pop();
    stack.pop();
    stackSet.delete(obj);
    return;
  }

  detect(obj, 'obj');
  return detected;
}

let root = {}
let leaf = {'isleaf':true};
let cycle2 = {l:leaf};
let cycle1 = {c2: cycle2, l2:leaf};
cycle2.c1 = cycle1
root.leaf = leaf

 console.log(isCyclic(cycle1)); // returns true, logs "CIRCULAR: obj.c2.c1 = obj"
 //console.log(isCyclic(root));