export const isBunRunning = (): boolean => typeof process.versions['bun'] !== 'undefined'
