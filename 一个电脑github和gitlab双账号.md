* 进入ssh目录                                            
```
ssh cd ~/.ssh
```
* 自己的github账号生成ssh-keygen        
```
 ssh-keygen -t rsa -C "aaaaa@qq.com"  
```
* 第一次回车时输入名字 我起的名字是 `id_rsa_sam`
```
Enter file in which to save the key (/Users/sam/.ssh/id_rsa): id_rsa_sam
```
* 公司的gitlab账号生成ssh-keygen        
```
ssh-keygen -t rsa -C "bbbbb@gmail.com"
```
* 第一次回车时输入名字 我起的名字是`id_rsa_company`      
```
Enter file in which to save the key (/Users/sam/.ssh/id_rsa): id_rsa_company
```

* 此时执行 `ls` 或者 `ll` 查看当前ssh文件夹下的文件
```
-rw-r--r--  1 sam  staff     0B  1 21 11:29 config
-rw-------  1 sam  staff   1.6K  9 26 11:14 id_rsa
-rw-r--r--  1 sam  staff   404B  9 26 11:14 id_rsa.pub
-rw-------  1 sam  staff   1.6K  1 21 11:28 id_rsa_company
-rw-r--r--  1 sam  staff   403B  1 21 11:28 id_rsa_company.pub
-rw-------  1 sam  staff   1.6K  1 21 11:28 id_rsa_sam
-rw-r--r--  1 sam  staff   398B  1 21 11:28 id_rsa_sam.pub
-rw-r--r--  1 sam  staff   589B 12 10 10:37 known_hosts
```

* 创建配置文件
```
touch config
```
* 编辑配置文件
```
vim config
```

* 配置文件中输入以下代码              
```
Host github.com                         //勿动
HostName ssh.github.com                 //勿动
User aaaaa@qq.com                       //改成你自己的邮箱aaaaa@qq.com
PreferredAuthentications publickey       //勿动
IdentityFile ~/.ssh/ id_rsa_sam         //最后一个字段改成自己生成公匙用的名字  id_rsa_sam         
PreferredAuthentications publickey      // 勿动

Host gitlab.company.com                 //改成自己公司gitlab的域名或者ip 例如公司的是gitlab.company.com
HostName gitlab.company.com             //跟上面一样域名或ip
User bbbbb@company.com                  //改成公司gitlab自己用的邮箱bbbbb@company.com 
IdentityFile ~/.ssh/id_rsa_company      //最后一个字段改成自己生成公匙用的名字rsa_company
PreferredAuthentications publickey      //勿动
```
