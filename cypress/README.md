# Cypress Directory

## Table of Contents

```
0. 前提
1. Cypressのインストール
2. Setting Up TypeScript
3. Fix cypress.config.json
```

## 0.前提

`Project Dependencies`

```
"react"
    version "18.1.0"
"react-dom"
    version "18.1.0"
"typescript"
    version "4.6.4"
"vite"
    version "2.9.9"
```

`e2e Dependencies`

```
"cypress"
    version "9.6.1"
"typescript"
    version "4.6.4"
```

## 1. Cypressのインストール

### 1-1. Cypressのインストール

```
$ yarn add -D cypress
```

package.jsonに起動用コマンドを追加

```
"scripts": {
    ...other scripts
    "e2e:open": "cypress open"
}
```

### 1-2. Cypressの基本ディレクトリを作成する


`yarn run e2e:open`を実施すると、project directory以下に`cypress`というディレクトリが作成されます。

```
{project_directory}
    |- cypress.json
    |- cypress
    |- fixtures
    |- integration
    |- plugins
    |- support
```

## 2. Setting Up TypeScript

1.で作成したCypress DirectoryをTypesriptに対応していきます。

### 2-1. Typescriptのインストールとtsconfig.jsonの作成

```
$ yarn add -D typescript   # 入っている場合は不要
$ touch cypress/tsconfig.ts
```

```cypress/tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["es5", "dom"],
    "types": ["cypress"]
  },
  "include": ["**/*.ts"]
}
```

### 2-2. .jsファイルを.tsファイルにrenameを実施する

該当するディレクトリは以下。

```
{project_directory}/cypress
|- fixture
|- integration
|- plugins
|- support
```

`cypress/fixture`

上記についてはjson fileになるので、そのまま残していきます。

`cypress/integration`

sampleのファイルが存在しているだけなので、適当に書き直す

`cypress/plugins`

index.jsについては、jsの記載が残っているためrenameと書き直しを実施していきます。

```cypress/plugins/index.js
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
}
```

```cypress/plugins/index.ts
// eslint-disable-next-line @typescript-eslint/no-empty-function no-unused-vars
export default (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {};
```

`cypress/support`

supportについては、`cypress/support/index.js`はそのまま`cypress/support/index.ts`にrename。
`cypress/support/commands.ts`については、丸っと記載を修正します。
簡単なサンプルコードを追加しておきます。

```cypress/support/commands.ts
/// <reference types="cypress" />
declare namespace Cypress {
  interface Chainable<Subject> {
    clickLink(label: string): void
  }
}

Cypress.Commands.add('clickLink', (label: string | number | RegExp) => {
  cy.get('a').contains(label).click()
})

```

## 3. Fix cypress.config.json

最後にlocalで起動するServerを見るように`cypress.json`に記載します。

```cypress.json
{
  "baseUrl": "http://localhost:3000"
}
```

最後に起動して確認。

```
$ yarn dev
$ yarn e2e:open
```

```cypress/integration/sample.spec.ts
describe("", () => {
    it("/", () => {
        cy.visit("")
        cy.location().url().should("include", "/")
    })
})
```

## Refs

[Cypress Installation](https://docs.cypress.io/guides/getting-started/installing-cypress)
[Cypress Typescript](https://docs.cypress.io/guides/tooling/typescript-support#Install-TypeScript)
