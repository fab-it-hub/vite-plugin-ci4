import type {ConfigEnv, Plugin, UserConfig} from "vite";

interface Ci4Plugin extends Plugin {
	config: (config: UserConfig, env: ConfigEnv) => UserConfig;
}

export declare type Ci4 = (_config: string | string[]) => Ci4Plugin;
