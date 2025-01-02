## 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fnumber-stack-game)

1. 点击上方的 "Deploy with Vercel" 按钮
2. 选择或导入你的 GitHub 仓库
3. Vercel 会自动配置构建和部署

# 数字叠叠乐 (2048 Game)

一个基于 TypeScript 实现的 2048 游戏，支持多种难度级别和触摸操作。

## 游戏特性

- 多难度级别（4x4, 5x5, 6x6）
- 触摸屏和键盘支持
- 音效系统
- 自动保存游戏进度
- 响应式设计

## 游戏玩法

1. 使用方向键（↑↓←→）或触摸滑动来移动方块
2. 相同数字的方块相撞时会合并
3. 每次移动后会随机生成一个新的数字方块（2或4）
4. 达到2048（或更高目标）即为胜利
5. 无法移动时游戏结束

### 难度说明
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

### 操作说明
- **键盘控制**：
  - ↑ (上箭头)：向上移动所有方块
  - ↓ (下箭头)：向下移动所有方块
  - ← (左箭头)：向左移动所有方块
  - → (右箭头)：向右移动所有方块

- **触摸控制**：
  - 向上滑动：向上移动所有方块
  - 向下滑动：向下移动所有方块
  - 向左滑动：向左移动所有方块
  - 向右滑动：向右移动所有方块

### 界面功能
- **分数显示**：实时显示当前得分
- **最高分**：显示历史最高分
- **重新开始**：重置游戏
- **难度选择**：切换游戏难度
- **音效控制**：开启/关闭游戏音效

## 开发指南

### 本地开发

1. 安装 Node.js 和 npm
2. 克隆仓库
3. 运行 `npm install` 安装依赖
4. 运行 `npm run dev` 启动开发服务器

### 核心文件说明
- **Game.ts**: 实现游戏核心逻辑，包括方块移动、合并、分数计算等
- **GameUI.ts**: 处理游戏界面渲染和用户交互
- **AudioManager.ts**: 管理游戏音效系统
- **Storage.ts**: 处理游戏状态的本地存储
- **styles.css**: 定义游戏界面样式

## 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fnumber-stack-game)

### 部署步骤
1. 点击上方的 "Deploy with Vercel" 按钮
2. 选择或导入你的 GitHub 仓库
3. Vercel 会自动配置构建和部署
4. 部署完成后，你会获得一个可访问的URL

### 自定义域名（可选）
1. 在 Vercel 仓库设置中添加你的域名
2. 按照 Vercel 的说明配置 DNS 记录
3. 等待 DNS 生效（通常需要几分钟到几小时）

## 技术栈
- TypeScript：提供类型安全和更好的开发体验
- Vite：现代前端构建工具，提供快速的开发体验
- CSS Grid：实现响应式网格布局
- Local Storage：保存游戏状态和最高分

## 贡献指南
1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 许可证
MIT License - 详见 [LICENSE](LICENSE) 文件

## 联系方式
如有问题或建议，欢迎提出 Issue 或 Pull Request
