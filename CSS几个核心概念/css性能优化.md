
#### 1. 内联首屏关键CSS（Critical CSS）

内联CSS能够使浏览器开始页面渲染的时间提前，因为在HTML下载完成之后就能渲染了

使用外部CSS文件时，需要在HTML文档下载完成后才知道所要引用的CSS文件，然后才下载它们

自动转为内联css进行首屏渲染的工具 https://github.com/filamentgroup/criticalCSS

剩余的外部css使用外部css引入，能够开启缓存，并且可以一步加载

#### 2. 异步加载css

CSS会阻塞渲染，在CSS文件请求、下载、解析完成之前，浏览器将不会渲染任何已处理的内容

有时，这种阻塞是必须的，因为我们并不希望在所需的CSS加载之前，浏览器就开始渲染页面。

那么将首屏关键CSS内联后，剩余的CSS内容的阻塞渲染就不是必需的了，可以使用外部CSS，并且异步加载。

浏览器异步加载的4种方式
2.1 创建link标签
```javascript
const myCSS = document.createElement( "link" );
myCSS.rel = "stylesheet";
myCSS.href = "mystyles.css";
// 插入到header的最后位置
document.head.insertBefore( myCSS, document.head.childNodes[ document.head.childNodes.length - 1 ].nextSibling );
```

2.2 先加载css但是不解析，等文档加载完成再解析css
> 将link元素的media属性设置为用户浏览器不匹配的媒体类型（或媒体查询），如media="print"，
甚至可以是完全不存在的类型media="noexist"。对浏览器来说，如果样式表不适用于当前媒体类型，
其优先级会被放低，会在不阻塞页面渲染的情况下再进行下载。
```javascript
<link rel="stylesheet" href="mystyles.css" media="noexist" onload="this.media='all'">
```
  
2.3 先加载css但是不解析，等文档加载完成再解析css的另一种实现思路
> 通过rel属性将link元素标记为alternate可选样式表，也能实现浏览器异步加载。同样别忘了加载完成之后，将rel改回去。
```javascript
<link rel="alternate stylesheet" href="mystyles.css" onload="this.rel='stylesheet'">
```
2.4 用最新的web标准加载css
> 用[rel= "payload"](https://www.w3.org/TR/preload/),
此关键字提供声明性提取原语，该原语启动提前提取并将提取与资源执行分开。这一标准是候选标准，2019年7月开始支持了
```javascript
<link rel="preload" href="mystyles.css" as="style" onload="this.rel='stylesheet'">
```

#### 3. 文件压缩

3.1 现在的构建工具webpack/gulp/grunt/rollup等都支持css压缩功能，可明显减少css体积

#### 4. 去除无用的css

4.1 删除不同元素用的重复的css代码。尽量提取公共类，减少重复
 
4.2 删除整个页面内没有生效的css代码，手动人肉找

#### 5. 有选择的使用选择器
5.1 保持简单，不要使用嵌套过多过于复杂的选择器。

5.2 通配符和属性选择器效率最低，需要匹配的元素最多，尽量避免使用。

5.3 不要使用类选择器和ID选择器修饰元素标签，如h3#markdown-content，这样多此一举，还会降低效率。

5.4 不要为了追求速度而放弃可读性与可维护性

> Tips：为什么CSS选择器是从右向左匹配的？  
  CSS中更多的选择器是不会匹配的，所以在考虑性能问题时，需要考虑的是如何在选择器不匹配时提升效率。
  从右向左匹配就是为了达成这一目的的，通过这一策略能够使得CSS选择器在不匹配的时候效率更高。
  这样想来，在匹配时多耗费一些性能也能够想的通了。

#### 6. 减少使用昂贵的属性

> 在浏览器绘制屏幕时，所有需要浏览器进行操作或计算的属性相对而言都需要花费更大的代价。
当页面发生重绘时，它们会降低浏览器的渲染性能。所以在编写CSS时，我们应该尽量减少使用昂贵属性，
如box-shadow/border-radius/filter/透明度/:nth-child等。

#### 7. 减少重排和重绘

7.1 减少重排
> 重排会导致浏览器重新计算整个文档，重新构建渲染树，这一过程会降低浏览器的渲染速度。

引起重排的因素举例： 
- 改变font-size和font-family 
- 改变元素的内外边距 
- 通过JS改变CSS类
- 通过JS获取DOM元素的位置相关属性（如width/height/left等）
- CSS伪类激活
- 滚动滚动条或者改变窗口大小

可以通过[CSS Trigger15](https://csstriggers.com/)查询哪些属性会触发重排与重绘。

注意：某些CSS属性具有更好的重排性能。如使用Flex时，比使用inline-block和float时重排更快，所以在布局时可以优先考虑Flex

7.2 避免不必要的重绘

> 当元素的外观（如color，background，visibility等属性）发生改变时，会触发重绘。在网站的使用过程中，重绘是无法避免的。
不过，浏览器对此做了优化，它会将多次的重排、重绘操作合并为一次执行。
不过我们仍需要避免不必要的重绘，如页面滚动时触发的hover事件，可以在滚动的时候禁用hover事件，这样页面在滚动时会更加流畅。

tips: 除此之外我们还可以通过硬件加速16和will-change17来提升动画性能

#### 8. 不要使用@import

8.1 使用@import引入CSS会影响浏览器的并行下载

8.2 使用@import引用的CSS文件只有在引用它的那个css文件被下载、解析之后，浏览器才会知道还有另外一个css需要下载，
这时才去下载，然后下载后开始解析、构建render tree等一系列操作。这就导致浏览器无法并行下载所需的样式文件。

8.3 多个@import会导致下载顺序紊乱。在IE中，@import会引发资源文件的下载顺序被打乱，
即排列在@import后面的js文件先于@import下载，并且打乱甚至破坏@import自身的并行下载。

8.4 **使用link标签就行了** 


来源：https://juejin.im/post/5b6133a351882519d346853f
