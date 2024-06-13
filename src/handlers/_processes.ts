import { appConfig } from '@config/constant'
import { removeFile } from '@utils/io'
import { joinPaths } from '@utils/string'

export const _handleExitProcess = () => {
	const { hotFile, publicDirectory } = appConfig

	process.on('SIGINT', _exitProcess)
	process.on('SIGHUP', _exitProcess)
	process.on('SIGTERM', _exitProcess)
	process.on('exit', () => removeFile(joinPaths(publicDirectory, hotFile)).catch(console.error))
}

const _exitProcess = (): never => process.exit()
