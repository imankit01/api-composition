console.log('starting app');

setTimeout(() => {
  console.log('inside of callback');
},2000);

setTimeout(() => {
  console.log('inside another callback')
}, 0000);

console.log('finishing app');
