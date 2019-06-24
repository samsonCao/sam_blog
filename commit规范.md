# 安装 commitizen
sudo npm install -g commitizen

sudo npm install -g cz-conventional-changelog

# 新增 commitizen 配置
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc

# 使用 git cz 替代 git commit
git add .

git cz
