# Descrição

Esse projeto foi criado baseado no curso de `NodeJS, Typescript, TDD, Clean Archtecture e SOLID` do `Rodrigo Manguinho` e servirá como repositorio de consulta para relembrar como configurar um projeto NodeJS e como implementar os padrões de projeto.

## Configuração Base

### Dependencias de Dev

- git-commit-msg-linter

Hook para evitar commits fora de padrão, o padrão pre-definido é o seguinte:

```
<type>(<scope>): <short summary>
  │       │             │
  │       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │       │
  │       └─⫸ Commit Scope: Optional, can be anything specifying the scope of the commit change.
  |                          For example $location|$browser|$compile|$rootScope|ngHref|ngClick|ngView, etc.
  |                          In App Development, scope can be a page, a module or a component.
  │
  └─⫸ Commit Type: feat|fix|docs|style|refactor|test|chore|perf|ci|build|temp
```

- husky

Biblioteca que permite utilizar githooks

- lint-staged

Essa biblioteca impede que o lint rode em todos os arquivos do projeto, executando apenas nos arquivos em stage.

- jest

Framework de testes em Javascript.


