* npm init -y 初始化仓库，不询问，直接生成package.json文件
* npm set init-author-name 'Your name'
* npm set init-author-email 'Your email'
* npm set init-author-url 'http://yourdomain.com'
* npm set init-license 'MIT'
* 上面命令等于为npm init设置了默认值，以后执行npm init的时候，package.json的作者姓名、邮件、主页、许可证字段就会自动写入预设的值。这些信息会存放在用户主目录的 ~/.npmrc文件，使得用户不用每个项目都输入。如果某个项目有不同的设置，可以针对该项目运行npm config。
* npm info 查看npm模块的具体信息
* npm list命令以树型结构列出当前项目安装的所有模块，以及它们依赖的模块。
    * npm list -global 列出全局安装的模块。
    * npm list underscore 列出单个模块
* npm install XXXpackage 本地安装
* sudo npm install -global <package name> 全局安装
* rm -rf node_modules 删除安装的模块
* npm install 重新安装
* npm update packageName 更新本地安装的模块。
* npm update -global packageName 升级全局安装的模块
* npm run xxx 执行脚本，不带名字只有npm run 会列出package.json中所有的可执行命令
* start和test属于特殊命令，可以省略run。npm start、npm test
* "build-js": "browserify browser/main.js | uglifyjs -mc > static/bundle.js" 使用Linux系统的管道命令 | 将两个操作连在一起
* "build": "npm run build-js && npm run build-css" 引用其他npm run 命令
* linux环境下更新npm版本 nvm install --latest-npm
