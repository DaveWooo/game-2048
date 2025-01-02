#!/bin/bash

# 构建项目
npm run build

# 创建部署目录
mkdir -p deploy

# 复制构建文件
cp -r dist/* deploy/

# 上传到服务器（替换为你的服务器信息）
# scp -r deploy/* your-username@your-server:/path/to/web/root/

# 或者使用 rsync
# rsync -avz --delete deploy/ your-username@your-server:/path/to/web/root/ 