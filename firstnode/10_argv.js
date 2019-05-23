/*
    argv
    argv0
    execArgv
    execPath
 */

const { argv, argv0, execArgv, execPath } = process;

argv.forEach((item) => {
  console.log(item);
});

console.log(argv0); // argv第一个值的引用

console.log(execArgv) // argv引用前的值

console.log(execPath); // 脚本路径