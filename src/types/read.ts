interface JsonVersion {
	version: string;
}

export declare type IsBunRunning = () => boolean;

export declare type ReadJsonFile = (filePath: string, packageName?: string) => Promise<JsonVersion>;
