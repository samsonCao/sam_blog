# Linux-normal
整理了工作中常用的Linux命令
---
### cd命令
- cd ../  上一级目录
- cd xxx/xxx  跳转某个目录
- cd ~  进入主目录

### ls命令
- ls -a 显示所有文件，包括隐藏文件,简写la
- ls -l 显示文件并且显示文件大小和作者等信息 简写ll
- ls -R 递归显示所有的文件

### pwd
- pwd 显示当前工作目录的绝对路径

### dirs
- dirs -l 以列表的形式，显示当前目录栈中心的信息
- dirs -v 以列表的形式，显示当前目录栈中心的信息，会在前面加上序号1-10

### history
- history 查看历史命令

### export查看环境变量

### which
- which xxx  查看某个包在系统中的文件路径 例如 which node

### cat  more
- cat /user/xxx/xxx.js 查看某个文件的内容
- more /user/xxx/xxx..js 查看一个长文件内容

#### 查看写了多少行代码
- git log --format='%aN' | sort -u | while read name; do echo -en "$name\t"; git log --author="$name" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -; done
- [参考资料链接](https://blog.csdn.net/hshl1214/article/details/52451084)
- [参考资料链接2](https://segmentfault.com/a/1190000008542123)

### mv
- mv xxx文件夹A xxx文件夹B -- 把文件夹A和A里面的所有文件移动到文件夹B
- mv xxx文件夹A/* xxx文件夹B -- 把文件夹A里面的所有文件移动到文件夹B，不包括文件夹A

### rm rf
rm -rf xxxx .xxx 删除某个文件夹和文件夹内的文件 慎用此命令 会直接删除，并且不会提示

### git相关命令
- git add .
- git commit -m "描述"
- git pull origin xxx依赖的分支名字
- git push origin xxx自己的分支名字
###### 其它git配置命令
git config -e 打开git配置的文档,看起来大概是在这样的，可以修改并保存:wq。
```javascript
[core]
        repositoryformatversion = 0
        filemode = true
        bare = false
        logallrefupdates = true
        ignorecase = true
        precomposeunicode = true
[remote "origin"]
        url = git@github.com:samsonCao/react-iframe.git
        fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
        remote = origin
        merge = refs/heads/master
```
- git config --global --list 查看全局配置
- git config --local --list  查看当前仓库的配置
- git rm -r --cached .D 删除暂存区的所有文件，慎用此命令
- git提交错误的修复
        `fatal: Unable to create '/Users/samcao/nanjiren/op-static/.git/index.lock': File exists.
        `Another git process seems to be running in this repository, e.g.
        `an editor opened by 'git commit'. Please make sure all processes
        `are terminated then try again. If it still fails, a git process
        `may have crashed in this repository earlier:
        `remove the file manually to continue.`

- 修复方法 rm -f ./.git/index.lock

- 更新git本地分支和远程分支同步 git remote update origin --prune
- 删除本地git仓库 rm -rf .git
