# Vue



### 创建项目

```bash
vue create [项目名称]
```



### Vue构造器，Vue组件，Vue实例

Vue构造器：Vue.extend(options)

Vue组件：Vue.component(id, [definition])

Vue实例：new Vue()

Vue构造器 < Vue组件 < Vue实例

Vue构造器可以成为Vue组件的一部分，如：

```js
var Comp = Vue.extend({
    data(){
        return{ test: ''}
    },
    props: ['msg']
})
var vm = new Comp({
    propsData:{
        msg: 'hello'
    }
})
```

### 不需要响应的数据

```js
Object.freeze()
```

### 生命周期顺序

父beforeCreate -> 父created -> 父beforeMount -> 子beforeCreate -> 子created -> 子beforeMount -> 子mounted -> 父mounted

### 对象新属性、删除属性响应式

```js
// 对象新增属性
Vue.$set(obj, key, value)
this.$set(obj, key, value)
// 对象删除属性
Vue.$delete(obj, key)
this.$delete(obj, key, value)
```







vue模板：

el

data

methods

computed

watch



filters

directives



组件化

数据代理、数据劫持：Object.defineProperty()

虚拟DOM（为了复用真实DOM）



插值语法



原生事件：

绑定属性：`v-bind:`， `:`

`v-model`

绑定事件：`v-on:`，`@`

修饰符：stop，prevent，once，capture

按键别名：enter，delete，esc，tab（只能keydown）

特殊按键-系统修饰键：ctrl，alt，shift，meta（win键）【keyup：按住+其他键，才触发】



自定义事件：

触发自定义事件：this.$emit('handle_name', this.handleFunction)

绑定自定义事件：

this.$refs.componentName.$on()

this.$refs.componentName.$once()

删除自定义事件：this.$off()

```js
this.$off('function_name')
this.$off(['function_name1', 'function_name2'])
```

销毁组件：this.$detroy()

完全销毁一个实例，清理它与其他实例的连接，解绑它的全部指令和事件监听器。

组件原生



计算属性：监听，缓存

监视属性：



绑定class：

```js
//1、字符串写法 //parameter = "class-name"
:class = "parameter"

//2、数组
:class = "['class-name1', 'class-name2']"

//3、对象 //obj:{ class1: false }
:class = "obj"
```



绑定style

```js
//1、对象
:style = "{fontSize:40px}"

//2、对象数组 //ary = [{fontSize:40px}, {color:red}]
:style = "ary"
```



条件渲染：v-show，v-if

列表渲染：v-for（ :key ）【遍历数组、对象、字符串、指定次数】



对数组的监视：~~直接修改数组元素无法实现相应~~

有效监视：push, pop, shift, unshift, splice, sort, reverse



过滤器filters 

```js
{{parameter | filter1('') | filter2}}
```



v-cloak

JS阻塞



v-once

v-pre



自定义指令

钩子函数：bind, inserted, update



钩子函数：

beforeCreate，created

beforeMount，mounted

beforeUpdate，updated

beforeDestroy，destroyed



```js
Vue.prototype.__proto__ === Vue.prototype
Vue.prototype.__proto__ 不指向 Object.prototype
Vue 原型上的方法和属性
```



ref

props

mixins



插件 Vue.use()



vm.$refs.vc.$on('test_event', callback)



插槽：v-slot





### $attrs 和 $listeners

#### $attrs

$attrs 用于多层次组件传递参数（组件标签的attribute，class和style除外），即爷爷辈组件向孙子辈组件传递参数（注：参数不能被父辈prop识别，一旦被父辈prop识别且获取，则**孙子辈组件不能获取到该参数**）

如：GrandFather -> Father -> GrandSon

写法如下：（注：v-bind不能用简写 `:`）

```vue
<grand-son v-bind="$attrs" />
```

下面举个栗子：

爷爷（GrandFather）向父亲（Father）传递一个 `msg1`

向孙子（GrandSon）传递一个 `msg2`，孙子会一并接收 `msg1`（然而被父亲接走了，所以孙子收不到 `msg1`）

