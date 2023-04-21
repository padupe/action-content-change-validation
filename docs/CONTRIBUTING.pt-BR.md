# Contribuindo

Ao contribuir para este repositório, primeiro discuta a alteração que deseja fazer por meio de [_issue_](https://github.com/padupe/action-content-change-validation/issues), email, ou qualquer outro método com os responsáveis por este projeto antes de fazer uma alteração.

Observe que temos um **Código de Conduta**, siga-o em todas as suas interações com o projeto.

## Padrão de _Branches_

Para realizar o desenvolvimento de uma nova funcionalidade (_feature_) ou mesmo de uma correção (_fix_), recomendamos que as _branches_ criadas sigam o seguinte padrão:

- Língua inglesa;
- Tipo:
  -  **build**: Alterações que afetam o sistema de compilação do projeto;
  - **ci**: Mudanças nos _scripts_ de configuração de CI;
  - **docs**: Atualizações ou adições serão feitas apenas no contexto de documentações;
  - **feat**: Um novo recurso ou funcionalidade será desenvolvido;
  - **fix**: Uma correção será realizada;
  - **perf**: Mudanças de código que melhoram o desempenho do projeto;
  - **refactor**: Alterações no código que alteram sua estrutura, mas não estão relacionadas a correções de _bugs_ (_bug fixes_) ou novos recursos (_features_);
  - **style**: Mudanças que não afetam a lógica de programação do projeto, como remover espaços em branco, etc.;
  - **test**: Adição de novos testes ou de testes que estavam em falta.
- Id da _issue_;
- Breve resumo do que será desenvolvido/corrigido na _branch_.

**Exemplo**: docs/100_contributing

## Padrão de _Commits_

Nós seguimos o padrão ["_Conventional Commits_"](https://www.conventionalcommits.org/en/v1.0.0/), que em resumo segue os mesmos princípios destacados na [seção anterior](#padrão-de-branches). A diferença é que devemos informar o contexto em que o _commit_ foi realizado. Abaixo, mais detalhes sobre a estrutura básica dos commits::

- Língua inglesa;
- Tipo (_build_, _ci_, _docs_, _feat_, _fix_, _perf_, _refactor_, _style_ ou _test_);
- Contexto;
- Indicando o "caminho" do arquivo adicionado ou atualizado;
- Mensagem do _commit_.

**Exemplo**: `"docs(README.md): project documentation update."`

## Processo de _Pull Request_

1. Nós criamos um _template_ de _Pull Request_ para direcionar o preenchimento das informações, preencha-o corretamente para agilizar o processo.

2. Atualize o `CHANGELOG.md` com detalhes de alterações no projeto. Isso inclui novas variáveis ​​de ambiente, alteração de documentação, nova funcionalidade e informações úteis para identificar qualquer possível alteração significativa.

3. Aumente os números de versão do pacote para a nova versão que este _Pull Request_ representaria. O esquema de versionamento que usamos é o [SemVer](http://semver.org/).

4. Seu _Pull Request_ será avaliado pelos responsáveis pelo projeto, fique atento a possíveis indicações de correções e/ou adaptações em seu código.
