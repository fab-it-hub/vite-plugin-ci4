import { appConfig } from '@config/constant'
import { removeFile } from '@utils/io'
import { joinPaths } from '@utils/string'

export const _handleExitProcess = (): void => {
	process.on('exit', _removeHotFile)
	process.on('SIGINT', _exitProcess)
	process.on('SIGTERM', _exitProcess)
	process.on('SIGHUP', _exitProcess)
}

const _exitProcess = (): never => process.exit()

const _removeHotFile = () => {
	const { hotFile, publicDirectory } = appConfig
	const hotFilePath = joinPaths(publicDirectory, hotFile)

	removeFile(hotFilePath)
}
