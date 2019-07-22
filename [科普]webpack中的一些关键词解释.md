- module
项目中的每一个文件下代码都成为一个module,本质是每代码文件

- chunk
当我们写的 module 源文件传到 webpack 进行打包时，webpack 会根据文件引用关系生成 chunk 文件。

webpack 会对这个 chunk 文件进行一些操作；

- bundle

webpack 处理好 chunk 文件后，最后会输出 bundle 文件，这个 bundle 文件包含了经过加载和编译的最终源文件，

所以它可以直接在浏览器中运行

> 总结:module，chunk 和 bundle 其实就是同一份逻辑代码在不同转换场景下的取了三个名字：我们直接写出来的是 module，webpack 处理时是 chunk，最后生成浏览器可以直接运行的 bundle。
- filename
对应于entry里面生成出来的文件名
```javascript
entry: {
    app: 'app.js'
},

output: {
    filename: '[name].min.js', // 生成出来的文件名为app.min.js。
    chunkFilename: '[name].min.js'
}
```

- chunkname
chunkname就是未被列在entry中，但有些场景需要被打包出来的文件命名配置

比如按需加载（异步）模块的时候，这样的文件是没有被列在entry中的使用CommonJS的方式异步加载模块


