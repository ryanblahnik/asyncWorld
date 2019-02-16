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
      // console.log("line 30 would never complete\n" +
      //   "if we don't resolve or reject");
      reject('14: resolved');
      resolve('15: rejected');
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

// delayed();

const example = async () => {
  console.log('28: ', Date.now());
  try {
    const value0 = await weird();
    console.log('value0 (35): ', value0);
  } catch(err) {
    console.log('err (37): ', err);
  }
  const value = await promised();
  console.log(value);
  console.log('41: ', Date.now());
};

example();