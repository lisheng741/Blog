# CSS



## 布局

### flex 布局

```css
flex: 0 1 auto
```

第1个参数 flex-grow：项目放大比例，默认0，存在剩余空间也不放大

第2个参数 flex-shrink：项目缩小比例，默认1，空间不足，则将缩小

第3个参数 flex-basis：定义项目占据的空间，默认auto，可以为width或height



## less

样式嵌套

```css
.demo{
    font-size: 14px;
    .in-demo{
        text-align: center;
    }
}
```

