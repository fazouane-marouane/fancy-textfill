# Change Log

# 1.2.5

- Prevent invisible element from occupying any space. Thanks to @borodean for PR #6.

## 1.2.4

- Provide a way to easily import the lib in a browserify project.

## 1.2.3

- Provide the lib as a ES2015 module and umd module to please everyone.
- explain more HOWTOs in the README

## 1.2.2

- Change the build system

## 1.2.1

- Usage of a custom LRU cache implementation. The old one was way too heavy and needed polyfills.

## 1.2.0

- Support for `line-height` with value `normal`
- A new option has been created to explicitely treat `line-height` as a fixed value (not relative to the current `font-size`).
- Refactoring of the code

## 1.1.1

- Floor the optimal `font-size` to avoid rounding errors. Thanks to @Robinfr for PR #2.

## 1.1.0

- Support `line-height`

## 1.0.0

Initial release
