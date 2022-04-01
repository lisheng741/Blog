# ES6



## 概要

ECMA国际

ES6指的是ECMAScript5.1以后的版本，从ECMAScript2015（简称ES2015）开始

Babel转码器：可以将ES6代码转为ES5代码，从而在老版本的浏览器执行。



## ES6 语法

解构赋值

... 扩展运算符

... 剩余运算符

`` 字符串模板



### 数据类型

Number、String、Boolean、Object、null、undefined

ES6 新增 Symbol



### let、constant 关键字

1、只在代码块内有效

2、会造成暂时性死区（在变量**定义之前**使用变量，会报错）



### 解构赋值

数组（Array）、对象（Object）



### ES6 模块

使用 import 来引入模块

```js
import Vue from 'vue'
import { str, f } from 'demo'
```

使用 export 导出模块

```js
//demo.js
export const str = 'hello world'

export function f(){
    return 'hello world'
}

export default { str, f }
```



### Promise 对象

三种状态：pending、fulfilled、rejected

then 方法：回调方式异步，不会阻塞后续代码

```js
const p = new Promise(function(resolve, reject){
    resolve(1)
})
p.then(function(res){
    console.log(res)
})
console.log(2)
//输出顺序
//2
//1
```



### async/await

async 标记的函数表示返回一个 Promise 对象

await

Promise 对象：await 暂停执行，等待 Promise 对象 resolve，然后恢复 async 函数的执行并返回解析值

非 Promise 对象：直接返回对应的值

```js
async function promiseFunction(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('4')
            resolve()
        }, 0)
    })
}
console.log(1)
await (() => { //这里 await 的不是 Promise 对象，直接返回
    setTimeout(() => {
        console.log(2)
    }, 0)
})()
console.log(3)
await promiseFunction()
console.log(5)
//执行顺序
//1
//3 
//2  -- await 的不是 Promise 对象，直接返回，故而2延时0秒在3之后显示
//4  -- await 的是 Promise 对象，等待返回，故而5在4之后
//5
```

