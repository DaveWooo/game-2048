export class GameStorage {
    private static readonly STORAGE_KEY = 'number_stack_game';

    public static saveGame(gameState: any): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(gameState));
    }

    public static loadGame(): any {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        return saved ? JSON.parse(saved) : null;
    }

    public static clearSave(): void {
        localStorage.removeItem(this.STORAGE_KEY);
    }
} 