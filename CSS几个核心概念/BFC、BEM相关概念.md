https://github.com/louzhedong/blog/issues/145

tfc，bfc，ifc，ffc，gfc

### 1.创建BFC的方式

- 根元素(<html>)
- 浮动元素（元素的 float 不是 none）是(left right inherit默认的)
- 绝对定位元素（元素的 position 为 absolute 或 fixed）
- 行内块元素（元素的 display 为 inline-block）
- 表格单元格（元素的 display为 table-cell，HTML表格单元格默认为该值）
- 表格标题（元素的 display 为 table-caption，HTML表格标题默认为该值）
- 匿名表格单元格元素（元素的 display为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是HTML table、row、tbody、thead、tfoot的默认属性）或 inline-table）
- overflow 值不为 visible 的块元素  是(hidden没意义 scroll auto inherit默认的)
- display 值为 flow-root 的元素
- contain 值为 layout、content或 paint 的元素
- 弹性元素（display为 flex 或 inline-flex元素的直接子元素）
- 网格元素（display为 grid 或 inline-grid 元素的直接子元素）
- 多列容器（元素的 column-count 或 column-width 不为 auto，包括 column-count 为 1）
- column-span 为 all 的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中（标准变更，Chrome bug）。


### 2.包含块和值的计算

> 确定一个元素的包含块的过程完全依赖于这个元素的 position 属性：

- 如果 position 属性为 static 或 relative ，包含块就是由它的最近的祖先块元素（比如说inline-block, block 或 list-item元素）
或格式化上下文(比如说 a table container, flex container, grid container, or the block container itself)
的内容区的边缘组成的。

- 如果 position 属性为 absolute ，包含块就是由它的最近的 position 的值不是 static 
（也就是值为fixed, absolute, relative 或 sticky）的祖先元素的内边距区的边缘组成。

- 如果 position 属性是 fixed，在连续媒体的情况下(continuous media)包含块是 viewport ,
在分页媒体(paged media)下的情况下包含块是分页区域(page area)。

- 如果 position 属性是 absolute 或 fixed，包含块也可能是由满足以下条件的最近父级元素的内边距区的边缘组成的：
    - 有transform或者perspective的并且至少一个属性
    - transform 或者 perspective 有 will-change属性值
    - 一个非none的filter值或者一个用于filter的will-change 的值(only works on Firefox).
    - 包含paint属性的(例如: contain: paint;)

规则： 

1. margin padding 5%设置为百分比时

2. 参考值都是父级的包含块的width++padding-left+padding-right height+padding-left+padding-right

3. 注意只有padding左右，不算上下

4. 要计算 height top 及 bottom 中的百分值，是通过包含块的 height 的值。
如果包含块的 height 值会根据它的内容变化，而且包含块的 position 属性的值被赋予 relative 或 static ，那么，这些值的计算值为 0。

5. 要计算 width, left, right, padding, margin 这些属性由包含块的 width 属性的值来计算它的百分值。


### 3.布局模型

CSS 布局模式，有时简称为布局，是一种基于盒子与其兄弟和祖辈盒子的交互方式来确定盒子的位置和大小的算法。有以下几种形式：

- 块布局：用来布置文件。块布局包含以文档为中心的功能，例如 浮动元素或将其放置在多列上的功能。
- 行内布局：用来布置文本。
- 表格布局：用来布置表格。
- 定位布局：用来对那些与其他元素无交互的定位元素进行布置 。
- 弹性盒子布局：用来布置那些可以顺利调整大小的复杂页面。
https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes

- 网格布局：用来布置那些与一个固定网格相关的元素。 display: grid； 子 gird-column: 1; grid-row:1;
https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Grid_Layout


### 4. 外边距合并只针对 margin

- 当一个元素出现在另一个元素上面时，第一个元素的底外边距和第二个元素的顶外边距发生叠加

- 当一个元素包含在另一个元素中时，他们的顶和底外边距也会发生叠加

- 外边距也可以和本身发生叠加，前提有三个：空元素，有外边距，无内边距/边框

- 
