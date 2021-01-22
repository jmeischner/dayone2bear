dayone2bear
===========

Import DayOne txt export to bear journal

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/dayone2bear.svg)](https://npmjs.org/package/dayone2bear)
[![Downloads/week](https://img.shields.io/npm/dw/dayone2bear.svg)](https://npmjs.org/package/dayone2bear)
[![License](https://img.shields.io/npm/l/dayone2bear.svg)](https://github.com/jmeischner/dayone2bear/blob/master/package.json)

<!-- toc -->
# Usage

This repo is definitly only a starting point if someone has different requirements than I have.
I scribbled this down to solve my very specific setup of importing my dayone data to my bear notes with my own tag structure.

To use it copy your dayone export txt file into the repo directory and execute

```sh
./bin/run <your-txt-file>
```

and the script creates txt files for every day to the export directory.
These can then easily imported from inside *bear*.
