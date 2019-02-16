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
      console.log(`line 30 will never complete if we don't resolve or reject`);
      reject('resolved');
    }, 1000);
  });
};

const promised = () => {
  return new Promise((resolve, reject) => {
    return setTimeout(function() {
      resolve(`19: 'no'`);
      reject('nono');
    }, 1000);
  });
};

// delayed();

const example = async () => {
  console.log('28: ', Date.now());
  try {
    const value0 = await weird();
    console.log('value0: ', value0);
  } catch(err) {
    console.log('err: ', err);
  }
  const value = await promised();
  console.log(value);
  console.log('33: ', Date.now());
};

example();