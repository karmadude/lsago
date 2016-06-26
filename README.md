# lsago - List how long ago files changed

A command that takes the date and file name columns from the `ls -lT` command and outputs the file name and a human friendly text of how long ago the file was changed.

## Install

    $ npm install -g lsago

## Usage

    $ lsago

##### Output

```bash
Jun 26 2016 09:27:45   2 minutes........  LICENSE
Jun 26 2016 09:27:21   2 minutes........  README.md
Jun 26 2016 09:27:05   2 minutes........  index.js
Jun 26 2016 09:17:44  12 minutes........  node_modules
Jun 26 2016 09:27:05   2 minutes........  package.json
```
