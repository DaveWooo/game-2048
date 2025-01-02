# 数字叠叠乐 (2048 Game)

一个基于 TypeScript 实现的 2048 游戏，支持多种难度级别和触摸操作。

## 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FDaveWooo%2Fgame-2048)

### 部署步骤
1. 点击上方的 "Deploy with Vercel" 按钮
2. 选择或导入你的 GitHub 仓库
3. Vercel 会自动配置构建和部署
4. 部署完成后，你会获得一个可访问的URL

## 游戏特性

- 多难度级别（4x4, 5x5, 6x6）
- 触摸屏和键盘支持
- 音效系统
- 自动保存游戏进度
- 响应式设计

## 游戏说明

### 基本玩法
1. 使用方向键（↑↓←→）或触摸滑动来移动方块
2. 相同数字的方块相撞时会合并
3. 每次移动后会随机生成一个新的数字方块（2或4）
4. 达到2048（或更高目标）即为胜利
5. 无法移动时游戏结束

### 难度级别
- **初级模式 (4×4)**：
  - 目标数字：2048
  - 新数字生成概率：2 (90%), 4 (10%)
  - 适合新手入门

- **中级模式 (5×5)**：
  - 目标数字：4096
  - 新数字生成概率：2 (85%), 4 (15%)
  - 需要更多策略思考

- **高级模式 (6×6)**：
  - 目标数字：8192
  - 新数字生成概率：2 (80%), 4 (20%)
  - 挑战性最高

### 操作方式
- **键盘控制**：使用方向键（↑↓←→）移动方块
- **触摸控制**：在屏幕上滑动来移动方块
- **重新开始**：点击"重新开始"按钮
- **难度选择**：使用下拉菜单选择游戏难度
- **音效控制**：点击音效按钮开关音效

## 开发指南

### 本地开发

1. 克隆仓库
2. 安装依赖
3. 运行开发环境

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

[MIT License](LICENSE)

## 联系方式

- 提交 Issue: [GitHub Issues](https://github.com/DaveWooo/game-2048/issues)
- 邮件联系: wzhiu@163.com
