

## Router



## Vuex

状态管理



### 3.X

工程引入

```js
npm install vuex@3. --save
```

文件中

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment(state){
            state.count++
        }
    }
})
```

根组件中注入 `store` 以便于在 Vue 组件中访问 `this.$store` property

```js
new Vue({
    el: '#app',
    store
})
```

在组件中使用

```js
methods: {
    increment() {
        //触发状态改变
        this.$store.commit('increment')
        //获取
        console.log(this.$store.state.count)
    }
}
```

#### State

不理解：mapState

#### Getters

可以认为是 store 的计算属性

