export class AudioManager {
    private static instance: AudioManager;
    private isMuted: boolean = false;

    private constructor() {
        // 暂时不加载音效
    }

    public static getInstance(): AudioManager {
        if (!AudioManager.instance) {
            AudioManager.instance = new AudioManager();
        }
        return AudioManager.instance;
    }

    public playMove(): void {
        if (!this.isMuted) console.log('播放移动音效');
    }

    public playMerge(): void {
        if (!this.isMuted) console.log('播放合并音效');
    }

    public playWin(): void {
        if (!this.isMuted) console.log('播放胜利音效');
    }

    public playLose(): void {
        if (!this.isMuted) console.log('播放失败音效');
    }

    public toggleBgMusic(): void {
        console.log('切换背景音乐');
    }

    public toggleMute(): void {
        this.isMuted = !this.isMuted;
        console.log('静音状态:', this.isMuted);
    }
} 