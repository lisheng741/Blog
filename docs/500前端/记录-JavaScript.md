# JavaScript





## 正则表达式记录

```js
//手机
var mobile = "1234567890";
if(!(/^1[3456789]\d{9}$/.test(mobile))) return false;

//邮箱
var email = "123@qq.com";
if(!(/^([a-zA-Z\d])(\w|\-)+@@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/.test(email))) return false;

//是否单一字符
/^\t*$/.test("\t\t\t");
//补充说明：空字符也为 true

//匹配 4-6位数字
/^20\d{2,4}$/.test("202108")
//匹配 YYYYMM 格式
/^20\d{2}(0[1-9]|1[0-2])*$/.test("202108")
```





## 底层

### 闭包



### 原型链

`__proto__` 并非标准，而是各大Web浏览器要求实现的一个对象属性（[对性能有影响](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)）

ES6标准提供了 `Object.getPrototypeOf()` 和 `Object.setPrototypeOf()` 访问器，等同于 JavaScript 非标准但许多浏览器实现的属性 `__proto__`



### 事件循环机制（Event Loop）



### 宏事件和微事件

宏事件：script，setTimeout，setInterval，

微事件：Promise，async await





## JS 关键字

### new 运算符

new 关键字会进行如下操作：

1. 创建空对象{}
2. 添加属性 `__proto__` ，将该属性链接至构造函数的原型对象
3. this 指向步骤1中创建的对象
4. 如果该函数没有返回对象，则返回 this；存在返回值，则返回返回值





## JS 函数

### call()

改变 this 指向

接受参数列表

```js
function test(param1, param2){
    console.log(this, param1, param2)
}

test(1, 2)
test.call({}, 1, 2)
```



### apply()

改变 this 指向

接受参数数组（与 call 的区别）

```js
function test(param1, param2){
    console.log(this, param1, param2)
}

test(1, 2)
test.apply({}, [1, 2])
```



### bind()

改变 this 指向

返回一个函数

```js
function test(param1, param2){
    console.log(this, param1, param2)
}

test(1, 2)
test.bind({})([1, 2])
```





## JS 特殊写法

### 关于 length 和 toString

```js
123['toString'].length + 123   //124
true['toString'].length + 123  //123
```

#### length 返回内容

1 如果是数组、字符串等有长度的，则返回元素长度

2 如果是 function，则返回函数的形参个数（不含剩余参数、arguments对象）

```js
// 有长度的
[1,2,3].length //3
'123'.length   //3

// 函数
[].splice.length //2
[].slice.length  //2
//splice(start, ?deleteCount, ...items) //接受3个形参，最后一个为剩余参数
//slice(?start, ?end) //接收2个形参
```

3 第2点没有考虑**函数默认参数**的情况，如果函数的形参列表有默认参数的情况，则返回**第一个默认参数**前面的形参个数

```js
function test(p1, p2 = 1, p3, p4 = {}, ...p5){}

test.length  //1
//参数列表中，p2为第一个默认参数，前面只有1个形参，故而返回1
```

#### toString

数值型（Number）的 toString 与其他类型不同

1 Number 的 toString 带了一个形参 radix

2 其他类型无形参

```js
Number.prototype.toString(radix)
```



### 立即执行函数 !function(){}()

function 前面增加符号 ! ~ + - 之类，都是告诉浏览器自动执行这个匿名函数，因为这些符号的运算级别都是高的

(function(){... })() 或 (function(){...}())  也有相同效果



### 带参数的立即执行函数 !function(a){do something……}(jQuery)

形参 a 是 Jquery 对象的别名。

在函数内，$(window) 和 a(windows) 写法是等价的。



### 重写对象方法

```js
const _init = Vue.prototype._init
Vue.prototype._init = function(options = {}){
    //…… //新增动作
    _init.call(this, options) //原方法执行
}
```



### 递归注册（未完成）

```js
register(path, rawModule, runtime = true){
    const newModule = new Module(rawModule, runtime)
    
    if(rawModule.modules){
        forEachValue
    }
}
```



### 函数柯里化

add() 函数

```js
function add(){
    var _collector = [].slice.call(arguments)
    
    var adder = function(){
        _collector.push(...arguments)
        return adder
    }
    adder.toString = function(){
        return _collector.reduce((a, b) => a+b)
    }
    
    return adder
}
```

测试语句

```js
add(1)(2)(3) + 0
add(1,2,3) + 0
```





## 兼容性

### iOS手机 yyyy-MM-dd hh:mm:ss 格式时间显示Nan

```javascript
var date = new Date("2021-06-07 11:11:11").getTime();
```

iOS 真机内置浏览器 Safari 不支持上面的时间格式，在 PC 端调试没有任何问题，但是到了手机上，就 Nan 了

**解决方案**：时间格式改为 yyyy/MM/dd
