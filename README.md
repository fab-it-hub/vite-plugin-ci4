# @fabithub/vite-plugin-ci4

> Vite Plugin for CodeIgniter 4 integration. Inspired by Laravel's Vite Plugin.

## Introduction

This Vite plugin allows seamless integration of [Vite JS](https://vitejs.dev/) with [CodeIgniter 4](https://codeigniter.com/), providing enhanced development and build processes for your web applications.

## Features

- CodeIgniter 4 support for Vite.
- Streamlined development workflow.
- Efficient production builds.

## Installation

### NPM

```bash
npm install --save-dev @fabithub/vite-plugin-ci4
```

### Yarn

```bash
yarn add --dev @fabithub/vite-plugin-ci4
```

### PNPM

```bash
pnpm add -D @fabithub/vite-plugin-ci4
```

### Bun

```bash
bun add -d @fabithub/vite-plugin-ci4
```

## Usage

In your Vite configuration file (usually `vite.config.js`), add the plugin:

```javascript
// vite.config.js
import Ci4Plugin from "@fabithub/vite-plugin-ci4";

export default {
  plugins: [Ci4Plugin("resources/index.js")]
};
```

## Configuration

### Vite Config

You can customize the plugin by passing options during initialization:

```javascript
// vite.config.js
import Ci4Plugin from "@fabithub/vite-plugin-ci4";

export default {
  plugins: [
    Ci4Plugin({
      input: ["resources/index.js", "resources/app.css"],
      refresh: true
      /* other configuration here */
    })
  ]
};
```

### Git Ignore

The `hot` file is created and deleted when the vite dev server is run, making it safe to ignore it. You can change the `hot` file path by update the config `hotFile` by default it's `public/hot` and add the path in the `.gitignore`.

```dockerfile
# @fabithub/vite-plugin-ci4
public/hot
```

## Options

| Configuration        | Type                                                          | Default                    | Description                                                                                                                                       |
| -------------------- | ------------------------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `input`              | string / string[]                                             |                            | The path or paths of the entry points to compile.                                                                                                 |
| `publicDirectory`    | string                                                        | "public"                   | Project's public directory.                                                                                                                       |
| `buildDirectory`     | string                                                        | "build"                    | The public subdirectory where compiled assets should be written.                                                                                  |
| `hotFile`            | string                                                        | \`${publicDirectory}/hot\` | The path to the "hot" file.                                                                                                                       |
| `ssr`                | string / string[]                                             |                            | The path of the SSR entry point.                                                                                                                  |
| `ssrOutputDirectory` | string                                                        | "writable/ssr"             | The directory where the SSR bundle should be written.                                                                                             |
| `refresh`            | boolean / string / string[] / RefreshConfig / RefreshConfig[] | false                      | Configuration for performing full page refresh on blade (or other) file changes. [see more](https://github.com/ElMassimo/vite-plugin-full-reload) |
| `transformOnServe`   | (code: string, url: string)=>string                           |                            | Transform the code while serving.                                                                                                                 |

## Example

```typescript
// vite.config.ts
import type { UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import ci4 from "@fabithub/vite-plugin-ci4";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }): UserConfig => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react(), ci4(`${env.VITE_RESOURCES_DIR}/${env.VITE_ENTRY_FILE}`)]
  };
});
```

## TODO

- [x] Basic Tests.
- [ ] Better Documentation.
- [ ] Tests for all files & functions.
- [ ] Many More.

## Credits

This plugin is inspired by [Laravel's vite-plugin](https://github.com/laravel/vite-plugin) by [Laravel](https://laravel.com/).

## License

This project is licensed under the [MIT License](LICENSE.md) .

> This project was created using `bun init` in bun v1.0.25. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
