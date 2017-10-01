const keys = {
  q: 81,
  w: 87,
  e: 69,
  r: 82,
  t: 84,
  y: 89,
  u: 85,
  i: 73,
  o: 79,
  p: 80,
  a: 65,
  s: 83,
  d: 68,
  f: 70,
  g: 71,
  h: 72,
  j: 74,
  k: 75,
  l: 76,
  z: 90,
  x: 88,
  c: 67,
  v: 86,
  b: 66,
  n: 78,
  m: 77
}

const shuffle = (lst) => {
  const swapped = (lst, iFrom, iTo) => {
    let [iLow, iHigh] = iTo > iFrom ? (
      [iFrom, iTo]
    ) : [iTo, iFrom];
    return iLow !== iHigh ? (
      [].concat(
        (iLow > 0 ? lst.slice(0, iLow) : []), // pre
        lst[iHigh], // DOWN
        lst.slice(iLow + 1, iHigh), // mid
        lst[iLow], // UP
        lst.slice(iHigh + 1) // post
      )
    ) : lst.slice(0) // (unchanged copy)
  };
  const randomInteger = (low, high) =>
    low + Math.floor(
      (Math.random() * ((high - low) + 1))
    );
  const range = (m, n, step) => {
    let d = (step || 1) * (n >= m ? 1 : -1);
    return Array.from({
      length: Math.floor((n - m) / d) + 1
    }, (_, i) => m + (i * d));
  };
  let lng = lst.length;

  return lng ? range(0, lng - 1)
    .reduceRight((a, i) => {
      let iRand = i > 0 ? randomInteger(0, i) : 0;
      return i !== iRand ? swapped(a, i, iRand) : a;
    }, lst) : [];
};


export {
  keys,
  shuffle
}
