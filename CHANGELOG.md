## [2.1.1](https://github.com/prantlf/timezone-support/compare/v2.0.2...v2.1.1) (2022-12-04)


### Bug Fixes

* update docs to match type signature ([50b2965](https://github.com/prantlf/timezone-support/commit/50b29657a2804d7371605f9748c4e98132c792bc))
* update docs to match type signature 2 ([b9e3645](https://github.com/prantlf/timezone-support/commit/b9e36458f0a84b090f0657b49bc8a45360731812))
* Upgrade the time zone database to 2022f ([a0e5cd6](https://github.com/prantlf/timezone-support/commit/a0e5cd64ef2c33e09ca9c7810c62ccbfe9202b5e))



## [2.0.2](https://github.com/prantlf/timezone-support/compare/v2.0.1...v2.0.2) (2019-06-10)


### Bug Fixes

* Upgrade the time zone database to the version 2019a. ([c0d147e](https://github.com/prantlf/timezone-support/commit/c0d147e10db0c7694fbc77f125daf512afa2dac8))



## [2.0.1](https://github.com/prantlf/timezone-support/compare/v2.0.0...v2.0.1) (2019-06-10)


### Bug Fixes

* Input time object for getUnixTime and convertTimeToDate does not need to include hours and minutes - defaults to midnight ([e45a193](https://github.com/prantlf/timezone-support/commit/e45a193be0fb80f4bc3a6f82ae35b7103151b05b))



# [2.0.0](https://github.com/prantlf/timezone-support/compare/v1.8.1...v2.0.0) (2019-06-10)


### Bug Fixes

* Upgrade module dependencies ([11ac1d6](https://github.com/prantlf/timezone-support/commit/11ac1d696e1bf8c6b141a6a512db48d4689f5a15))
* Use valid JavaScript identifiers for exports in vanilla browser modules ([943623e](https://github.com/prantlf/timezone-support/commit/943623e1364754ec30810c0cdab1b60c1087201d))


### BREAKING CHANGES

* Previous kebab-case keys in the `window` object changed to camelCase global vbariables. Usage of shims or tools loading UMD modules becomes easier. See the migration guide for more information.



## [1.8.1](https://github.com/prantlf/timezone-support/compare/v1.8.0...v1.8.1) (2018-11-27)


### Bug Fixes

* Upgrade development dependencies to fix a critical security vulnerability ([7d6cd6e](https://github.com/prantlf/timezone-support/commit/7d6cd6e727876f3044f6a4ae2049ca1e43a0cd72))



# [1.8.0](https://github.com/prantlf/timezone-support/compare/v1.7.0...v1.8.0) (2018-11-17)


### Features

* Add separate time zone data for years 1970-2038 ([d7301b5](https://github.com/prantlf/timezone-support/commit/d7301b558950438d2ec056eed818ce034d47c6d6))



# [1.7.0](https://github.com/prantlf/timezone-support/compare/v1.6.1...v1.7.0) (2018-11-17)


### Features

* Include the full time zone data as a separate module ([be9ce2a](https://github.com/prantlf/timezone-support/commit/be9ce2a3867f281928075a338a7e2407a5205fa1))



## [1.6.1](https://github.com/prantlf/timezone-support/compare/v1.6.0...v1.6.1) (2018-11-17)


### Bug Fixes

* Include typings in the distribution dirtectory again ([e667e0d](https://github.com/prantlf/timezone-support/commit/e667e0df9d7bb25fa8d6619dd98cfb18fa7cad71))



# [1.6.0](https://github.com/prantlf/timezone-support/compare/v1.5.5...v1.6.0) (2018-11-06)


### Bug Fixes

* Upgrade npm module dependencies ([57b36d8](https://github.com/prantlf/timezone-support/commit/57b36d82a9b811709b0eb4bffe0144eed5077155))
* Upgrade time zone database to the version 2018g. ([57368cc](https://github.com/prantlf/timezone-support/commit/57368ccff2e176f299feb57462c9d914a7907e68))


### Features

* Add data and index modules for the year range 1900-2050 ([be02f21](https://github.com/prantlf/timezone-support/commit/be02f212e3f3ac66a14a1ddd38d9fbb1e9ea04b3))
* Introduce command-line generator for custom time zone data ([731e1be](https://github.com/prantlf/timezone-support/commit/731e1be8e57d4c8fbbcb169a07dbea76e76fa494))



## [1.5.5](https://github.com/prantlf/timezone-support/compare/v1.5.4...v1.5.5) (2018-10-08)


### Bug Fixes

* Fix compatibility with IE. ([f2706a2](https://github.com/prantlf/timezone-support/commit/f2706a27bfbd94655ca068a299a111e05c84f144))



## [1.5.4](https://github.com/prantlf/timezone-support/compare/v1.5.3...v1.5.4) (2018-10-07)


### Bug Fixes

* Declare the return type of populateTimeZones ([c7627c5](https://github.com/prantlf/timezone-support/commit/c7627c5196b1b9082ad017581506218addc5e0da))



## [1.5.3](https://github.com/prantlf/timezone-support/compare/v1.5.2...v1.5.3) (2018-10-07)


### Bug Fixes

* Create separate TypeScript typings for every dist module ([3482934](https://github.com/prantlf/timezone-support/commit/3482934c6c9ceeb2a5eef21f7508954bf7697d45))



## [1.5.2](https://github.com/prantlf/timezone-support/compare/v1.5.1...v1.5.2) (2018-10-07)


### Bug Fixes

* Publish TypeScript typings by the npm module ([ce52ebf](https://github.com/prantlf/timezone-support/commit/ce52ebf0f5fa08985219980292d6312596dabca5))



## [1.5.1](https://github.com/prantlf/timezone-support/compare/v1.5.0...v1.5.1) (2018-10-06)


### Bug Fixes

* Add declarations for modules with the limited time zone data ([d52464d](https://github.com/prantlf/timezone-support/commit/d52464d50fe178ad6ed597e97824c1465cd78be1))



# [1.5.0](https://github.com/prantlf/timezone-support/compare/v1.4.0...v1.5.0) (2018-10-06)


### Bug Fixes

* Add type declarations for TypeScript ([4333471](https://github.com/prantlf/timezone-support/commit/433347120c2e83173f7565e5d1276c6a339a78c8))


### Features

* Package the library with 2012-2022 data as a single file too ([5420758](https://github.com/prantlf/timezone-support/commit/5420758156d733e01cbc0ede939fa280fb69b42f))



# [1.4.0](https://github.com/prantlf/timezone-support/compare/v1.3.2...v1.4.0) (2018-09-30)


### Bug Fixes

* Clone return time zone list to prevent the caller from modifying the cached value ([f60c192](https://github.com/prantlf/timezone-support/commit/f60c192264d710f08f592d6af0dd531516d73d61))


### Features

* Add limited time zone data for years 2012-2022 ([85a7a67](https://github.com/prantlf/timezone-support/commit/85a7a67fbd077b3b0e5358f778dd06de625bc006))



## [1.3.1](https://github.com/prantlf/timezone-support/compare/v1.3.0...v1.3.1) (2018-09-19)


### Bug Fixes

* Include Node.js 6 among supported Node.js versions ([63719e2](https://github.com/prantlf/timezone-support/commit/63719e2f24ddf7f1e5968089663bc0a900cfd658))



# [1.3.0](https://github.com/prantlf/timezone-support/compare/v1.2.1...v1.3.0) (2018-09-18)


### Features

* Add methods converting between time and date objects ([a384d16](https://github.com/prantlf/timezone-support/commit/a384d1678bf60fb0b4fc74565eaf120b97782629))
* Maintain the property dayOfWeek in the time object ([d46d36a](https://github.com/prantlf/timezone-support/commit/d46d36a5e74fc151b40e04b2c713186bb45e8029))
* Support lower-case am/pm in addition to upper-case AM/PM when parsing and formatting date strings ([e3304db](https://github.com/prantlf/timezone-support/commit/e3304db2b7642fcb44303c9b6c8fa675e4237ab0))



## [1.2.1](https://github.com/prantlf/timezone-support/compare/v1.2.0...v1.2.1) (2018-09-16)


### Bug Fixes

* Transpile UMD module bundles to ES5 to support older browsers ([c6993e2](https://github.com/prantlf/timezone-support/commit/c6993e2cf5e757333df736f452f87d5fd9debbe0))



# [1.2.0](https://github.com/prantlf/timezone-support/compare/v1.1.2...v1.2.0) (2018-09-16)


### Features

* Add a new getUTCOffset method ([60fb64e](https://github.com/prantlf/timezone-support/commit/60fb64e6216abaaea1bf4d11a653b7ff28d0633f))



## [1.1.2](https://github.com/prantlf/timezone-support/compare/v1.1.1...v1.1.2) (2018-09-03)


### Bug Fixes

* Add time zone offset to the epoch computed in setTimeZone ([6b10bca](https://github.com/prantlf/timezone-support/commit/6b10bcaa91a3600e8a7e8b5b99036e87fbc44c0c))


### Reverts

* Revert "fix: Do not add epoch property with the pre-computed UNIX time in setTimeZone" ([98b35a1](https://github.com/prantlf/timezone-support/commit/98b35a161a512cb3da1ddf6380371ee2819b88e1))



## [1.1.1](https://github.com/prantlf/timezone-support/compare/v1.1.0...v1.1.1) (2018-09-03)


### Bug Fixes

* Do not add epoch property with the pre-computed UNIX time in setTimeZone ([a4613c1](https://github.com/prantlf/timezone-support/commit/a4613c131db7e6328d26e03ed68513e98e7ccde6))



# [1.1.0](https://github.com/prantlf/timezone-support/compare/v1.0.0...v1.1.0) (2018-09-03)


### Features

* Add epoch time as a read-only non-enumerable property to the time object ([bea4262](https://github.com/prantlf/timezone-support/commit/bea426222da6d1b1ba62fe30cb6ade3b25d70d86))



# [1.0.0](https://github.com/prantlf/timezone-support/compare/9b3d588cc1d9882fac7b249cad946fa860cba9ea...v1.0.0) (2018-09-02)


### Bug Fixes

* Package both src and dist the in NPM module ([9b3d588](https://github.com/prantlf/timezone-support/commit/9b3d588cc1d9882fac7b249cad946fa860cba9ea))



