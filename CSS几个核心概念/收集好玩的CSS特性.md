> 先收集一部分，后期如果收集的多了，新起一个项目展示这些好玩的效果

1. css做的自定义边框虚线长度 代替dotted 和dashed
```css
.border {
    padding: 10px;
    border: 2px dashed transparent;
    background: linear-gradient(white,white) padding-box,
    repeating-linear-gradient(45deg,#ccc 0, #ccc 0.45em,white 0,white 1em);
}
```

2. 固定定位到底部，并保证页面在浏览器上自适应
参考：https://sky.baoinsurance.com/m/short/trial?wareId=20068&accountId=10000519686
```html
<div class="container">
<div class="content">111</div>
<div class="bottom">
    <div class="fixed-button">
        button123
    </div>
</div>
</div>
```

```css
.container {
    word-break: break-all;
    padding-bottom: env(safe-area-inset-bottom);
}
.bottom {
    height: 85px;
}

.fixed-button {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    width: 100%;
    max-width: 750px;
    margin: 0 auto;
    padding-bottom: env(safe-area-inset-bottom);
    background: #f6f6f6;
}
```
    
