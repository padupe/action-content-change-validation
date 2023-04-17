# action-content-change-validation

# Índice

- [Descrição](#descrição)
- [Fluxo](#fluxo)
- [Requisitos]
  - [GitHub App](#github-app)
    - [Permissões necessárias](#permissões-necessárias)
    - [_Secrets_](#secrets)
  - [_Personal Access Token_ (PAT)](#personal-access-token-pat)
    - [Permissões necessárias](#permissc3b5es-necessc3a1rias-1)

## Descrição

_Action_ para validar se o conteúdo de um arquivo (ou diretório) foi alterado.

Útil para garantir que processos de qualidade e/ou segurança não sejam alterados acidentalmente - ou não - pelos desenvolvedores.

## Fluxo

![](./assets/flow.png)

## Requisitos

### [GitHub App](https://docs.github.com/en/apps)

#### Permissões necessárias

- Repositório
  - _Actions_ [Leitura e escrita]
  - _Commit Status_ [Leitura e escrita]
  - Conteúdo [Leitura e escrita]
  - _Pull Requests_ [Leitura e escrita]

#### _Secrets_

A _secret_ `CREDENTIALS_GITHUB_APP_PRIVATE_KEY` deve ser informada no seguinte formato (sem quebra de linhas):

`-----BEGIN RSA PRIVATE KEY-----\n ... \n-----END RSA PRIVATE KEY-----`

### _Personal Access Token_ (PAT)
> Token de Acesso Pessoal

#### Permissões necessárias

- Repositório (Controle total de repositórios privados - e públicos)

## Uso

### GitHub App

1. Crie o diretório `.github/workflows` na "raiz" do seu projeto;

2. Crie o arquivo `content-change-validation.yaml` com o conteúdo semelhante ao apresentado a seguir:

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
        uses: padupe/action-generate-token-github-app@1.0.0
        with:
          appId: ${{ secrets.CREDENTIALS_GITHUB_APP_ID }}
          installationId: ${{ secrets.CREDENTIALS_GITHUB_APP_INSTALLATION_ID }}
          privateKey: ${{ secrets.CREDENTIALS_GITHUB_APP_PRIVATE_KEY }}

      - name: Content Change Validation
        uses: padupe/action-content-change-validation@1.0.0
        with:
          directoryOrFile: .github/workflows
          gitHubToken: ${{ steps.generate-token-github-app.outputs.token }}
```

### _Personal Access Token_ (PAT)

1. Crie o diretório `.github/workflows` na "raiz" do seu projeto;

2. Crie o arquivo `content-change-validation.yaml` com o conteúdo semelhante ao apresentado a seguir:

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
        uses: padupe/action-content-change-validation@1.0.0
        with:
          authType: pat
          gitHubPersonalAccessToken: ${{ secrets.PAT_TOKEN }}
```

## _Output_

Valor _booleano_.

## Contribua com o Projeto

Confira nosso guia para [CONTRIBUIÇÃO](../CONTRIBUTING.md) na língua inglesa.
