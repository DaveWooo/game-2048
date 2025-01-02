import { Game, GameDifficulty } from './Game';
import { AudioManager } from './AudioManager';

export class GameUI {
    private game: Game;
    private container: HTMLElement;
    private gridContainer!: HTMLElement;
    private scoreElement!: HTMLElement;
    private messageContainer!: HTMLElement;

    constructor(containerId: string) {
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Container with id "${containerId}" not found`);
        }
        this.container = container;
        this.game = new Game();
        this.setupUI();
        this.setupEventListeners();
    }

    private setupUI(): void {
        // 创建分数显示
        this.scoreElement = document.createElement('div');
        this.scoreElement.className = 'score';
        this.container.appendChild(this.scoreElement);

        // 创建网格容器
        this.gridContainer = document.createElement('div');
        this.gridContainer.className = 'grid-container';
        this.container.appendChild(this.gridContainer);

        // 创建消息容器
        this.messageContainer = document.createElement('div');
        this.messageContainer.className = 'message';
        this.container.appendChild(this.messageContainer);

        this.setupControls();

        this.updateUI();
    }

    private updateUI(): void {
        // 更新分数
        this.scoreElement.textContent = `分数: ${this.game.getScore()}`;

        // 更新网格
        this.gridContainer.innerHTML = '';
        const grid = this.game.getGrid();
        
        grid.forEach((row, i) => {
            row.forEach((value, j) => {
                const cell = document.createElement('div');
                cell.className = `cell cell-${value}`;
                cell.textContent = value ? value.toString() : '';
                cell.style.gridRow = `${i + 1}`;
                cell.style.gridColumn = `${j + 1}`;
                this.gridContainer.appendChild(cell);
            });
        });

        // 检查游戏状态
        if (this.game.hasWon()) {
            this.messageContainer.textContent = '恭喜你赢了！';
        } else if (this.game.isGameOver()) {
            this.messageContainer.textContent = '游戏结束！';
        } else {
            this.messageContainer.textContent = '';
        }
    }

    private setupEventListeners(): void {
        // 键盘事件
        document.addEventListener('keydown', (e) => {
            e.preventDefault(); // 阻止默认行为，防止页面滚动
            let moved = false;
            switch (e.key) {
                case 'ArrowUp':
                    moved = this.game.move('up');
                    break;
                case 'ArrowDown':
                    moved = this.game.move('down');
                    break;
                case 'ArrowLeft':
                    moved = this.game.move('left');
                    break;
                case 'ArrowRight':
                    moved = this.game.move('right');
                    break;
                default:
                    return; // 如果不是方向键，直接返回
            }
            if (moved) {
                this.updateUI();
            }
        });

        // 触摸事件
        let touchStartX: number;
        let touchStartY: number;

        this.container.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });

        this.container.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            
            const dx = touchEndX - touchStartX;
            const dy = touchEndY - touchStartY;
            
            let moved = false;
            
            if (Math.abs(dx) > Math.abs(dy)) {
                if (dx > 0) {
                    moved = this.game.move('right');
                } else {
                    moved = this.game.move('left');
                }
            } else {
                if (dy > 0) {
                    moved = this.game.move('down');
                } else {
                    moved = this.game.move('up');
                }
            }
            
            if (moved) {
                this.updateUI();
            }
        });
    }

    private setupControls(): void {
        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'controls';

        // 重新开始按钮
        const restartButton = document.createElement('button');
        restartButton.textContent = '重新开始';
        restartButton.onclick = () => {
            this.game.reset();
            this.updateUI();
        };

        // 音效控制按钮
        const soundButton = document.createElement('button');
        soundButton.textContent = '音效';
        soundButton.onclick = () => {
            AudioManager.getInstance().toggleMute();
            soundButton.classList.toggle('muted');
        };

        // 难度选择
        const difficultySelect = document.createElement('select');
        Object.values(GameDifficulty).filter(x => typeof x === 'number').forEach(level => {
            const option = document.createElement('option');
            option.value = level.toString();
            option.textContent = `${level}x${level}`;
            difficultySelect.appendChild(option);
        });
        difficultySelect.onchange = (e) => {
            const newSize = parseInt((e.target as HTMLSelectElement).value);
            this.game = new Game(newSize as GameDifficulty);
            this.updateUI();
        };

        controlsContainer.appendChild(restartButton);
        controlsContainer.appendChild(soundButton);
        controlsContainer.appendChild(difficultySelect);
        this.container.appendChild(controlsContainer);
    }
} 