#### http2.0 

特点

- 2.0使用二进制格式传递数据，1.1是基于文本传递数据的，实现上更方便，更健壮

- 多路复用，连接共享，一个连接上面可以有多个request通过id区分，request是混杂在一起发送的

- header压缩，使用encoder来减少需要传输的header大小，双方各自缓存一份header fields表，
避免重复header的传输，减少需要传输的大小

- 服务端推送技术，前端发一个html请求，服务端可能会推送html加上对应的main.js的脚本
