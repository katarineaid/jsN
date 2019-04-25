console.log(groupWeeks([
  { date: '2019-04-08', count: 10 },
  { date: '2019-04-10', count: 23 },
  { date: '2019-04-22', count: 5 },
]));

function groupWeeks(array) {
  const reducer = (prev, curr) => {

    let [y, m, d] = curr.date.split('-');
    y = parseInt(y);
    m = parseInt(m);
    d = parseInt(d);

    const startDay = JDN2DA(JDN(y, m, d) - ZellerISOWeekday(y, m, d));

    const newRecord = {
      [startDay]: (prev[startDay] || 0) + curr.count
    };

    return Object.assign({}, prev, newRecord)
  };

  const obj = array.reduce(reducer, {});

  let response=[];

  for (let key in obj) {
    response.push({
      weekStart:key, count:obj[key]
    })
  }

  return response
}

function JDN(year, month, day) {
  const a = Math.floor((13 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 2;

  return day + Math.floor((153 * m + 2) / 5) +
    365 * y + Math.floor(y / 4) -
    Math.floor(y / 100) + Math.floor(y / 400) - 32045;

}

function ZellerISOWeekday(year, base0month, day) {
  let shift = base0month + 1;
  if (shift <= 3) {
    shift += 12;
    year -= 1
  }

  return (day + Math.floor(shift * 2.6) +
    year + Math.floor(year / 4) +
    6 * Math.floor(year / 100) +
    Math.floor(year / 400) - 2) % 7

}

function JDN2DA(JDN) {
  const y = 4716, v = 3, j = 1401, u = 5, m = 2, s = 153,
    n = 12, w = 2, r = 4, B = 274277, p = 1461, C = -38;
  const f = JDN + j + Math.floor((Math.floor((4 * JDN + B) / 146097) * 3) / 4) + C;
  const e = r * f + v;
  const g = Math.floor((e % p) / r);
  const h = u * g + w;
  const D = Math.floor((h % s) / u) + 1;
  const M = ((Math.floor(h / s) + m) % n) + 1;
  const Y = Math.floor(e / p) - y + Math.floor((n + m - M) / n);

  const month = (M - 1) < 10 ? `0${M - 1}` : M - 1;
  const day = D < 10 ? `0${D}` : D;

  return `${Y}-${month}-${day}`;

}
