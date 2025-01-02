import { GameStorage } from './Storage';
import { AudioManager } from './AudioManager';

export enum GameDifficulty {
    EASY = 4,   // 4x4 网格
    MEDIUM = 5, // 5x5 网格
    HARD = 6    // 6x6 网格
}

interface Position {
    x: number;
    y: number;
}

interface GameState {
    difficulty: GameDifficulty;
    size: number;
    targetScore: number;
    score: number;
    gameOver: boolean;
    won: boolean;
    grid: number[][];
}

export class Game {
    private grid: number[][];
    private score: number;
    private size: number;
    private gameOver: boolean;
    private won: boolean;
    private difficulty: GameDifficulty;
    private targetScore: number;

    constructor(difficulty: GameDifficulty = GameDifficulty.EASY) {
        const savedState = GameStorage.loadGame();
        if (savedState) {
            this.loadState(savedState);
        } else {
            this.difficulty = difficulty;
            this.size = difficulty;
            this.targetScore = this.getTargetScore();
            this.score = 0;
            this.gameOver = false;
            this.won = false;
            this.grid = this.createGrid();
            this.addInitialTiles();
        }
    }

    private loadState(state: GameState): void {
        this.difficulty = state.difficulty;
        this.size = state.size;
        this.targetScore = state.targetScore;
        this.score = state.score;
        this.gameOver = state.gameOver;
        this.won = state.won;
        this.grid = state.grid;
    }

    private saveState(): void {
        const state = {
            difficulty: this.difficulty,
            size: this.size,
            targetScore: this.targetScore,
            score: this.score,
            gameOver: this.gameOver,
            won: this.won,
            grid: this.grid
        };
        GameStorage.saveGame(state);
    }

    private createGrid(): number[][] {
        return Array(this.size).fill(null)
            .map(() => Array(this.size).fill(0));
    }

    private addInitialTiles(): void {
        this.addRandomTile();
        this.addRandomTile();
    }

    private addRandomTile(): void {
        if (!this.hasEmptyCell()) return;

        let value = Math.random() < 0.9 ? 2 : 4;
        let emptyCells = this.getEmptyCells();
        let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        this.grid[randomCell.x][randomCell.y] = value;
    }

    private hasEmptyCell(): boolean {
        return this.grid.some(row => row.some(cell => cell === 0));
    }

    private getEmptyCells(): Position[] {
        let cells: Position[] = [];
        this.grid.forEach((row, x) => {
            row.forEach((cell, y) => {
                if (cell === 0) {
                    cells.push({x, y});
                }
            });
        });
        return cells;
    }

    public move(direction: 'up' | 'down' | 'left' | 'right'): boolean {
        let moved = false;
        let prevGrid = JSON.stringify(this.grid);

        switch (direction) {
            case 'up':
                moved = this.moveUp();
                break;
            case 'down':
                moved = this.moveDown();
                break;
            case 'left':
                moved = this.moveLeft();
                break;
            case 'right':
                moved = this.moveRight();
                break;
        }

        if (moved) {
            AudioManager.getInstance().playMove();
            this.addRandomTile();
            this.checkGameStatus();
            this.saveState();
        }

        return moved;
    }

    private moveLeft(): boolean {
        let moved = false;
        for (let i = 0; i < this.size; i++) {
            let row = this.grid[i];
            let newRow = this.compress(row);
            newRow = this.merge(newRow);
            newRow = this.compress(newRow);
            
            if (JSON.stringify(row) !== JSON.stringify(newRow)) {
                moved = true;
            }
            this.grid[i] = newRow;
        }
        return moved;
    }

    private compress(row: number[]): number[] {
        let newRow = row.filter(cell => cell !== 0);
        while (newRow.length < this.size) {
            newRow.push(0);
        }
        return newRow;
    }

    private merge(row: number[]): number[] {
        for (let i = 0; i < row.length - 1; i++) {
            if (row[i] !== 0 && row[i] === row[i + 1]) {
                row[i] *= 2;
                this.score += row[i];
                row[i + 1] = 0;
                AudioManager.getInstance().playMerge();
                if (row[i] === this.targetScore) {
                    this.won = true;
                    AudioManager.getInstance().playWin();
                }
            }
        }
        return row;
    }

    private moveRight(): boolean {
        let moved = false;
        for (let i = 0; i < this.size; i++) {
            let row = this.grid[i].slice().reverse();
            let newRow = this.compress(row);
            newRow = this.merge(newRow);
            newRow = this.compress(newRow);
            newRow.reverse();
            
            if (JSON.stringify(this.grid[i]) !== JSON.stringify(newRow)) {
                moved = true;
            }
            this.grid[i] = newRow;
        }
        return moved;
    }

    private moveUp(): boolean {
        let moved = false;
        for (let j = 0; j < this.size; j++) {
            let column = this.grid.map(row => row[j]);
            let newColumn = this.compress(column);
            newColumn = this.merge(newColumn);
            newColumn = this.compress(newColumn);
            
            if (JSON.stringify(column) !== JSON.stringify(newColumn)) {
                moved = true;
                for (let i = 0; i < this.size; i++) {
                    this.grid[i][j] = newColumn[i];
                }
            }
        }
        return moved;
    }

    private moveDown(): boolean {
        let moved = false;
        for (let j = 0; j < this.size; j++) {
            let column = this.grid.map(row => row[j]).reverse();
            let newColumn = this.compress(column);
            newColumn = this.merge(newColumn);
            newColumn = this.compress(newColumn);
            newColumn.reverse();
            
            if (JSON.stringify(this.grid.map(row => row[j])) !== JSON.stringify(newColumn)) {
                moved = true;
                for (let i = 0; i < this.size; i++) {
                    this.grid[i][j] = newColumn[i];
                }
            }
        }
        return moved;
    }

    private checkGameStatus(): void {
        if (!this.hasEmptyCell() && !this.canMove()) {
            this.gameOver = true;
            AudioManager.getInstance().playLose();
        }
    }

    private canMove(): boolean {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (j < this.size - 1 && this.grid[i][j] === this.grid[i][j + 1]) return true;
                if (i < this.size - 1 && this.grid[i][j] === this.grid[i + 1][j]) return true;
            }
        }
        return false;
    }

    public getGrid(): number[][] {
        return this.grid;
    }

    public getScore(): number {
        return this.score;
    }

    public isGameOver(): boolean {
        return this.gameOver;
    }

    public hasWon(): boolean {
        return this.won;
    }

    public reset(): void {
        this.grid = this.createGrid();
        this.score = 0;
        this.gameOver = false;
        this.won = false;
        this.addInitialTiles();
    }

    private getTargetScore(): number {
        switch (this.difficulty) {
            case GameDifficulty.EASY:
                return 2048;
            case GameDifficulty.MEDIUM:
                return 4096;
            case GameDifficulty.HARD:
                return 8192;
        }
    }
} 