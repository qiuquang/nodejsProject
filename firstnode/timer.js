setImmediate(() => { // 在下一个队列执行
  console.log('setImmediate');
});

setTimeout(() => {
  console.log('setTimeout');
}, 0)

process.nextTick(() => { // 最快，当前队列队尾
  console.log('nextTick');
})