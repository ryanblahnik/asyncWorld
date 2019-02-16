console.log('xx: ', Date.now());

const delayed = () => {
  return setTimeout(function() {
    console.log(`3: 'no'`);
    // console.log(Date.now());
  }, 1000)
}

const weird = () => {
  return new Promise((resolve, reject) => {
    return setTimeout(function() {
      console.log(`11: 'no'`);
      // console.log("line 51 would never complete\n" +
      //   "if we don't resolve or reject");
      resolve('14: rejected');
      reject('15: resolved');
    }, 1000);
  });
};

const promised = () => {
  return new Promise((resolve, reject) => {
    return setTimeout(function() {
      resolve(`23: 'no'`);
      reject('nono');
    }, 1000);
  });
};

// weird()
//   .then((data) => console.log('30: ', data))
//   .catch((err) => console.log('31: ', err));

// const array = [weird(), promised()];
// console.log(array);

// Promise.all(array)
//   .then((results) => {
//     console.log('results received');
//     results.forEach((result) => console.log(result))
//     console.log('results logged');
//     console.log(array);
//     console.log('array logged');
//   })
//   .catch(console.log);

const example = async () => {
  console.log('47: ', Date.now());
  try {
    const value0 = await weird();
    console.log('value0 (50): ', value0);
  } catch(err) {
    console.log('err (52): ', err);
  }
  const value = await promised();
  console.log(value);
  console.log('56: ', Date.now());
};

// example();

const oldStyle = (callback) => {
  console.log('64: welcome back');
  let err = null;
  let data = null;
  if (Math.random() < 0.5) {
    err = 'noo';
  } else {
    data = 'winner';
  }
  if (err) return callback(err, null);
  return callback(null, data);
};

oldStyle((err, data) => {
  if (err) return console.error('77:', err);
  return console.log('78: Yes!! ', data);
});

// console.log('81: ', Date.now());

const makeNewStyle = (fn) => {
  return function() {
    return new Promise((resolve, reject) => {
      let args = Array.from(arguments);
      let cbHandling = (err, data) => {
        if (err) return reject('88: ' + err);
        return resolve('89: ' + data);
      };
      args.push(cbHandling);
      return fn(...args);
    });
  };
};

console.log('97: ', Date.now());
const newStyle = makeNewStyle(oldStyle);

newStyle()
  .then((data) => console.log('01: ', data, '\n^^: ', Date.now()))
  .catch((err) => console.error('02: ', err, '\n^^: ', Date.now()));

console.log('04: ', Date.now());