```vue
<!-- GrandFather.vue -->
<template>
  <div>
    GrandFather:
    <father :msg1="msg1" :msg2="msg2" />
  </div>
</template>

<script>
import Father from './Father.vue'
export default {
  components: { Father },
  data() {
    return {
      msg1: 'msg1',
      msg2: 'msg2'
    }
  }
}
</script>
```

```vue
<!-- Father.vue -->
<template>
  <div>
    Father: {{ msg1 }}
    <grand-son v-bind="$attrs" />
  </div>
</template>

<script>
import GrandSon from './GrandSon.vue'
export default {
  components: { GrandSon },
  props: ['msg1']
}
</script>
```

```vue
<!-- GrandSon.vue -->
<template>
  <div>GrandSon: {{ msg1 }}{{ msg2 }}</div>
</template>

<script>
export default {
  props: ['msg1', 'msg2']
}
</script>
```

界面现实结果：

```bash
GrandFather:
Father: msg1
GrandSon: msg2
```

#### $listeners

$listeners 用于多层次组件传递事件监听器，爷爷辈组件向父辈、孙子辈、曾孙子辈……组件传递事件（与 $attrs 不同，不存在半路被拦截的情况）

写法如下：（注：v-on 不能用简写 `@`，虽然不报错，但是也不生效）

```vue
<grand-son v-on="$listeners" />
```

下面继续使用 爷爷-> 父亲 -> 孙子 的栗子：

爷爷（GrandFather）给父亲（Father）绑定一个 `click` 事件

父亲通过点击 div 触发 `click` 事件，同时向孙子（GrandSon）传递 `$listeners`

```vue
<!-- GrandFather.vue -->
<template>
  <div>
    GrandFather:
    <father :msg1="msg1" :msg2="msg2" @click="handleClick" />
  </div>
</template>

<script>
import Father from './Father.vue'
export default {
  components: { Father },
  data() {
    return {
      msg1: 'msg1',
      msg2: 'msg2'
    }
  },
  methods: {
    handleClick() {
      console.log('trriger click')
    }
  }
}
</script>
```

```vue
<!-- Father.vue -->
<template>
  <div>
    <div @click="handleFatherClick">Father: {{ msg1 }}</div>
    <grand-son v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<script>
import GrandSon from './GrandSon.vue'
export default {
  components: { GrandSon },
  props: ['msg1'],
  methods: {
    handleFatherClick() {
      console.log('father click')
      this.$emit('click')
    }
  }
}
</script>
```

```vue
<!-- GrandSon.vue -->
<template>
  <div @click="handleSonClick">GrandSon: {{ msg1 }}{{ msg2 }}</div>
</template>

<script>
export default {
  props: ['msg1', 'msg2'],
  methods: {
    handleSonClick() {
      console.log('grandson click')
      this.$emit('click')
    }
  }
}
</script>
```

界面：

```bash
GrandFather:
Father: msg1
GrandSon: msg2
```

点击 `Father: msg1`，控制台显示：

```js
father click
trriger click
```

点击 `GrandSon: msg2`，控制台显示：

```js
grandson click
trriger click
```



## EventBus 传递数据

### 1 注册局部/全局事件总线

注册全局事件总线

```js
//main.js
var EventBus = Vue.extend() //创建 Vue 构造器
Vue.prototype.$_bus = new EventBus() //将构造器实例挂载到Vue上

new Vue({render: h => h(App)}).$mount('#app')
```

### 2 在组件中传递数据

A 组件向 B 组件传递

```html
<!-- A -->
<template>
  <div @click="handleClick">触发bus</div>
</template>

<script>
import InnerComponentInner from './InnerComponentInner.vue'

export default {
  methods: {
    handleClick(){
      this.$_bus.$emit('event', '来自A的消息')
    }
  }
}
</script>
```

```html
<!-- B -->
<template>
  <div>接收event</div>
</template>

<script>
import InnerComponentInner from './InnerComponentInner.vue'

export default {
  created(){
    //订阅事件
    this.$_bus.$on('event', this.receive)
  },
  beforeDestroy(){
    //组件销毁时，取消订阅
    this.$_bus.$off('event', this.receive)
  },
  methods: {
    receive(msg){
      console.log(msg)
    }
  }
}
</script>
```

