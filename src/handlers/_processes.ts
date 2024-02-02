import { _cleaner } from "./_fileCleaner";

export const _handleExitProcess = () => {
	process.on("exit", _cleaner);
	process.on("SIGINT", _exitProcess);
	process.on("SIGTERM", _exitProcess);
	process.on("SIGHUP", _exitProcess);
};

const _exitProcess = (): never => process.exit();
