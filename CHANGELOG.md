# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

- [1.1.4 | Fix - Compare Date](https://github.com/padupe/action-content-change-validation/releases/tag/1.1.4) - 2023-04-71

## What's Change?

- Function `compareDate.ts` at `src/utils`;
  - data processing of type Date.


- [1.1.3 | Fixes - Auth Strategy](https://github.com/padupe/action-content-change-validation/releases/tag/1.1.3) - 2023-04-17

## What's Change?

- Authentication Strategy
  - Value injection was not working correctly;
  - We started to "call" the "setInput" in the files that need the "gitHubToken".


- [1.1.2 | Refactor - Just use GitHub Token](https://github.com/padupe/action-content-change-validation/releases/tag/1.1.2) - 2023-04-17

## What's Change?

- Change in Action mechanics, so that it only works with GitHub Token;
  - Action works only with Token's. However, in the documentation we recommend another action that is capable of generating tokens for GitHub App's.

### Inputs

- directoryOrFile:
  description: 'Directory and/or file that must be evaluated.'
  required: true
- gitHubToken:
  description: 'Personal Access Token.'
  required: true
