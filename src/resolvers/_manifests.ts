import type { UserConfig } from "vite";
import { appConfig } from "@config/constant";

export const _resolveManifest = (
	config: UserConfig,
	isSSR: boolean,
	ssrManifest?: boolean
): string | boolean =>
	ssrManifest
		? config.build?.ssrManifest ?? (isSSR ? appConfig.ssrManifestPath : false)
		: config.build?.manifest ?? (isSSR ? false : appConfig.manifestPath);
