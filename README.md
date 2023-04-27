# action-content-change-validation

> Documentation available in Portuguese (pt-BR) [here](./docs/README-pt.md).

## Index

- [Description](#description)
- [Flow](#flow)
- [Requirements](#requirements)
  - [GitHub App](#github-app)
    - [Required Permissions](#required-permissions)
    - [Secrets](#secrets)
  - [Personal Access Token (PAT)](#personal-access-token-pat)
    - [Required Permissions](#required-permissions-1)
- [Use](#use)
  - [GitHub App](#github-app-1)
  - [Personal Access Token (PAT)](#personal-access-token-pat-1)
- [Output](#output)
- [Contribute to the Project](#contribute-to-the-project)

## Description

Action to validate if the content of a file (or directory) has changed.

Useful for ensuring that quality and/or safety processes are not accidentally - or not - changed by developers.

## Flow

![](./docs/assets/flow.png)

## Requirements

### [GitHub App](https://docs.github.com/en/apps)

#### Required Permissions:

- Repository
  - Actions [Read and write]
  - Commit status [Read and write]
  - Contents [Read and write]
  - Pull requests [Read and write]

#### Secrets

Secret `CREDENTIALS_GITHUB_APP_PRIVATE_KEY` on format (no line break):

`-----BEGIN RSA PRIVATE KEY-----\n ... \n-----END RSA PRIVATE KEY-----`

### Personal Access Token (PAT)

#### Required Permissions

- Repo (Full control of private repositories)

## Use

### GitHub App

1. Create directory `.github/worfklows` in the root of your project;

2. Create file `content-change-validation.yaml` with content similar to the following:

```yaml
name: Content Change Validation
on:
  pull_request:
    types: [opened, reopened, synchronize]
    branches:
      - main

jobs:
  content-change-validation:
    runs-on: ubuntu-latest
    steps:
      - name: Generate Token from GitHub App
        id: generate-token-github-app
        uses: padupe/action-generate-token-github-app@1.1.3
        with:
          appId: ${{ secrets.CREDENTIALS_GITHUB_APP_ID }}
          installationId: ${{ secrets.CREDENTIALS_GITHUB_APP_INSTALLATION_ID }}
          privateKey: ${{ secrets.CREDENTIALS_GITHUB_APP_PRIVATE_KEY }}

      - name: Content Change Validation
        uses: padupe/action-content-change-validation@1.1.4
        with:
          directoryOrFile: .github/workflows
          gitHubToken: ${{ steps.generate-token-github-app.outputs.gitHubToken }}
```

### Personal Access Token (PAT)

1. Create directory `.github/worfklows` in the root of your project;

2. Create file `content-change-validation.yaml` with content similar to the following:

```yaml
name: Content Change Validation
on:
  pull_request:
    types: [opened, reopened, synchronize]
    branches:
      - main

jobs:
  content-change-validation:
    runs-on: ubuntu-latest
    steps:
      - name: Content Change Validation
        uses: padupe/action-content-change-validation@1.1.4
        with:
          directoryOrFile: .github/workflows
          gitHubToken: ${{ secrets.PAT_TOKEN }}
```

## Output

Boolean value.

## Contribute to the Project

Check our [CONTRIBUTING](./CONTRIBUTING.md) guidelines.
