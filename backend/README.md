oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g verso-backend
$ verso COMMAND
running command...
$ verso (--version)
verso-backend/0.0.0 linux-x64 node-v14.19.0
$ verso --help [COMMAND]
USAGE
  $ verso COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`verso help [COMMAND]`](#verso-help-command)
* [`verso plugins`](#verso-plugins)
* [`verso plugins:install PLUGIN...`](#verso-pluginsinstall-plugin)
* [`verso plugins:inspect PLUGIN...`](#verso-pluginsinspect-plugin)
* [`verso plugins:install PLUGIN...`](#verso-pluginsinstall-plugin-1)
* [`verso plugins:link PLUGIN`](#verso-pluginslink-plugin)
* [`verso plugins:uninstall PLUGIN...`](#verso-pluginsuninstall-plugin)
* [`verso plugins:uninstall PLUGIN...`](#verso-pluginsuninstall-plugin-1)
* [`verso plugins:uninstall PLUGIN...`](#verso-pluginsuninstall-plugin-2)
* [`verso plugins update`](#verso-plugins-update)

## `verso help [COMMAND]`

Display help for verso.

```
USAGE
  $ verso help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for verso.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

## `verso plugins`

List installed plugins.

```
USAGE
  $ verso plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ verso plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `verso plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ verso plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ verso plugins add

EXAMPLES
  $ verso plugins:install myplugin 

  $ verso plugins:install https://github.com/someuser/someplugin

  $ verso plugins:install someuser/someplugin
```

## `verso plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ verso plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ verso plugins:inspect myplugin
```

## `verso plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ verso plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ verso plugins add

EXAMPLES
  $ verso plugins:install myplugin 

  $ verso plugins:install https://github.com/someuser/someplugin

  $ verso plugins:install someuser/someplugin
```

## `verso plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ verso plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ verso plugins:link myplugin
```

## `verso plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ verso plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ verso plugins unlink
  $ verso plugins remove
```

## `verso plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ verso plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ verso plugins unlink
  $ verso plugins remove
```

## `verso plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ verso plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ verso plugins unlink
  $ verso plugins remove
```

## `verso plugins update`

Update installed plugins.

```
USAGE
  $ verso plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
