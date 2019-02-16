console.log('xx: ', Date.now());

const delayed = () => {
  return setTimeout(function() {
    console.log(`5: 'no'`);
    // console.log(Date.now());
  }, 1000)
}

const weird = () => {
  return new Promise((resolve, reject) => {
    return setTimeout(function() {
      // console.log(`13: 'no'`);
      // console.log("line 51 would never complete\n" +
      //   "if we don't resolve or reject");
      resolve(`16:  'rejected'`);
      reject(`17:  'resolved'`);
    }, 1000);
  });
};

const promised = () => {
  return new Promise((resolve, reject) => {
    return setTimeout(function() {
      resolve(`25:  'no'`);
      reject('nono');
    }, 1000);
  });
};

// weird()
//   .then((data) => console.log('30: ', data))
//   .catch((err) => console.log('31: ', err));

// const array = [weird(), promised()];
const array02 = [];
// console.log(array); // Promises <pending>

// Promise.all(array)
//   .then((results) => {
//     // console.log('results received');
//     results.forEach((result) => {
//       console.log(result)
//       array02.push(result);
//     });
//     // console.log('results logged');
//     // console.log(array);
//     // console.log('array logged');
//   })
//   .catch(console.error);

const example = async () => {
  console.log('53: ', Date.now());
  try {
    const value0 = await weird();
    console.log('value0 (56): ', value0);
  } catch(err) {
    console.log('err (57): ', err);
  }
  const value = await promised();
  console.log(value);
  console.log('62: ', Date.now());
};

// example();

const oldStyle = (callback) => {
  // console.log('68:  welcome back');
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

// oldStyle((err, data) => {
//   if (err) return console.error('77:', err);
//   return console.log('78: Yes!! ', data);
// });

// console.log('81: ', Date.now());

const makeNewStyle = (fn) => {
  return function() {
    return new Promise((resolve, reject) => {
      let args = Array.from(arguments);
      let cbHandling = (err, data) => {
        if (err) return reject('92:  ' + err);
        return resolve('93:  ' + data);
      };
      args.push(cbHandling);
      return fn(...args);
    });
  };
};

// console.log('01: ', Date.now());
const newStyle = makeNewStyle(oldStyle);

// newStyle()
//   .then((data) => console.log('05: ', data, '\n^^: ', Date.now()))
//   .catch((err) => console.error('06: ', err, '\n^^: ', Date.now()));

// console.log('08: ', Date.now());

// setTimeout(() => {
//   console.log(array);
//   console.log(array02);
// }, 3000);

const wrapper = async () => {
  try {
    const output = await newStyle();
    console.log(output);
  } catch (err) {
    console.log(err);
  }
};

wrapper();

console.log('26: ', Date.now());