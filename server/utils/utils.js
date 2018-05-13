export const sleep = async seconds => new Promise(resolve => setTimeout(resolve, seconds * 1000));

export const sequentially = async (array, predicate) => {
  let result;
  for (let i = 0; i < array.length; i += 1) {
    result = await predicate(array[i]); // eslint-disable-line no-await-in-loop
  }
  return result;
};

export const sequentiallyWithResults = async (array, predicate) => {
  const result = [];
  for (let i = 0; i < array.length; i += 1) {
    result.push(await predicate(array[i])); // eslint-disable-line no-await-in-loop
  }
  return result;
};

// Make an index mapping {keyFunctor(element): ValueFunctor(element)} for a given array.
export const makeIndex = (array, keyFunctor, valueFunctor) => {
  const realKeyFunctor = keyFunctor || (e => e);
  const realValueFunctor = valueFunctor || (e => e);
  const map = {};
  array.forEach(element => {
    map[realKeyFunctor(element)] = realValueFunctor(element);
  });
  return map;
};

// Make reversed map of the given array: {element: element_index}.
export const makeReverseMap = array => {
  const map = {};
  array.forEach((element, index) => {
    map[element] = index;
  });
  return map;
};

export function flattenArrayRecursive(arr) {
  return arr.reduce(
    (flat, toFlatten) =>
      flat.concat(Array.isArray(toFlatten) ? flattenArrayRecursive(toFlatten) : toFlatten),
    [],
  );
}

export function isStringJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
