# hacker-reverse-ip

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> uses api.hackertarget.com to do reverse ip lookups on domains

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Maintainers](#maintainers)
- [License](#license)

## Install
This project does not contain dependencies, but doing npm install is good practice
```
  npm install
```

## Usage



api.hackertarget.com has a 100/day scan limit it is highly advised to set scan 50 domains at a time such as:

0 50

51 100

101 150

...


if you scan the same <ip-address> at the same range each time you will get the same domains.

- [ip-address] - A single valid ip address can be aquired doing a dnslookup on a domains

- [min] - where to start the scan range

- [max] - where to end the scan range
```
  # npm start <ip-address> <min> <max>
  npm start 127.0.0.1 0 10
  npm start 23.227.38.32 0 50
  npm start www.google.com 0 5
```

[download release here](https://github.com/mezerotm/hacker-reverse-ip/releases)
```
# Windows
 ./hacker-reverse-ip.exe <ip-address> <min> <max>
```

## Maintainers

[@mezerotm](https://github.com/mezerotm)


## License

MIT © 2018 Carlos Rincon
